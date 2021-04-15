import { Injectable, Inject } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Context } from '../config/context';
import { Recipe } from '../database/entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
    private readonly context: Context,
  ) {}

  getRecipe(id: number, userId: number): Promise<Recipe> {
    return this.recipeRepository.findOne({
      where: { id: id, id_usuarios: userId },
    });
  }

  async getRecipeList(userId: number): Promise<Recipe[]> {
    return this.recipeRepository.find({
      select: ['id', 'nome'],
      where: { id_usuarios: userId },
    });
  }
  async getSearchRecipeList(
    searchTerm: string,
    userId: number,
  ): Promise<Recipe[]> {
    return this.recipeRepository.find({
      where: { nome: ILike(`${searchTerm}%`), id_usuarios: userId },
    });
  }

  async postRecipe(requestBody: any, userId: number): Promise<Recipe> {
    const post = new Recipe();
    post.nome = requestBody.Name;
    post.id_usuarios = userId;
    post.id_categorias = requestBody.Category;
    post.tempo_preparo_minutos = requestBody.PreparationTime;
    post.porcoes = requestBody.Servings;
    post.modo_preparo = requestBody.MethodOfPreparation;
    post.ingredientes = requestBody.Ingredients;

    return await this.recipeRepository.save(post);
  }

  async editRecipe(
    requestBody: any,
    ID: number,
    userId: number,
  ): Promise<Recipe> {
    const recipeToUpdate = await this.recipeRepository.findOne({
      where: { id: ID },
    });

    recipeToUpdate.nome = requestBody.Name;
    recipeToUpdate.id_usuarios = userId;
    recipeToUpdate.id_categorias = requestBody.Category;
    recipeToUpdate.tempo_preparo_minutos = requestBody.PreparationTime;
    recipeToUpdate.porcoes = requestBody.Servings;
    recipeToUpdate.modo_preparo = requestBody.MethodOfPreparation;
    recipeToUpdate.ingredientes = requestBody.Ingredients;

    return await this.recipeRepository.save(recipeToUpdate);
  }

  async removeRecipe(ID: number, userId: number): Promise<Recipe> {
    const recipeToRemove = await this.recipeRepository.findOne({
      where: { id: ID, id_usuarios: userId },
    });
    return await this.recipeRepository.remove(recipeToRemove);
  }
}
