import Product from "./product";

describe("Product unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() => {

            let product = new Product("", "Product 1", 100);

        }).toThrowError("ID is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {

            let product = new Product("1", "", 100);

        }).toThrowError("Name is required");
    })

    it("should throw error when price is less than zero", () => {
        expect(() => {

            let product = new Product("1", "Product 1", -1);

        }).toThrowError("Price must be greater than zero");
    })

    it("should change name", () => {
        let product = new Product("1", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toEqual("Product 2");
    })

    it("should change price", () => {
        let product = new Product("1", "Product 1", 100);
        product.changePrice(200);
        expect(product.price).toEqual(200);
    })
})