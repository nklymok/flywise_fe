import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PassengerService } from '../Service/Passenger/passenger.service';
import { AddPassengerComponent } from '../add-passenger/add-passenger.component';
import { PassengerDto } from '../shared/dto/passenger.dto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrl: './passenger.component.css',
})
export class PassengerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'airplaneId', 'action'];
  dataSource!: MatTableDataSource<PassengerDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _passengerService: PassengerService,
    private _toast: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getPassengerList();
  }

  goToAirplanes() {
    this._router.navigate(['/airplane']);
  }

  openAddPassengerModal() {
    const dialogRef = this._dialog.open(AddPassengerComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPassengerList();
        }
      },
      error: (err) => {
        console.log(err);
        this._toast.error(err);
      },
    });
  }

  getPassengerList() {
    this._passengerService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
        this._toast.error(err);
      },
    });
  }

  deletePassenger(id: number) {
    this._passengerService.delete(id).subscribe({
      next: (res) => {
        this._toast.success('Passenger deleted!');
        this.getPassengerList();
      },
      error: (err) => {
        console.log(err);
        this._toast.error(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    data.firstName = data.name.split(' ')[0];
    data.lastName = data.name.split(' ').slice(1).join(' ');
    const dialogRef = this._dialog.open(AddPassengerComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPassengerList();
        }
      },
      error: (err) => {
        console.log(err);
        this._toast.error(err);
      },
    });
  }
}
