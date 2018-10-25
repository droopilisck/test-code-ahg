import { PetServiceService } from './../pet-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataTableDataSource } from './../data-table/data-table-datasource';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource: DataTableDataSource;
  public pets = [];
  listData: MatTableDataSource<any>;
  displayedColumns = ['id', 'name', 'birthday', 'species', 'race', 'vac1', 'vac2', 'vac3'];
  // displayedColumns = ['id', 'name'];

  constructor(private _petService: PetServiceService) { }

  ngOnInit() {
    this._petService.getPets()
    .subscribe(data => {
      this.pets = data;
     // this.listData = new MatTableDataSource(data);
    });
  }

}
