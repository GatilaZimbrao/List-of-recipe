import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../database/entities/category.entity';
import { JwtAuthGuard } from 'src/config/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/category/:id')
  getCategory(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getCategory(id);
  }
  @Get('/all-category')
  getCategoriesList(): Promise<Category[]> {
    return this.categoryService.getCategoriesList();
  }
}
