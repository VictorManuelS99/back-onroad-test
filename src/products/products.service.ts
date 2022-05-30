import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Product } from 'src/models';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: uuid(),
      name: 'Product 1',
      price: 100,
      description: 'Product 1 description',
    },
    {
      id: uuid(),
      name: 'Product 2',
      price: 200,
      description: 'Product 2 description',
    },
  ];

  createProduct(product: Omit<Product, 'id'>) {
    this.products.push({ id: uuid(), ...product });
    return this.products;
  }

  getAllProducts() {
    return this.products;
  }

  getProduct(id: string) {
    return this.products.find((product) => product.id === id);
  }

  updateProduct(id: string, product: Omit<Product, 'id'>) {
    const index = this.products.findIndex((p) => p.id === id);
    this.products[index] = { id, ...product };
    return this.products[index];
  }

  deleteProduct(id: string) {
    const index = this.products.findIndex((p) => p.id === id);
    this.products.splice(index, 1);
    return this.products;
  }
}
