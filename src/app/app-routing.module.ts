import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryListComponent } from './story/story-list.component';

const routes: Routes = [
    { 
        path: 'stories/:type/:index', 
        component: StoryListComponent
    },
    {
        path: '**',
        redirectTo: 'stories/new/1'
    }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
