import { Component, OnInit, OnChanges} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { config } from '../../../../config';
import { isNullOrUndefined } from 'util';
import { CameraSourceService } from '../../../services/camera-source.service';


@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.scss']
})
export class LiveStreamComponent implements OnInit, OnChanges {

  public liveStreamCameraInfo;
  public selectedLiveStreamCamera;
  public liveStreamCamUrl;

  constructor(private apiService: ApiService, private cameraSourceService: CameraSourceService) { }

  ngOnInit() {
    this.getListOfSource();
  }

  ngOnChanges() {
  }

  getListOfSource() {

    this.cameraSourceService.loadCameraSources().subscribe(response => {
      console.log('list of sources', response);
      this.liveStreamCameraInfo = this.extractCameraInfo(response);
      if ( this.liveStreamCameraInfo ) {
        this.selectedLiveStreamCamera = this.liveStreamCameraInfo.id;
        this.getLiveStreamCameraId();
      }
    });
  }

  extractCameraInfo(response) {
    if (isNullOrUndefined(response) || response.success === false) {
      return '';
    } else {
      return response.data.map((e) => {
        return { id: e.awi_camid, name: e.awi_camera.location };
      });
    }
  }

  getLiveStreamCameraId() {
    const port = parseInt( config.LIVE_STREAM_PORT, 10 ) + this.selectedLiveStreamCamera;
    this.liveStreamCamUrl = config.LIVE_STREAM_CAMERA_URL + port;
    console.log('livestream', this.liveStreamCamUrl );
    this.cameraSourceService.changeCamera(this.selectedLiveStreamCamera);
  }

}
