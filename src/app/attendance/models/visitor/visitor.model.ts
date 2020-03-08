export default class Visitor {
    id: number;
    name: string;
    photo: string;
    entryTime: string;
    location: string;
    hereToVisit: string;
    purposeOfVisit: string;

    constructor(element) {

        this.id = element.id;
        this.name = element.name;
        this.entryTime = element.entryTime;
        this.location = element.location;
        this.photo = element.photo;
        this.hereToVisit = element.hereToVisit;
        this.purposeOfVisit = element.purposeOfVisit;

    }
}

