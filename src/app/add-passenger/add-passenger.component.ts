import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PassengerService } from '../Service/Passenger/passenger.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrl: './add-passenger.component.css',
})
export class AddPassengerComponent implements OnInit {
  passengerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _passengerService: PassengerService,
    private _dialogRef: MatDialogRef<AddPassengerComponent>,
    private _toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.passengerForm = _fb.group({
      id: undefined,
      firstName: '',
      lastName: '',
      age: 0,
      airplaneId: 0,
    });
  }
  ngOnInit(): void {
    this.passengerForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (!this.passengerForm.valid) {
      return;
    }

    const input = this.passengerForm.value;
    if (this.data) {
      this._passengerService
        .update(input.id, {
          id: input.id,
          name: input.firstName + ' ' + input.lastName,
          age: input.age,
          airplaneId: input.airplaneId,
        })
        .subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this._toast.success('Passenger updated successfully!');
          },
          error: (err) => {
            console.log(err);
            this._toast.error(err);
          },
        });
      return;
    }
    this._passengerService
      .create({
        name: input.firstName + ' ' + input.lastName,
        age: input.age,
        airplaneId: input.airplaneId,
      })
      .subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
          this._toast.success('Passenger added successfully!');
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
}
