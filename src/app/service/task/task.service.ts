import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _IApiResponse, _Itask } from '../../types/interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }
  create_task(task: _Itask): Observable<_IApiResponse<_Itask>> {
    return this._http.post<_IApiResponse<_Itask>>('/task/create', task)
  }
  getAll(date: Date, search: string) {
    return this._http.get<_IApiResponse<_Itask[]>>(`/task/getAll?date=${date}&search=${search}`)
  }

  update(status: boolean, id: string) {
    return this._http.put<_IApiResponse<_Itask>>('/task/update', { status: status, id: id })
  }
  delete(id: string) {
    return this._http.delete<_IApiResponse<_Itask>>(`/task/delete?id=${id}`)
  }
  task_detail(id: string) {
    return this._http.get<_IApiResponse<_Itask>>(`/task/task_detail?id=${id}`)
  }
  next_occurrence(id: string) {
    return this._http.get<_IApiResponse<any>>(`/task/next_occurrence?id=${id}`)
  }
}
