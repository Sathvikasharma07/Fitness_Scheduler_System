import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DailyScheduleService } from '../../services/daily-schedule.service';
import { DailyClass, SpecificClassSchedule } from '../../models/daily-schedule.model';

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css']
})
export class DailyScheduleComponent implements OnInit {
  dailyClasses: DailyClass[] = [];
  userSchedule: any[] = [];
  selectedDate: string = new Date().toISOString().split('T')[0];
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private dailyScheduleService: DailyScheduleService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadDailyClasses();
    this.loadUserSchedule();
  }

  loadDailyClasses(): void {
    this.dailyScheduleService.getDailyClasses(this.selectedDate).subscribe(
      classes => {
        this.dailyClasses = classes;
      },
      error => {
        console.error('Error loading classes:', error);
        this.dailyClasses = [];
      }
    );
  }

  onDateChange(): void {
    this.loadDailyClasses();
  }

  loadUserSchedule(): void {
    this.dailyScheduleService.getSpecificUserSchedule().subscribe(
      (schedule: any[]) => {
        this.userSchedule = schedule;
        this.cdr.detectChanges();
      },
      (error: any) => console.error('Error loading user schedule:', error)
    );
  }

  addToSchedule(classId: number): void {
    const selectedClass = this.dailyClasses.find(c => c.id === classId);
    if (selectedClass) {
      const specificClass = {
        name: selectedClass.name,
        description: selectedClass.description,
        instructor: selectedClass.instructor,
        class_date: this.selectedDate,
        start_time: selectedClass.start_time,
        duration: selectedClass.duration,
        capacity: selectedClass.capacity
      };
      
      this.dailyScheduleService.createSpecificClass(specificClass).subscribe(
        (createdClass: any) => {
          this.dailyScheduleService.addToSpecificSchedule(createdClass.id).subscribe(
            () => {
              this.loadUserSchedule();
              setTimeout(() => {
                this.cdr.markForCheck();
                this.cdr.detectChanges();
              }, 200);
              window.dispatchEvent(new CustomEvent('scheduleUpdated'));
              alert('Class added to your schedule!');
            },
            error => {
              console.error('Error adding to schedule:', error);
              alert('Error adding class to schedule: ' + (error.error?.message || error.message || 'Unknown error'));
            }
          );
        },
        error => {
          console.error('Error creating specific class:', error);
          alert('Error creating class: ' + (error.error?.message || error.message || 'Unknown error'));
        }
      );
    }
  }

  removeFromSchedule(classId: number): void {
    const selectedClass = this.dailyClasses.find(c => c.id === classId);
    if (selectedClass) {
      const scheduleItem = this.userSchedule.find(item => 
        item.name === selectedClass.name
      );
      
      if (scheduleItem) {
        this.dailyScheduleService.removeFromSpecificSchedule(scheduleItem.id || scheduleItem.class_id).subscribe(
          () => {
            this.loadUserSchedule();
            setTimeout(() => {
              this.cdr.detectChanges();
            }, 100);
            window.dispatchEvent(new CustomEvent('scheduleUpdated'));
            alert('Class removed from your schedule!');
          },
          error => {
            console.error('Error removing from schedule:', error);
            alert('Error removing class from schedule: ' + (error.error?.message || error.message || 'Unknown error'));
          }
        );
      }
    }
  }



  isClassInSchedule(classItem: any): boolean {
    if (!this.userSchedule || this.userSchedule.length === 0) {
      return false;
    }
    
    return this.userSchedule.some(item => {
      return item.name === classItem.name;
    });
  }



  getDateForDay(dayOfWeek: number): string {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = dayOfWeek - currentDay;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    return targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getFullDateForDay(dayOfWeek: number): string {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = dayOfWeek - currentDay;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    return targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}