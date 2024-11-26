import { Component } from '@angular/core';
import { TaskService } from '../../service/task/task.service';
import { _IApiResponse, _IData, _Itask } from '../../types/interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  tasks!: _Itask[]
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  constructor(private _taskService: TaskService, private _Toastr: ToastrService) { }

  apiCall() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    this._taskService.getAll(tomorrow).subscribe({
      next: (res: _IApiResponse<_Itask[]>) => {
        this.tasks = res['data']
      }
    })
  }
  ngOnInit(): void {
    this.apiCall()
    this.totalPages = Math.ceil(this.tasks.length / this.pageSize);

  }


  isTaskVisible(index: number): boolean {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return index >= start && index < end;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  toggleStatus(status: boolean, id: string) {
    this._taskService.update(!status, id).subscribe({
      next: (res: _IApiResponse<_Itask>) => {
        this._Toastr.success(res['message'])
        this.apiCall()
      }
    })
  }
}
