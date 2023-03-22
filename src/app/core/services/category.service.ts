import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@core/domain-classes/category';
import { EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    const url = `Category`;
    return this.httpClient.get<Category[]>(url);
  }

  delete(id) {
    const url = `Category/${id}`;
    return this.httpClient.delete<void>(url);
  }

  update(category: Category) {
    const url = `Category/${category.id}`;
    return this.httpClient.put<Category>(url, category);
  }

  add(category: Category) {
    const url = 'Category';
    return this.httpClient.post<Category>(url, category);
  }

  getSubCategories(id: string) {
    const url = `Category/${id}/subcategories`;
    return this.httpClient.get<Category[]>(url);
  }

  getAllCategoriesForDropDown() {
    const url = `Category/dropdown`;
    return this.httpClient.get<Category[]>(url);
  }
}
