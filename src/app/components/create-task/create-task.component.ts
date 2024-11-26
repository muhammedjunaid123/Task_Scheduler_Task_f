import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../service/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { _IApiResponse, _Itask } from '../../types/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  minDate!: string;

  constructor(private fb: FormBuilder, private _taskService: TaskService, private _Toastr: ToastrService, private _route: Router) { }

  ngOnInit(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setMinutes(0); // Set time to 00:00 (start of the day)
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);

    // Format the date and time for datetime-local input type (YYYY-MM-DDTHH:MM)
    this.minDate = tomorrow.toISOString().slice(0, 16);

    // Initialize the form group with validation rules
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/\S+/)]], // Added pattern to ensure name isn't just spaces
      due_date: ['', [Validators.required]],
      pattern: ['', Validators.required],
    });
  }

  onSubmit(): void {
    // Log the submission for debugging
    console.log('Form Submitted');

    // First, check if the form is valid
    if (!this.taskForm.valid) {
      this._Toastr.error('Please fill out the fields');
      return;
    }

    // Extract form values
    const data: _Itask = this.taskForm.value;

    // Check if 'name' is empty or just spaces
    if (data.name.trim() === '') {
      this._Toastr.error('Please fill out the name');
      return;
    }
    this._taskService.create_task(data).subscribe({
      next: (res: _IApiResponse<_Itask>) => {
        this._Toastr.success(res['message'])
        this._route.navigate(['list'])
      }
    })

  }
}
