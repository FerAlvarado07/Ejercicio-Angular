import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  editedTask: Task = {
    id: 0,
    userId: 0,
    title: '',
    date: '',
    completed: false,
    description: '',
  }; // Tarea en edición
  userId: any; // Supongamos que ya tienes el userId disponible
  editing: boolean = false; // Bandera para controlar la edición
  newTaskName = '';
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getId();
    this.getTasks(); // Llamamos a getTasks al inicializar el componente
  }

  getId(): void {
    console.log(localStorage.getItem('id'));
    this.userId = localStorage.getItem('id');
  }

  getTasks(): void {
    console.log('Estas tareas son del usuario:', this.userId);
    this.taskService.getTasks(this.userId).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(task: Task): void {
    this.router.navigate(['/editar']);
    localStorage.setItem('task', task.id.toString());
    localStorage.setItem('date', task.date.toString());

    localStorage.setItem('title', task.title.toString());

    // Activamos el modo de edición
  }

  saveTask(form: NgForm): void {
    if (form.valid) {
      this.taskService.updateTask(this.editedTask).subscribe(() => {
        this.editing = false; // Desactivamos el modo de edición
        this.getTasks(); // Actualizamos la lista de tareas
      });
    }
  }

  confirmDelete(task: Task): void {
    console.log('Confirmar eliminación de tarea:', task);
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.deleteTask(task);
    }
  }
  deleteTask(task: Task): void {
    // Implementa la lógica para eliminar la tarea
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id); // Eliminamos la tarea de la lista
      console.log('Tarea eliminada:', task);
    });
  }

  toggleCompleted(task: Task): void {
    task.completed = !task.completed; // Cambiamos el estado de completado
    this.taskService.updateTask(task).subscribe(() => {});
  }

  addTask() {
    this.router.navigate(['/agregar']);
  }

  logout(): void {
    this.authService.logout();
  }
}
