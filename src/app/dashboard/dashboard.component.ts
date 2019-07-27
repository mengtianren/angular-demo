import { Component, OnInit } from "@angular/core";
import { HeroService } from "../hero.service";
import { Hero } from "../Hero";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"]
})
export class DashboardComponent implements OnInit {
  constructor(private heroService: HeroService) {}
  public heroes: Hero[] = [];
  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => (this.heroes = heroes.slice(1, 5)));
  }

  ngOnInit() {
    this.getHeroes();
  }
}
