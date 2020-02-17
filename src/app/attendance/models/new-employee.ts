import { config } from '../../config';

export default class NewEmployee {
  name: string;
  department: string;
  location: string;
  inTime: string;
  outTime: string;
  photo: string;
  id: number;
  blobId: string;
  alertId: number;

  constructor(res) {
    const dynamicKey = res.data.awi_facial_recognition.awi_app_data.awi_blobs.awi_blob_ids[0];

    this.department = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_subclass;

    this.inTime = res.data.timestamp;
    this.outTime = res.data.timestamp;
    this.location = res.data.awi_facial_recognition.location;

    this.name = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_label;

    this.id = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_id;

    this.blobId = dynamicKey;
    this.alertId = res.data.awi_facial_recognition.id;
    const img = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].img_base64;
    this.photo = this.getUpdatedImageUrl(img);
  }

  getUpdatedImageUrl(imgUrl) {
    const host = imgUrl.split('/')[2].split(':')[0];
    const port = imgUrl.split('/')[2].split(':')[1];

    let url = imgUrl.replace(host, config.SERVER_ADDRESS);
    url     = url.replace(port, config.PORT);
    return url;
  }
}
