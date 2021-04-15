import { Module } from '@nestjs/common';
import { RecipeController } from './controller/recipe.controller';
import { RecipeService } from './services/recipe.service';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './services/category.service';
import { DatabaseModule } from './database/database.module';
import { config } from 'src/config/configuration';
import { ContextInterceptor } from './config/context-interceptor';
import { Context } from './config/context';
import { JwtAuthGuard } from './config/jwt.auth.guard';
import { JWTStrategy } from './config/jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
@Module({
  imports: [DatabaseModule, ...config],

  controllers: [RecipeController, CategoryController, UsersController],
  providers: [
    RecipeService,
    CategoryService,
    UsersService,
    JwtAuthGuard,
    JWTStrategy,
    Context,
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
  ],
  exports: [JwtAuthGuard, JWTStrategy],
})
export class AppModule {}
