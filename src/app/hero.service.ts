import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Hero } from "./Hero";
import { MessageService } from "./message.service";
// import { HEROES } from "./mock-heroes";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root"
})
export class HeroService {
  private heroesUrl = "api/heroes";

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log("获取所有英雄列表")),
      catchError(this.handleError<Hero[]>("getHeroes", []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`获取英雄${url}`),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      )
    );
  }
  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesUrl,hero,httpOptions).pipe(
      tap(_ => this.log(`修改id为${hero.id}的名字`),
      catchError(this.handleError<any>('updateHero')))
    )
  }
  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,httpOptions).pipe(
      tap((newHero:Hero)=>this.log(`添加的新英雄id：${newHero}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  private log(message: string): void {
    this.messageService.add(message);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
}
