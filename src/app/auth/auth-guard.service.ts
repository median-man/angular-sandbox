import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { RecipesModule } from '../recipes/recipes.module';
import { RecipesRoutingModule } from '../recipes/recipes-routing.module';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate() {
    return this.authService.isAuthenticated();
  }
}
