// import { Common } from './common.model';
// import { RequiredDependentCondition } from './RequiredDependentCondition';

export class TableHeaders {
  //export class TableHeaders extends Common {
  name: string = '';
  bodyPropName: string = '';
  filterType: string = '';
  bodyInputType: string = '';
  dependentFields: any[] = [];
  selectFields: any[] = [];
  iconClass: any[] = [];
  warning: boolean = false;
  required: boolean = false;
  //  requiredDependentCondition: RequiredDependentCondition[] = [];
  pattern: string = '';
  validations: any[] = [];
  maxLength: number = null;
  contentType: string = '';
  hidden: boolean = false;
  mapObject: any;
  constructor(obj?) {
    // super();
    // // If an object has been passed into the constructor, we need to parse it.
    // if (typeof obj !== 'undefined') {
    //   this.mapObject.call(this, obj);
    // }
  }
}
