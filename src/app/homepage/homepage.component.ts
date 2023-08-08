import { Component, OnInit } from '@angular/core';
import { SpaceflightApiService } from '../spaceflight-api.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  articles: any[] = [];
  keyword: string = '';

  constructor(
    private spaceflightApiService: SpaceflightApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spaceflightApiService.getArticles().subscribe(
      (data: any[]) => {
        this.articles = data.map((article: any) => ({ ...article }));
        console.log('Fetched articles:', this.articles);
      },
      (error) => {
        console.error('Error fetching articles', error);
      }
    );
  }

  filterArticles() {
    this.spaceflightApiService.filterArticlesByKeyword(this.keyword).subscribe(
      (filteredArticles: any[]) => {
        this.articles = filteredArticles;
      },
      (error) => {
        console.error('Error filtering articles', error);
      }
    );
  }

  navigateToArticle(articleId: string) {
    this.router.navigate(['/article', articleId]);
  }

  highlightKeywords(text: string): string {
    if (!this.keyword.trim()) {
      return text;
    }

    const keywords = this.keyword.trim().split(' ');
    const pattern = new RegExp(keywords.join('|'), 'gi');

    return text.replace(pattern, (match) => `<span class="highlight">${match}</span>`);
  }
}
