import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number = 0;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    this.recipe = this.recipeService.getRecipe(+route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  onSendToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe);
  }

  onDelete(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
