import Order from "./order";
import OrderItem from "./order_item";


describe("Order unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() => {  
            let order = new Order("", "customer-id", []);
        }).toThrowError("ID is required");  
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {  
            let order = new Order("order-id", "", []);
        }).toThrowError("CustomerId is required");  
    });

    it("should return throws when items is empty", () => {
        expect(() => {
            let order = new Order("order-id", "customer-id", []);
        }).toThrowError("Quantity must be greater than 0");
    });

    it("should calculate total", () => {
        const item = new OrderItem("i1", "item1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "item2", 200, "p2", 2);
        const order = new Order("order-id", "customer-id", [item]);

        let total = order.total();

        expect(total).toEqual(200);

        const order2 = new Order("order-id", "customer-id", [item, item2]);

        total = order2.total();
        expect(total).toEqual(600);
    });

    it("should throw error if the item qte is less or equal 0", () => { 
        expect(() => {     
            const item = new OrderItem("i1", "item1", 100, "p1", 0) 
            const order = new Order("order-id", "customer-id", [item]);
        }).toThrowError("Quantity must be greater than 0")
    });
});