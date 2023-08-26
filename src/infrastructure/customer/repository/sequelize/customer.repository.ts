import Repository from "../../../../domain/@shared/repository/repo-interface";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements Repository<Customer> {
    async create(entity: Customer): Promise<void> {
       await CustomerModel.create({
            id: entity.id,
            street: entity.Address.street,
            name: entity.name,
            number: entity.Address.number,
            city: entity.Address.city,
            zipcode: entity.Address.zip,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
       });
    }

    async update(entity: Customer): Promise<void> {
       await CustomerModel.update({
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            city: entity.Address.city,
            zipcode: entity.Address.zip,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
         }, { where: { id: entity.id } });
    }
    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({ where: { id: id }, rejectOnEmpty: true });
        } catch (error) {
            throw new Error(`Customer not found`);
        }


        const customer = new Customer(id, customerModel.name);
        const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zipcode);

        customer.changeAddress(address);
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        const customers: Customer[] = [];

        for (const customerModel of customerModels) {
            const customer = new Customer(customerModel.id, customerModel.name);
            const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zipcode);

            customer.changeAddress(address);
            customers.push(customer);
        }

        return customers;
    }
}