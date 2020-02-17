export default class Employee {
    name: string;
    inTime: string;
    outTime: string;
    location: string;
    department: string;
    photo: string;
    id: number;

    constructor(element) {
        const dynamicKey = element.awi_data.awi_app_data.awi_blobs.awi_blob_ids[0];

        this.name = element.awi_label;
        this.inTime = element.first_presence;
        this.outTime = element.last_presence;
        this.location = element.awi_data.location;
        this.department = element.awi_data.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_subclass;
        this.id = element.awi_data.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_id;

    }

//     public getUpdatedImageUrl(img_url) {
//     const host = img_url.split('/')[2].split(':')[0];
//     const port = img_url.split('/')[2].split(':')[1];

//     let url = img_url.replace(host, config.SERVER_ADDRESS);
//     url     = url.replace(port, config.PORT);
//     return url;
//   }
}

