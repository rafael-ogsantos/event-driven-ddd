export default class CustomerChangedNameEvent {
    dataTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any){
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}