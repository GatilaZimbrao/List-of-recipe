import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategory(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id: id } });
  }
  async getCategoriesList(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
