import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss'],
})
export class AgregarComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  tasks: Task[] = [];
  userId: any = localStorage.getItem('id'); // Supongamos que ya tienes el userId disponible
  editing: boolean = false; // Bandera para controlar la edición

  ngOnInit(): void {}

  newTaskTitle = '';
  newTaskDescription = '';
  newTaskDate = '';

  getTasks(): void {
    console.log('Estas tareas son del usuario:', this.userId);
    this.taskService.getTasks(this.userId).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask() {
    let maxId = -Infinity;

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id > maxId) {
        maxId = this.tasks[i].id;
      }
    }

    console.log('este es el nombre', this.newTaskTitle);

    // Crear una nueva tarea con el nombre ingresado
    const newTask: Task = {
      id: maxId + 1,
      date: this.newTaskDate,
      userId: this.userId,
      title: this.newTaskTitle,
      completed: false,
      description: this.newTaskDescription,

      // Otros campos de la tarea...
    };

    // Llamar al servicio para agregar la tarea
    this.taskService.addTask(newTask).subscribe((task) => {
      // Actualizar la lista de tareas
      this.tasks.push(task);
      // Limpiar el campo de nombre de la nueva tarea
      this.newTaskTitle = '';
      this.getTasks();
    });

    this.router.navigate(['/home']);
  }
}
