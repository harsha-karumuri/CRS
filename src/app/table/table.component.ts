import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs'; //Observable
import { Router } from '@angular/router';
import { Pagination } from './Pagination';
import { TableHeaders } from '../shared/models/table-headers.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input()
  tableIsEditable: boolean = false;
  @Input()
  pagination: Pagination = null;
  @Input()
  tableShowRowNumber: boolean = false;
  @Input()
  tableShowCheckBoxes: boolean = false;
  @Input()
  tableShowDelete: boolean = false;
  @Input()
  tableShowAddButton: boolean = false;
  @Input()
  showTableFilterText: boolean = false;
  @Input()
  tableFilterText: string = '';
  tableFilterTextCopy: string = '';
  @Input()
  tableHeaders: TableHeaders[] = [];
  @Input()
  tableContents: any[] = [];
  @Output()
  checkBoxSelectionArray: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output()
  public imgEventEmitterFromTable: EventEmitter<any> = new EventEmitter<any>();
  datastore: {
    defaultFilterText: boolean;
    filteredRows: any[];
    selectedRows: any[];
    rawData: any[];
    filters: any;
    filterArray: any;
    type: string;
    pager: any;
    currentPage: number;
    addRowsCount: number;
    delteRowsCount: number;
    tableContentArray: any[];
  };
  constructor(public router: Router) {
    this.datastore = {
      defaultFilterText: false,
      filteredRows: [],
      selectedRows: [],
      rawData: [],
      filters: {},
      filterArray: {},
      type: '',
      pager: {},
      currentPage: 1,
      addRowsCount: 1,
      delteRowsCount: null,
      tableContentArray: []
    };
  }

  ngOnInit(): void {}
  ngOnChanges(changes) {
    this.checkHeadersAndContetMatching();
    this.tableContents.map((content, index) => {
      content.rowNumber = index + 1;
    });
    // this.checkPagination();
  }
  private checkHeadersAndContetMatching() {
    this.datastore.rawData = this.tableContents;
    this.datastore.filteredRows = this.tableContents;
    this.createTableFilterText();
    this.creatingFilterObjects();
    this.createDropDownArrays();
  }

  creatingFilterObjects() {
    this.tableHeaders.forEach(header => {
      // Create an array to store all the values if it is dropdown
      if (header.filterType === 'dropdown') {
        this.datastore.filterArray[header.name] = [];
      }
      // Create search string for every header to assign the searched value whenever we made a search
      this.datastore.filters[header.name] = '';
    });
  }
  // when user searches give the respective value to filter object to respective filter string
  public onFilter(value, header) {
    this.datastore.filters[header.name] = value;
    this.filterApplicationList(header);
  }
  // Check if the string has length greater than 0
  // If greater than zero filter the array by checking the index
  private filterApplicationList(header) {
    this.datastore.filteredRows = this.datastore.rawData.slice();
    if (this.datastore.filters[header.name].length > 0) {
      this.datastore.filteredRows = this.datastore.filteredRows.filter(x => {
        return (
          x[header.bodyPropName] &&
          x[header.bodyPropName]
            .toString()
            .toLowerCase()
            .indexOf(this.datastore.filters[header.name].toString().toLowerCase()) >= 0
        );
      });
    }
    // The Values in dropdowns should be changing based on filter
    this.createDropDownArrays();
    this.createTableFilterText();
  }
  private createDropDownArrays() {
    this.tableHeaders.forEach(header => {
      if (header.filterType === 'dropdown') {
        this.dropDownList(header);
      }
    });
  }
  private dropDownList(header) {
    // Iterate through the filtered Rows.
    this.datastore.filterArray[header.name] = [];
    this.datastore.filteredRows.forEach(application => {
      // If the element is not in the list, add them.
      if (this.datastore.filterArray[header.name].indexOf(application[header.bodyPropName]) < 0) {
        this.datastore.filterArray[header.name].push(application[header.bodyPropName]);
      }
    });
  }
  public createTableFilterText() {
    if (this.showTableFilterText && this.tableFilterText && this.tableFilterText.length > 0) {
      this.replaceFilterText();
    } else if (this.showTableFilterText && ((this.tableFilterText && this.tableFilterText.length === 0) || !this.tableFilterText)) {
      this.tableFilterText = `Showing
      <span class="badge badge-warning">filteredRowsCount</span> out of totalRowsCount Record(s)`;
      this.replaceFilterText();
    }
  }
  public replaceFilterText() {
    this.tableFilterTextCopy = this.tableFilterText.replace(/filteredRowsCount/gi, `${this.datastore.filteredRows.length}`);
    this.tableFilterTextCopy = this.tableFilterTextCopy.replace(/totalRowsCount/gi, `${this.datastore.rawData.length}`);
  }
  public checkBoxSelected(application) {
    const index = this.datastore.selectedRows.indexOf(application);

    // If the application is not in the selectedRows array, add it.
    if (index < 0) {
      this.datastore.selectedRows.push(application);
    } else {
      this.datastore.selectedRows.splice(index, 1);
    }
    this.checkBoxSelectionArray.emit(this.datastore.selectedRows);
  }
  public allCheckBoxSelected() {
    if (this.datastore.selectedRows.length === this.datastore.filteredRows.length) {
      this.datastore.selectedRows = [];
    }
    // Otherwise, select all the applications.
    else {
      // Use .slice() to copy the array rather than creating a reference.
      this.datastore.selectedRows = this.datastore.filteredRows.slice();
    }
    this.checkBoxSelectionArray.emit(this.datastore.selectedRows);
  }
  // public checkPagination() {
  //   this.datastore.pager = this.pagerService.getPager(
  //     this.datastore.rawData.length,
  //     this.datastore.currentPage,
  //     this.numberOfRowsPerTablePagination
  //   );
  // }
  public addRows() {
    let length = this.datastore.filteredRows.length;
    for (let i = 0; i < this.datastore.addRowsCount; i++) {
      let data = {};
      this.tableHeaders.forEach(header => {
        data[header.bodyPropName] = '';
      });
      data['rowNumber'] = length + i + 1;
      if (this.datastore.rawData.indexOf(data) < 0) {
        this.datastore.rawData.push(data);
      }
    }
    this.datastore.addRowsCount = 1;
  }
  public deleteRows() {
    this.datastore.rawData.splice(this.datastore.rawData.length - this.datastore.delteRowsCount, this.datastore.delteRowsCount);
    this.datastore.delteRowsCount = null;
  }
  public deleteSelectedRow(index) {
    let i: any;
    this.datastore.rawData.forEach((data, rawIndex) => {
      let checkIfNotEqual = false;
      this.tableHeaders.forEach(header => {
        if (data[header.bodyPropName] !== this.datastore.filteredRows[index][header.bodyPropName]) {
          checkIfNotEqual = true;
        }
      });
      if (!checkIfNotEqual) {
        i = rawIndex;
      }
    });
    if (i) {
      this.datastore.rawData.splice(i, 1);
    }
  }
  public colSpan() {
    let count =
      this.tableShowRowNumber && this.tableShowCheckBoxes
        ? this.tableHeaders.length + 2
        : this.tableShowRowNumber || this.tableShowCheckBoxes
        ? this.tableHeaders.length + 1
        : this.tableHeaders.length;
    if (this.deleteSelectedRow) {
      count += count;
    }
    return count;
  }
  public getValueOfTableContent(data, array): string {
    let res = '';
    array.forEach(element => {
      res += data[element] + ' ';
    });
    return data['rowNumber'] + '. ' + res;
  }
  public getContentDropdownArray(array, index, property) {
    return this.datastore.filteredRows
      .filter((row, indexForFilter) => {
        if (index <= indexForFilter) {
          return false;
        }
        let res = '';
        array.forEach(element => {
          res += row[element] ? row[element] : '' + ' ';
        });
        return res.replace(/\s/g, '').length > 0;
      })
      .slice();
  }
  public checkValidation(propname, form, warning) {
    if (form.form.controls[propname]) {
      return form.form.controls[propname].touched && (form.form.controls[propname].invalid || (warning && !form.form.controls[propname].value));
    }
    return false;
  }
  public rowValidation(headers, index, form) {
    let valid = true;
    for (let i = 0; i < headers.length; i++) {
      if (form.form.controls[headers[i].bodyPropName + index + i]) {
        valid =
          form.form.controls[headers[i].bodyPropName + index + i].touched &&
          (form.form.controls[headers[i].bodyPropName + index + i].invalid || (headers[i].warning && !form.form.controls[headers[i].bodyPropName + index + i].value));
        if (valid) return valid;
      }
    }
    return valid;
  }
  public downloadFile(model) {}
  public checkRequired(key, application) {
    let required = true;
    if (key.requiredDependentCondition && Array.isArray(key.requiredDependentCondition) && key.requiredDependentCondition.length > 0) {
      key.requiredDependentCondition.forEach(dependentCondition => {
        required = required && dependentCondition.dependentBodyPropValues.includes(application[dependentCondition.dependentBodyPropName]);
      });
    }
    return required && key.required;
  }
  public invokeParent(application) {
    this.imgEventEmitterFromTable.emit(application);
  }
}
