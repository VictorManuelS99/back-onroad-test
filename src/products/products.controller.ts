import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/public.decorator';
import { CreateProductDto } from './dto/createproduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get('/')
  getAllProducts(@Res() res: Response) {
    const products = this.productsService.getAllProducts();
    res.status(HttpStatus.OK).json(products);
  }

  @Public()
  @Get('/:id')
  getProduct(@Param('id') id: string, @Res() res: Response) {
    const product = this.productsService.getProduct(id);
    product
      ? res.status(HttpStatus.OK).json(product)
      : res.status(HttpStatus.NOT_FOUND).json({ message: 'Product not found' });
  }

  @Public()
  @Put('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() product: CreateProductDto,
    @Res() res: Response,
  ) {
    const productUpdated = this.productsService.updateProduct(id, product);
    res.status(HttpStatus.OK).json(productUpdated);
  }

  @Public()
  @Post('/')
  createProduct(@Body() product: CreateProductDto, @Res() res: Response) {
    const products = this.productsService.createProduct(product);
    res.status(HttpStatus.OK).json(products);
  }

  @Public()
  @Delete('/:id')
  deleteProduct(@Param('id') id: string, @Res() res: Response) {
    const products = this.productsService.deleteProduct(id);
    res.status(HttpStatus.OK).json(products);
  }
}
