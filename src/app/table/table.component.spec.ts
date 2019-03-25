import { TableComponent } from './table.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MessageBrokerService } from '../_services/message-broker.service';
import { NestedFormDirective } from '../directives/nested-form.directive';
import { AlertListService } from '../_services/alert-list.service';
import { NestedFormService } from '../_services/nested-form.service';
import { PagerService } from '../_services/pager.service';
import { OrgChartModule } from 'ng2-org-chart';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      declarations: [TableComponent, NestedFormDirective],
      imports: [RouterTestingModule, FormsModule],
      providers: [MessageBrokerService, NestedFormService, AlertListService, PagerService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.tableIsEditable = true;
    component.pagination = null;
    component.tableShowRowNumber = false;
    component.tableShowCheckBoxes = false;
    component.tableShowAddButton = false;
    component.showTableFilterText = false;
    component.tableFilterText = '';
    component.tableHeaders = [];
    component.tableContents = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
