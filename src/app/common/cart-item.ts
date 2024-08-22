import { Product } from "./product";
import { ProductBuilderImpl } from "./product-builder-impl";

export class CartItem extends Product {

    quantity: number;

    constructor(product: Product) {
        let productBuilder = new ProductBuilderImpl();
        productBuilder.setId(product.id)
               .setName(product.name)
               .setImageUrl(product.imageUrl)
               .setUnitPrice(product.unitPrice);
        super(productBuilder);
        this.quantity = 1;
    }


}
