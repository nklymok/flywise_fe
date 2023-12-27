import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AirplaneService } from '../Service/Airplane/airplane.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-airplane',
  templateUrl: './add-airplane.component.html',
  styleUrl: './add-airplane.component.css',
})
export class AddAirplaneComponent implements OnInit {
  airplaneForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _airplaneService: AirplaneService,
    private _dialogRef: MatDialogRef<AddAirplaneComponent>,
    private _toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.airplaneForm = _fb.group({
      id: undefined,
      name: '',
    });
  }
  ngOnInit(): void {
    this.airplaneForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (!this.airplaneForm.valid) {
      return;
    }

    const input = this.airplaneForm.value;
    if (this.data) {
      this._airplaneService
        .update(input.id, {
          id: input.id,
          name: input.name,
        })
        .subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this._toast.success('Airplane updated successfully!');
          },
          error: (err) => {
            console.log(err);
            this._toast.error(err);
          },
        });
      return;
    }
    this._airplaneService
      .create({
        name: input.name,
      })
      .subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
          this._toast.success('Airplane added successfully!');
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
}
