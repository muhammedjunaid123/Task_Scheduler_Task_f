import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { _IApiResponse, _Itask } from '../../types/interface';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent implements OnInit {
  constructor(private _taskService: TaskService, private _activeRoute: ActivatedRoute, private _route: Router) { }
  id!: string
  task!: _Itask
  next_occurrence!: any
  ngOnInit(): void {
    this._activeRoute.queryParamMap.subscribe((res) => {
      this.id = res.get('id') || ""
      if (this.id == '') {
        this._route.navigate(['list'])
      }

      this._taskService.task_detail(this.id).subscribe({
        next: (res: _IApiResponse<_Itask>) => {
          this.task = res['data']

        }
      })
      this._taskService.next_occurrence(this.id).subscribe({
        next: (res:_IApiResponse<any>) => {
          this.next_occurrence = res['data']
        }
      })
    })
  }
}
