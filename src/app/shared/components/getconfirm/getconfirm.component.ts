import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-getconfirm',
  templateUrl: './getconfirm.component.html',
  styleUrls: ['./getconfirm.component.scss'],
})
export class GetconfirmComponent implements OnInit {
  constructor(private _matref: MatDialogRef<GetconfirmComponent>) {}

  ngOnInit(): void {}

  onremove(flag: boolean) {
    this._matref.close(flag);
  }
}
