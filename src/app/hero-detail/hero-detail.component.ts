import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.less"]
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
  getHero(): void {
    const {
      snapshot: {
        params: { id = 0 }
      }
    } = this.route;
    this.heroService.getHero(Number(id)).subscribe(hero => (this.hero = hero));
  }
  onBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.onBack());
  }
  ngOnInit() {
    this.getHero();
  }
}
