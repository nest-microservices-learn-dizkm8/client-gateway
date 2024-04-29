import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_SERVICE } from 'src/config';
import { PaginationDto } from '../common/dto/pagination.dto';

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
  public findAll(@Query() pagination: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, pagination);
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );

      return product;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Patch(':id')
  public update(@Param('id', ParseIntPipe) id: string, @Body() body: any) {
    return `Product with id ${id} updated`;
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: string) {
    return `Product with id ${id} deleted`;
  }
}
