import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticlePageComponent } from './article-page/article-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'article/:id', component: ArticlePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
