import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { categoryRepository } from './repositories/category.providers';
import { recipeRepository } from './repositories/recipe.providers';
import { usersRepository } from './repositories/users.providers';

@Module({
  providers: [
    ...databaseProviders,
    ...recipeRepository,
    ...usersRepository,
    ...categoryRepository,
  ],
  exports: [
    ...databaseProviders,
    ...recipeRepository,
    ...usersRepository,
    ...categoryRepository,
  ],
})
export class DatabaseModule {}
