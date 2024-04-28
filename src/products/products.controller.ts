import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  public create() {
    return 'Product created';
  }

  @Get()
  public findAll() {
    return 'Products fetched';
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
