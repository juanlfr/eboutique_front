import { Product } from "./product";

export interface ProductBuilder {
    setId(id: number): this;
    setSku(sku: string): this;
    setDescription(description: string): this;
    setUnitPrice(unitPrice: number): this;
    setImageUrl(imageUrl: string): this;
    setActive(active: boolean): this;
    setUnitsInStock(unitsInStock: number): this;
    setDateCreated(dateCreated: Date): this;
    setLastUpdated(lastUpdated: Date): this;
    build(): Product;

}
