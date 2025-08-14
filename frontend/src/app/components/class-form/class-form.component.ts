import { Component } from '@angular/core';
import { DailyScheduleService } from '../../services/daily-schedule.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent {
  class = {
    name: '',
    description: '',
    instructor: '',
    class_date: '',
    start_time: '',
    duration: 60,
    capacity: 20
  };

  constructor(private dailyScheduleService: DailyScheduleService) { }

  onSubmit() {
    this.dailyScheduleService.createSpecificClass(this.class).subscribe(
      data => {
        console.log('Class created', data);
        alert('Class created successfully!');
        this.resetForm();
        window.location.reload();
      },
      error => {
        console.error('Error creating class', error);
        alert('Error creating class: ' + (error.error?.message || 'Unknown error'));
      }
    );
  }

  resetForm() {
    this.class = {
      name: '',
      description: '',
      instructor: '',
      class_date: '',
      start_time: '',
      duration: 60,
      capacity: 20
    };
  }
}