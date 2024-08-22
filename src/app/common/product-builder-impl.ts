import { Product } from "./product";
import { ProductBuilder } from "./product-builder";

export class ProductBuilderImpl implements ProductBuilder {
    

    public id: number = 0;
    public sku: string = '';
    public name: string = '';
    public description: string = '';
    public unitPrice: number = 0;
    public imageUrl: string = '';
    public active: boolean = false;
    public unitsInStock: number = 0;
    public dateCreated: Date = new Date();
    public lastUpdated: Date = new Date();


    setId(id: number): this {
        this.id = id;
        return this;
    }
    setSku(sku: string): this {
        this.sku = sku;
        return this;
    }
    setName(name: string): this {
        this.name = name;
        return this;
    }
    setDescription(description: string): this {
        this.description = description;
        return this;    
    }
    setUnitPrice(unitPrice: number): this {
        this.unitPrice = unitPrice;
        return this;
    }
    setImageUrl(imageUrl: string): this {
        this.imageUrl = imageUrl;
        return this;
    }
    setActive(active: boolean): this {
        this.active = active;
        return this;
    }
    setUnitsInStock(unitsInStock: number): this {
        this.unitPrice = unitsInStock;
        return this;
    }
    setDateCreated(dateCreated: Date): this {
        this.dateCreated = dateCreated;
        return this;
    }
    setLastUpdated(lastUpdated: Date): this {
        this.lastUpdated = lastUpdated;
        return this;
    }
    build(): Product {
        return new Product(this);
    }
}
