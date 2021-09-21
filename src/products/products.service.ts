import { Injectable ,NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {

    private products: Product[] = [] ;

    storeProduct( title: string ,description: string ,price: number ) : Product
    {
        const product = new Product( Math.random().toString() ,title ,description ,price )

        this.products.push( product )

        return product ;
    }

    getProducts() : Product[]
    {
        return [...this.products] ;
    }

    getProduct( product_id: string ) : Product
    {
        const { product } = this.findProduct( product_id) ;

        if( !product )
            throw new NotFoundException("Product not found!") ;

        return {...product} ;
    }

    updateProduct( id: string ,title: string ,description: string ,price: number ) : Product
    {
        const { index ,product} = this.findProduct( id )

        product.title = title ? title : product.title ;
        product.description = description ? description : product.description ;
        product.price = price ? price : product.price ;

        this.products[index] = product

        return {...product} ;
    }

    deleteProduct( id: string ) : void 
    {
        const { index } = this.findProduct( id )

        this.products.splice(index,1)
    }

    

    // ===================================================================== // 

    private findProduct( id: string ) : { product: Product ,index: number } 
    {
        const index =  this.products.findIndex( item => item.id === id )

        const product = this.products[index] 

        if( !product )
            throw new NotFoundException("Product not found!") ;

        return { product: {...product} ,index } 
    }
}
