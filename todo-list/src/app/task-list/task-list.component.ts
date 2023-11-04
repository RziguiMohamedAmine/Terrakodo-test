import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks !: any[];

  constructor(private registerService: AuthService,private router:Router) { }
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.registerService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks.tasks;
        console.log(this.tasks);
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
    return this.tasks;
  }

  deleteTask(taskId: number) {
    this.registerService.deleteTask(taskId).subscribe(
      () => {
        // Task deleted, update the task list
        this.loadTasks();
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }


}
