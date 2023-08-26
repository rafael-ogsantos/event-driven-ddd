import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedNameEvent from "../customer-changed-name.event";

export default class SendConsoleWhenNameChangedHandler implements EventHandlerInterface<CustomerChangedNameEvent> {
    handle(event: any): void {
        console.log(`sending console log when name is changed ...`, event);
    }
}