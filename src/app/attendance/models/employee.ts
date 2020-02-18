import * as Utils from '../common/utils';
import { config } from '../../config';

export default class Employee {
    name: string;
    inTime: string;
    outTime: string;
    inTimeForCSV: string;
    location: string;
    department: string;
    type: string;
    photo: string;
    id: number;

    constructor(element) {
        const dynamicKey = element.awi_data.awi_app_data.awi_blobs.awi_blob_ids[0];
        const intime = element.first_presence;
        const outtime = element.last_presence;

        this.name = element.awi_label;
        this.inTime = intime;
        this.inTimeForCSV =  Utils.getFormattedTime(intime);
        this.outTime = Utils.getFormattedTime(outtime);

        this.location = element.awi_data.location;
        this.type = element.type;
        this.department = element.awi_data.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_subclass;
        this.id = element.awi_data.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_id;

        const img = element.awi_data.awi_app_data.awi_blobs[dynamicKey].img_base64;
        this.photo = this.getUpdatedImageUrl(img);

    }

    getUpdatedImageUrl(img_url) {
        const host = img_url.split('/')[2].split(':')[0];
        const port = img_url.split('/')[2].split(':')[1];

        let url = img_url.replace(host, config.SERVER_ADDRESS);
        url     = url.replace(port, config.PORT);
        return url;
    }
}

