import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpaceflightApiService {
  private baseUrl = 'https://api.spaceflightnewsapi.net/v3';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any[]> {
    const url = `${this.baseUrl}/articles`;
    return this.http.get<any[]>(url);
  }

  getArticleById(articleId: string): Observable<any> {
    const url = `${this.baseUrl}/articles/${articleId}`;
    return this.http.get<any>(url);
  }

  filterArticlesByKeyword(keyword: string): Observable<any[]> {
    return this.getArticles().pipe(
      map((articles) =>
        articles.filter((article) =>
          article.title.toLowerCase().includes(keyword.toLowerCase())
        )
      ),
      switchMap((filteredTitleArticles) => {
        return this.getArticles().pipe(
          map((articles) =>
            articles.filter((article) =>
              article.summary.toLowerCase().includes(keyword.toLowerCase())
            )
          ),
          map((filteredSummaryArticles) => {
            const combinedArticles = filteredTitleArticles.concat(filteredSummaryArticles);
            const uniqueArticles = combinedArticles.filter(
              (article, index, self) =>
                index === self.findIndex((a) => a.id === article.id)
            );
            return uniqueArticles;
          })
        );
      })
    );
  }

}
