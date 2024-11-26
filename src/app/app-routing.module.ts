import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'create_task', component: CreateTaskComponent },
  { path: '', redirectTo: 'list', pathMatch: "full" },
  { path: 'detail_page', component: DetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
