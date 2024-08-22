import { ProductBuilderImpl } from "./product-builder-impl";

export class Product {
    public id: number;
    public sku: string;
    public name: string;
    public description: string;
    public unitPrice: number;
    public imageUrl: string;
    public active: boolean;
    public unitsInStock: number;
    public dateCreated: Date;
    public lastUpdated: Date;

    constructor(builder: ProductBuilderImpl){
        this.id = builder.id;
        this.sku = builder.sku;
        this.name = builder.name;
        this.description = builder.description;
        this.unitPrice = builder.unitPrice;
        this.imageUrl = builder.imageUrl;
        this.active = builder.active;
        this.unitsInStock = builder.unitsInStock;
        this.dateCreated = builder.dateCreated;
        this.lastUpdated = builder.lastUpdated;
    }

}
