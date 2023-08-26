import Customer from "../../customer/entity/customer";
import CustomerChangedNameEvent from "../../customer/event/customer-changed-name.event";
import CustomerCreatedEvent from "../../customer/event/customer.created.event";
import SendConsoleLogWhenCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log-2-when-customer-is-created.handler";
import SendConsoleWhenNameChangedHandler from "../../customer/event/handler/send-console-when-name-changed.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";
import CustomerChangedAddressEvent from "../../customer/event/customer-changed-address.event";
import SendConsoleLogWhenAddressChangedHandler from "../../customer/event/handler/send-console-log-when-address-changed.handler";
import Address from "../../customer/value-object/address";

describe('Domain events tests', () => {
    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenAddressChangedHandler();
        const eventHandler2 = new SendConsoleLogWhenCustomerIsCreatedHandler();
        const eventHandler3 = new SendConsoleLog2WhenCustomerIsCreatedHandler();


        eventDispatcher.register('CustomerChangedAddressEvent', eventHandler);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler3);

        expect(
            eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'])
        .toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'][0]).toMatchObject(eventHandler);

        expect(
            eventDispatcher.getEventHandlers['CustomerCreatedEvent'])
        .toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler2);
    });

    it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0)
    });

    it('should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
    });

    it('should notify all event handlers', () => {
        // aqui é criado o eventDispatcher
        const eventDispatcher = new EventDispatcher();

        // aqui é criado o eventHandler
        const eventHandler = new SendConsoleLogWhenAddressChangedHandler();
        const eventHandler2 = new SendConsoleLogWhenCustomerIsCreatedHandler();
        const eventHandler3 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
        const eventHandler4 = new SendConsoleWhenNameChangedHandler();

        // aqui é criado o spy do eventHandler
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');
        const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');
        const spyEventHandler3 = jest.spyOn(eventHandler3, 'handle');
        const spyEventHandler4 = jest.spyOn(eventHandler4, 'handle');

        // aqui é registrado o eventHandler no eventDispatcher
        eventDispatcher.register('CustomerChangedAddressEvent', eventHandler);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler3);
        eventDispatcher.register('CustomerChangedNameEvent', eventHandler4);
      
        const customerCreatedEvent = new CustomerCreatedEvent({
            name: 'Customer 1',
            email: 'rafael@gmail.com'
        })

        const customer = new Customer('1', 'Customer 1');
        customer.changeName('Customer 2');

        const customerChangedNameEvent = new CustomerChangedNameEvent({
            id: customer.id,
            name: customer.name,
            address: customer.Address
        });

        const address = new Address('Rua 2', 200, '323232', 'SP');

        customer.changeAddress(address)

        const customerChangedAddressEvemt = new CustomerChangedAddressEvent({
            id: customer.id,
            name: customer.name,
            address: customer.Address
        });

        eventDispatcher.notify(customerCreatedEvent);
        eventDispatcher.notify(customerChangedNameEvent);
        eventDispatcher.notify(customerChangedAddressEvemt);

        expect(spyEventHandler).toHaveBeenCalled();

        expect(spyEventHandler2).toHaveBeenCalled();

        expect(spyEventHandler3).toHaveBeenCalled();

        expect(spyEventHandler4).toHaveBeenCalled();
    });
});