import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassFormComponent } from './components/class-form/class-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DailyScheduleComponent } from './components/daily-schedule/daily-schedule.component';
import { ManageScheduleComponent } from './components/manage-schedule/manage-schedule.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ClassListComponent,
    ClassFormComponent,
    LoginComponent,
    RegisterComponent,
    DailyScheduleComponent,
    ManageScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }