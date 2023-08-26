import Address from "../value-object/address";
import Customer from "./customer";

describe("Customner unit test", () => {

    it("should throw error when id is empty", () => {
        
        expect(() => {
            let customer = new Customer('', 'John Doe');
        }).toThrowError('Id is required');

        expect(() => {
            let customer = new Customer('123', '');
        }).toThrowError('Name is required');
        
    });

    it("should change name", () => {
        const customer = new Customer('123', 'John Doe');
        customer.changeName('Jane Doe');
        
        expect(customer.name).toBe('Jane Doe');
    });

    it("should activate customer", () => {
        const customer = new Customer('1', 'Customer 1');
        const address = new Address('Street 1', 123, '12345-123', 'Sao paulo');
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should desactivate customer", () => {
        const customer = new Customer('1', 'Customer 1');

        customer.desactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer('1', 'Customer 1');
    
            customer.activate();
        }).toThrowError('Address is required');
    });

    it("should add reward points", () => {
        const customer = new Customer('1', 'Customer 1');
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

});