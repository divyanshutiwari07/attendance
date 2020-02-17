import { Component, OnInit, OnChanges} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { config } from '../../../../config';
import { isNullOrUndefined } from 'util';
import { AuthGuard } from 'src/app/shared/guard';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.scss']
})
export class LiveStreamComponent implements OnInit, OnChanges {

  public liveStreamCameraInfo;
  public selectedLiveStreamCamera;
  public liveStreamCamUrl;
  constructor(private apiService: ApiService, private auth: AuthGuard) { }

  ngOnInit() {
    this.getListOfSource();
  }

  ngOnChanges() {
    console.log('selectedLiveStreamCamera', this.selectedLiveStreamCamera);
  }

  getListOfSource() {
    this.apiService.getListOfSources().subscribe( response => {
      console.log('list of sources', response);
      this.liveStreamCameraInfo = this.extractCameraInfo(response);
      console.log('cam info', this.liveStreamCameraInfo);
      if ( this.liveStreamCameraInfo ) {
        this.selectedLiveStreamCamera = this.liveStreamCameraInfo[0].id;
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
    console.log('port', port);
    this.liveStreamCamUrl = config.LIVE_STREAM_CAMERA_URL + port;
    console.log('livestream', this.liveStreamCamUrl );
  }

}
