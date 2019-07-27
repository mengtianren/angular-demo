import { Component, OnInit } from "@angular/core";
import { Hero } from "../Hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.less"]
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }
  addHero(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }
}
