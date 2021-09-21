import { Controller ,Param ,Patch ,Get ,Post ,Delete ,Body } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('/products')
export class ProductController {

  constructor( private productsService : ProductsService ){}


  @Get()
  getProducts() : Product[]
  {
    return this.productsService.getProducts() ;
  }


  @Get("/:id")
  getProduct( @Param('id') product_id: string ) : Product
  {
    return this.productsService.getProduct( product_id ) ;
  }

  @Post()
  addProduct( @Body('product') input_product: {title: string ,description: string ,price: number } ) : { id : string }
  {
    const new_product = this.productsService.storeProduct(input_product.title,input_product.description,input_product.price)

    return { id : new_product.id }
  }

  @Patch("/:id")
  updateProduct( @Param('id') product_id: string ,@Body('product') input_product: {title: string ,description: string ,price: number } ) : { id: string }
  {
    this.productsService.updateProduct( product_id ,input_product.title ,input_product.description ,input_product.price ) ;

    return { id : product_id }
  }

  @Delete("/:id")
  deleteProduct( @Param('id') product_id: string ) : { id: string }
  {
    this.productsService.deleteProduct( product_id ) ;

    return { id : product_id }
  }


}