import { Component } from '@angular/core';
import { TaskService } from '../../service/task/task.service';
import { _IApiResponse, _IData, _Itask } from '../../types/interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  constructor(private _taskService: TaskService, private _Toastr: ToastrService, private _route: Router) { }

  apiCall() {
    const today = new Date();
    this._taskService.getAll(today).subscribe({
      next: (res: _IApiResponse<_Itask[]>) => {
        this.tasks = res['data']
      }
    })
  }
  ngOnInit(): void {
    this.apiCall()
    this.totalPages = 1

  }


  isTaskVisible(index: number): boolean {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return index >= start && index < end;
  }



  toggleStatus(status: boolean, id: string) {
    this._taskService.update(!status, id).subscribe({
      next: (res: _IApiResponse<_Itask>) => {
        this._Toastr.success(res['message'])
        this.apiCall()
      }
    })
  }
  delete_task(id: string) {
    this._taskService.delete(id).subscribe({
      next: (res: _IApiResponse<_Itask>) => {
        this._Toastr.success(res['message'])
        this.apiCall()
      }
    })
  }
  detail(id: string) {
    
    this._route.navigate(['detail_page'], { queryParams: { id: id } })
  }
}
