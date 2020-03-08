import {isNullOrUndefined} from 'util';
import Visitor from './visitor.model';

export default class VisitorListModel{
    public visitorList: any[];

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
        return response.data.map(e => new Visitor(e));
    }

    public getList() {
        return this.visitorList;
    }

    public setList(list) {
        this.visitorList = [...list];
    }
}

