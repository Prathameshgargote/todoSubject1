import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _matsnackbar:MatSnackBar
  ) { }

opensnackbar(msg:string){
this._matsnackbar.open(msg,'close',{
  horizontalPosition:'left',
  verticalPosition:'top',
  duration:3000
})
}
}
