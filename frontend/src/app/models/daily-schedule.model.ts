export interface DailyClass {
  id: number;
  name: string;
  description: string;
  instructor: string;
  day_of_week: number;
  start_time: string;
  duration: number;
  capacity: number;
}

export interface UserSchedule {
  id: number;
  user_id: number;
  daily_class_id: number;
  name: string;
  description: string;
  instructor: string;
  day_of_week: number;
  start_time: string;
  duration: number;
}

export interface SpecificClassSchedule {
  id: number;
  user_id: number;
  class_id: number;
  name: string;
  description: string;
  instructor: string;
  class_date: string;
  start_time: string;
  duration: number;
}

export interface SpecificClassSchedule {
  id: number;
  user_id: number;
  class_id: number;
  name: string;
  description: string;
  instructor: string;
  class_date: string;
  start_time: string;
  duration: number;
}