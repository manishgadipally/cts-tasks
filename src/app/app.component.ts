import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userTable: FormGroup;
  control: FormArray;
  mode = false;
  touchedRows: any;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([]),
    });
    this.addRow();
  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      dob: ['', [Validators.required]],
      bloodGroup: [''],
      mobNumber: ['', [Validators.required, Validators.maxLength(10)]],
      isEditable: [true],
    });
  }

  addRow() {
    const control = this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: any) {
    const grp = group as FormGroup;
    grp.get('isEditable')!.setValue(true);
  }

  doneRow(group: any) {
    const grp = group as FormGroup;
    grp.get('isEditable')!.setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls
      .filter((row) => row.touched)
      .map((row) => row.value);
    console.log(this.touchedRows);
  }

  toggleTheme() {
    this.mode = !this.mode;
  }
}
