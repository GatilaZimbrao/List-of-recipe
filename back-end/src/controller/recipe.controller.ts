import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from '../services/recipe.service';
import { JwtAuthGuard } from '../config/jwt.auth.guard';
import { Recipe } from '../database/entities/recipe.entity';
import { UsersService } from 'src/services/users.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly usersService: UsersService,
  ) {}

  @Get(`/get-recipe-info/:id`)
  getRecipe(@Param('id') id: number, @Req() request: any): Promise<Recipe> {
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const token = request.headers.authorization.replace('Bearer ', '');
    const user = this.usersService.getUserInfoByToken(token);
    return this.recipeService.getRecipe(id, user.id);
  }

  @Get('/get-recipe-list')
  getRecipeList(@Req() request: any): Promise<Recipe[]> {
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const token = request.headers.authorization.replace('Bearer ', '');
    const user = this.usersService.getUserInfoByToken(token);
    return this.recipeService.getRecipeList(user.id);
  }
  @Get('/search-recipe')
  getSearchRecipeList(
    @Query('searchTerm') searchTerm: string,
    @Req() request: any,
  ): Promise<Recipe[]> {
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const token = request.headers.authorization.replace('Bearer ', '');
    const user = this.usersService.getUserInfoByToken(token);
    return this.recipeService.getSearchRecipeList(searchTerm, user.id);
  }

  @Post('/post-recipe')
  postRecipe(@Body() requestBody: any, @Req() request: any): Promise<Recipe> {
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const token = request.headers.authorization.replace('Bearer ', '');
    const user = this.usersService.getUserInfoByToken(token);
    return this.recipeService.postRecipe(requestBody, user.id);
  }

  @Put('/edit-recipe/:id')
  editRecipe(
    @Body() requestBody: any,
    @Param('id') id: number,
    @Req() request: any,
  ): Promise<Recipe> {
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const token = request.headers.authorization.replace('Bearer ', '');
    const user = this.usersService.getUserInfoByToken(token);
    return this.recipeService.editRecipe(requestBody, id, user.id);
  }

  @Delete('/remove-recipe/:id')
  removeRecipe(@Param('id') id: number, @Req() request: any): Promise<Recipe> {
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const token = request.headers.authorization.replace('Bearer ', '');
    const user = this.usersService.getUserInfoByToken(token);
    return this.recipeService.removeRecipe(id, user.id);
  }
}
