export default class CustomerChangedAddressEvent {
    dataTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any){
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}