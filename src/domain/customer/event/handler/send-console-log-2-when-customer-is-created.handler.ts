import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer.created.event";

export default class SendConsoleLog2WhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: any): void {
        console.log(`sending console log 2 when customer is created ...`, event);
    }
}