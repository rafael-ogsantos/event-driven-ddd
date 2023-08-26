import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class SendConsoleLogWhenAddressChangedHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
    handle(event: any): void {
        console.log(`sending console log when address is changed ...`, event);
    }
}