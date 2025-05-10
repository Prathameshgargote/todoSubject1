import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UuidService } from '../../services/uuid.service';
import { TodoService } from '../../services/todo.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.scss'],
})
export class TodoformComponent implements OnInit {
  editId!: string;
  todoform!: FormGroup;
  iseditmode: boolean = false;
  constructor(
    private _uuid: UuidService,
    private _todoservice: TodoService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.todoformcreate();
    this.patchtodo();
  }

  patchtodo() {
    this._todoservice.editSub$.subscribe((res) => {
      console.log(res);
      if (res) {
        this.editId = res.todoId;
        this.iseditmode = true;
        this.todoform.patchValue(res);
      } else {
        this.iseditmode = false;
      }
    });
  }

  todoformcreate() {
    this.todoform = new FormGroup({
      todoitem: new FormControl(null, Validators.required),
      // todoId: new FormControl(null, Validators.required),
    });
  }
  Onsubmittodo() {
    if (this.todoform.valid) {
      if (this.iseditmode) {
        let updateobj = { ...this.todoform.value, todoId: this.editId };
        this._todoservice.updatetodo(updateobj).subscribe((res) => {
          console.log(res);
          this.iseditmode = false;
          this._todoservice.UpdatetodoSub$.next(res);
        });

        this.todoform.reset();
        this._snackbar.opensnackbar(
          `the ${updateobj.todoitem} is updtae sucessfully !!`
        );
      } else {
        let newtodo = this.todoform.value;
        console.log(newtodo);
        this._todoservice.addtodo(newtodo).subscribe((res) => {
          let addobj = { ...newtodo, todoId: res.name };
          console.log(addobj);
          this._todoservice.AddtodoSub$.next(addobj);
        });
        this.iseditmode = false;
        this.todoform.reset();
        this._snackbar.opensnackbar(
          `the ${newtodo.todoitem} is added sucessfully !!`
        );
      }
    }

    // console.log(this.todoform);
    // if (this.todoform.valid) {
    //   let newtodo = this.todoform.value;
    //   console.log(newtodo);
    //   this._todoservice.addtodo(newtodo).subscribe((res) => {
    //     let addobj = { ...newtodo, todoId: res.name };
    //     console.log(addobj);
    //     this._todoservice.AddtodoSub$.next(addobj);
    //   });
    //   this.iseditmode = false;
    //   this.todoform.reset();
    //   this._snackbar.opensnackbar(
    //     `the ${newtodo.todoitem} is added sucessfully !!`
    //   );
    // }
  }

  // onupdate() {
  //   if (this.todoform.valid) {
  //     let updateobj = { ...this.todoform.value, todoId: this.editId };
  //     this._todoservice.updatetodo(updateobj).subscribe((res) => {
  //       console.log(res);
  //       this.iseditmode = false;
  //       this._todoservice.UpdatetodoSub$.next(res);
  //     });
  //     this.todoform.reset();
  //     this._snackbar.opensnackbar(
  //       `the ${updateobj.todoitem} is updtae sucessfully !!`
  //     );
  //   }
  // }
}
