import { PetServiceService } from './../pet-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { IPet } from '../pet';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataList: IPet[];
  dataSource: DataTableDataSource;
  constructor(private _petService: PetServiceService) {
    
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'birthday', 'species', 'race', 'vac1', 'vac2', 'vac3', 'actions'];

  ngOnInit() {
    this._petService.getPets()
    .subscribe(data => {
      this.dataList = data;
     // this.listData = new MatTableDataSource(data);
     this.dataSource = new DataTableDataSource(this.dataList, this.paginator, this.sort);
    });
  //   this._petService.postPet()
  // .subscribe(pet => this.dataList.push(pet));
  }
}
