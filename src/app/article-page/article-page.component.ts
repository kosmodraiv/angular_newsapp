import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceflightApiService } from '../spaceflight-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  article: any;

  constructor(
    private route: ActivatedRoute,
    private spaceflightApiService: SpaceflightApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const articleId = params.get('id');
      if (articleId) {
        this.spaceflightApiService.getArticleById(articleId).subscribe(
          (article) => {
            this.article = article;
          },
          (error) => {
            console.error('Ошибка при получении статьи', error);
          }
        );
      }
    });
  }

}
