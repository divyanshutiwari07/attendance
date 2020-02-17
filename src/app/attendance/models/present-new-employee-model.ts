import { isNullOrUndefined } from 'util';
import NewEmployee from './new-employee';

export default class PresentNewEmployeeModel {

  public presentEmployee: any = {};

  public static ModelMap(res) {
    const self = new this();
    const record = self.extractDataForNewEmp(res);
    self.setRecord( record );
    return self;
  }

  private extractDataForNewEmp(res) {

    if (isNullOrUndefined(res) || isNullOrUndefined(res.data) || res.success === false) {
      return [];
    }

    return new NewEmployee(res);
  }

  public getRecord() {
    return this.presentEmployee;
  }

  public setRecord(record) {
    this.presentEmployee = {...record};
  }

  // public getUpdatedImageUrl(img_url) {
  //   const host = img_url.split('/')[2].split(':')[0];
  //   const port = img_url.split('/')[2].split(':')[1];

  //   let url = img_url.replace(host, config.SERVER_ADDRESS);
  //   url     = url.replace(port, config.PORT);
  //   return url;
  // }

}
