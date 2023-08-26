import Product from "../entity/product"
import ProductService from "./product.service"

describe("Product service unit tests", () => {
    it("should change the prices of all products", () => {
        const product1 = new Product("Product 1", "p1", 10)
        const product2 = new Product("Product 2", "p2", 20)
        const products = [product1, product2]

        ProductService.increasePrices(products, 100)

        expect(product1.price).toEqual(20)
        expect(product2.price).toEqual(40)
    })
})