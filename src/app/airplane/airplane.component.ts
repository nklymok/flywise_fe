import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AirplaneService } from '../Service/Airplane/airplane.service';
import { AddAirplaneComponent } from '../add-airplane/add-airplane.component';
import { AirplaneDto } from '../shared/dto/airplane.dto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airplane',
  templateUrl: './airplane.component.html',
  styleUrl: './airplane.component.css',
})
export class AirplaneComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource!: MatTableDataSource<AirplaneDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _airplaneService: AirplaneService,
    private _toast: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getAirplaneList();
  }

  goToPassengers() {
    this._router.navigate(['/passenger']);
  }

  openAddAirplaneModal() {
    const dialogRef = this._dialog.open(AddAirplaneComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAirplaneList();
        }
      },
      error: (err) => {
        console.log(err);
        this._toast.error(err);
      },
    });
  }

  getAirplaneList() {
    this._airplaneService.getAll().subscribe({
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

  deleteAirplane(id: number) {
    this._airplaneService.delete(id).subscribe({
      next: (res) => {
        this._toast.success('Airplane deleted!');
        this.getAirplaneList();
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
    const dialogRef = this._dialog.open(AddAirplaneComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAirplaneList();
        }
      },
      error: (err) => {
        console.log(err);
        this._toast.error(err);
      },
    });
  }
}
