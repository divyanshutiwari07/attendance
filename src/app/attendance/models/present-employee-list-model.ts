import { isNullOrUndefined } from 'util';
import Employee from './employee';

export default class PresentEmployeeListModel {
    public presentEmployeeList: any[];
    public presentEmpIds: any[];

    public static ModelMap(response) {
        const self = new this();
        const list = self.extractData(response);
        self.setList(list);
        return self;
    }

    private extractData(response): Array<object> {
        if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {
            return [];
        }
        return response.data.map(e => new Employee(e));
    }

    public getList() {
        return this.presentEmployeeList;
    }

    public setList(list) {
        this.presentEmpIds = list.map(emp => emp.id);
        this.presentEmployeeList = [...list];
    }
}

