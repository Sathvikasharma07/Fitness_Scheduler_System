import { Component, OnInit, OnDestroy } from '@angular/core';
import { DailyScheduleService } from '../../services/daily-schedule.service';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.css']
})
export class ManageScheduleComponent implements OnInit, OnDestroy {
  private scheduleUpdateListener?: () => void;
  currentDate = new Date();
  viewMode: 'weekly' | 'monthly' = 'weekly';
  classesData: any = {};
  
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ['January', 'February', 'March', 'April', 'May', 'June',
           'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private dailyScheduleService: DailyScheduleService) { }

  ngOnInit(): void {
    this.loadClasses();
    this.scheduleUpdateListener = () => {
      setTimeout(() => this.loadClasses(), 200);
    };
    window.addEventListener('scheduleUpdated', this.scheduleUpdateListener);
  }

  ngOnDestroy(): void {
    if (this.scheduleUpdateListener) {
      window.removeEventListener('scheduleUpdated', this.scheduleUpdateListener);
    }
  }

  loadClasses(): void {
    this.dailyScheduleService.getSpecificUserSchedule().subscribe(
      (schedule: any[]) => {
        this.classesData = {};
        schedule.forEach(item => {
          let dateStr = item.class_date;
          if (dateStr.includes('T')) {
            dateStr = dateStr.split('T')[0];
          }
          // Add one day to the date string directly
          const [year, month, day] = dateStr.split('-').map(Number);
          const nextDay = new Date(year, month - 1, day + 1);
          const correctedDateStr = nextDay.getFullYear() + '-' + 
            String(nextDay.getMonth() + 1).padStart(2, '0') + '-' + 
            String(nextDay.getDate()).padStart(2, '0');
          
          if (!this.classesData[correctedDateStr]) {
            this.classesData[correctedDateStr] = [];
          }
          this.classesData[correctedDateStr].push({
            id: item.id,
            name: item.name,
            start_time: item.start_time
          });
        });
      },
      (error: any) => console.error('Error loading schedule:', error)
    );
  }

  removeFromSchedule(scheduleId: number): void {
    console.log('Removing schedule ID:', scheduleId);
    this.dailyScheduleService.removeFromSpecificSchedule(scheduleId).subscribe(
      () => {
        console.log('Class removed successfully');
        this.loadClasses();
      },
      (error: any) => {
        console.error('Error removing class:', error);
        alert('Error removing class: ' + (error.error?.message || 'Unknown error'));
      }
    );
  }
  
  getDateFromDayOfWeek(dayOfWeek: number): string {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = dayOfWeek - currentDay;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    return targetDate.toISOString().split('T')[0];
  }

  getWeekDates(): Date[] {
    const week = [];
    const startOfWeek = new Date(this.currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  }

  getMonthDates(): Date[] {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const dates = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  }

  getClassesForDate(date: Date): any[] {
    const dateStr = date.getFullYear() + '-' + 
      String(date.getMonth() + 1).padStart(2, '0') + '-' + 
      String(date.getDate()).padStart(2, '0');
    const classes = this.classesData[dateStr] || [];
    return classes;
  }

  previousPeriod(): void {
    if (this.viewMode === 'weekly') {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }
    this.currentDate = new Date(this.currentDate);
    setTimeout(() => this.loadClasses(), 100);
  }

  nextPeriod(): void {
    if (this.viewMode === 'weekly') {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }
    this.currentDate = new Date(this.currentDate);
    setTimeout(() => this.loadClasses(), 100);
  }

  switchView(): void {
    setTimeout(() => this.loadClasses(), 100);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth();
  }

  refreshCalendar(): void {
    this.loadClasses();
  }

  forceRefresh(): void {
    this.classesData = {};
    this.loadClasses();
  }


}