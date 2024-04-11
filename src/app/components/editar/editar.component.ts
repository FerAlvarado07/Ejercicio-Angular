import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {}

  userId: any = localStorage.getItem('id');
  taskId: any = localStorage.getItem('task');
  date: any = localStorage.getItem('date');
  title: any = localStorage.getItem('title');

  description: any = localStorage.getItem('description');

  editing: boolean = false;
  tasks: Task[] = [];
  editedTask: Task = {
    id: 0,
    userId: 0,
    title: '',
    date: '',
    completed: false,
    description: '',
  }; // Tarea en edición

  getTasks(): void {
    console.log('Estas tareas son del usuario:', this.userId);
    this.taskService.getTasks(this.userId).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  saveTask(form: NgForm): void {
    this.editedTask.userId = this.userId;
    this.editedTask.id = this.taskId;

    console.log('esto es lo que tenemos', this.editedTask);
    this;
    if (form.valid) {
      this.taskService.updateTask(this.editedTask).subscribe(() => {
        this.editing = false; // Desactivamos el modo de edición
        this.getTasks(); // Actualizamos la lista de tareas
      });
    }

    this.router.navigate(['/home']);
  }
}
