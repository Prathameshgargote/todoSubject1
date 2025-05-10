import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Itodo } from '../../model/todo';
import { TodoService } from '../../services/todo.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';
import { SnackbarService } from '../../services/snackbar.service';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-10px)' }),
            stagger(100, [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),

        query(':leave', [animate('200ms', style({ opacity: 0 }))], {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class TodolistComponent implements OnInit {
  todoArr: Array<Itodo> = [];
  constructor(
    private _todoservice: TodoService,
    private _matdailog: MatDialog,
    private _snakbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.fetchalltodo();
    this.updatetodo();
    this.removetodo();

    console.log(this.todoArr);
  }

  fetchalltodo() {
    this._todoservice.fetchTodo().subscribe((res) => {
      this.todoArr = res;
    });
    this._todoservice.AddtodoSub$.subscribe((res) => {
      console.log(res);
      this.todoArr.push(res);
    });
  }

  updatetodo() {
    this._todoservice.UpdatetodoSub$.subscribe((res) => {
      let getindex = this.todoArr.findIndex(
        (todo) => todo.todoId === res.todoId
      );
      this.todoArr[getindex] = res;
    });
  }

  removetodo() {
    this._todoservice.RemovetodoSub$.subscribe((res) => {
      let getindex = this.todoArr.findIndex((todo) => todo.todoId === res);
      this.todoArr.splice(getindex, 1);
    });
  }

  onremove(todo: Itodo) {
    let matdailogConfig = new MatDialogConfig();
    matdailogConfig.width = '500px';
    matdailogConfig.disableClose = true;

    let matdailogref = this._matdailog.open(GetconfirmComponent);
    matdailogref.afterClosed().subscribe((res) => {
      if (res) {
        this._todoservice.romovetodo(todo).subscribe((remove) => {
          this._todoservice.RemovetodoSub$.next(todo.todoId);
        });

        this._snakbar.opensnackbar(
          `the ${todo.todoitem} is removed Successfully`
        );
      }
    });
  }

  onedit(todo: Itodo) {
    this._todoservice.editSub$.next(todo);
  }
}
