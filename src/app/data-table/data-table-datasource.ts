import { PetServiceService } from './../pet-service.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { IPet } from '../pet';

// TODO: Replace this with your own data model type
// export interface DataTableItem {
//   name: string;
//   id: number;
//   birthday: string;
//   species: string;
//   race: string;
//   vac1: boolean;
//   vac2: boolean;
//   vac3: boolean;
// }

// TODO: replace this with real data from your application
let petService: PetServiceService;
const EXAMPLE_DATA: IPet[] = [
  {id: 1, name: 'Smokey', birthday: "2017-11-17T08:34:32", species: 'cat', race:'German Rex', vac1: true, vac2: false, vac3: false},
  {id: 2, name: 'Tina', birthday: "2017-11-17T08:34:32", species: 'dog', race:'Golden retriever', vac1: true, vac2: false, vac3: true},
  {id: 3, name: 'Ginger', birthday: "2017-11-17T08:34:32", species: 'cat', race:'Munchkin', vac1: false, vac2: true, vac3: false},
  {id: 4, name: 'Paws', birthday: "2017-11-17T08:34:32", species: 'other', race:'Hamster', vac1: true, vac2: false, vac3: true},
  {id: 5, name: 'Kimba', birthday: "2017-08-17T08:34:32", species: 'cat', race:'Scottish Fold', vac1: true, vac2: false, vac3: false},
  {id: 6, name: 'Squirtle', birthday: "2017-11-17T08:34:32", species: 'other', race:'Turtle', vac1: false, vac2: true, vac3: true},
  {id: 7, name: 'Naty', birthday: "2017-11-17T08:34:32", species: 'dog', race:'Fox Terrier', vac1: true, vac2: false, vac3: true},
  {id: 8, name: 'Lily', birthday: "2017-09-17T08:34:32", species: 'dog', race:'Bull Terrier', vac1: true, vac2: false, vac3: false},
  {id: 9, name: 'Crush', birthday: "2017-10-17T08:34:32", species: 'other', race:'Turtle', vac1: false, vac2: true, vac3: false},
  {id: 10, name: 'Patches', birthday: "2017-11-17T08:34:32", species: 'cat', race:'Ragdoll', vac1: true, vac2: false, vac3: true},
];


/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<IPet> {
  // data: IPet[] = EXAMPLE_DATA;
  data: IPet[] = this.dataList;
  constructor(private dataList: IPet[], private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IPet[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: IPet[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: IPet[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
