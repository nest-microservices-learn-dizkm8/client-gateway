import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  public create() {
    return 'Product created';
  }

  @Get()
  public findAll() {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      {
        page: 2,
      },
    );
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return `Product with id ${id} fetched`;
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() body: any) {
    return `Product with id ${id} updated`;
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    return `Product with id ${id} deleted`;
  }
}
