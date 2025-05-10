import { Injectable, OnInit } from '@angular/core';
import { Itodo } from '../model/todo';
import { map, Observable, pipe, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit {
  todoArr: Array<Itodo> = [];
  editSub$: Subject<Itodo> = new Subject<Itodo>();

  AddtodoSub$: Subject<Itodo> = new Subject<Itodo>();

  UpdatetodoSub$: Subject<Itodo> = new Subject<Itodo>();

  RemovetodoSub$:Subject<string> = new Subject<string>();

  BASE_URL: string = `${environment.BASE_URL}`;
  TODO_URL: string = `${this.BASE_URL}/todos.json`;
  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTodo();
  }

  addtodo(todo: Itodo): Observable<any> {
    return this._http.post<Itodo>(this.TODO_URL, todo);
    // return this.todoArr.push(todo);
  }

  fetchTodo(): Observable<Array<any>> {
    return this._http.get<Array<any>>(this.TODO_URL).pipe(
      map((data) => {
        console.log(data);
        let todoArr: Array<Itodo> = [];
        for (const key in data) {
          todoArr.push({ ...data[key], todoId: key });
         
        }
        return todoArr;
      })
    );
  }
  updatetodo(updateobj: Itodo):Observable<Itodo> {
    let UPDATE_URL = `${this.BASE_URL}/todos/${updateobj.todoId}.json`;
    return this._http.patch<Itodo>(UPDATE_URL, updateobj);
    // let getindex = this.todoArr.findIndex(
    //   (todo) => todo.todoId === updateobj.todoId
    // );
    // this.todoArr[getindex] = updateobj;
  }

  romovetodo(removeObj: Itodo):Observable<null> {
    let REMOVE_URL=`${this.BASE_URL}/todos/${removeObj.todoId}.json`;
    return this._http.delete<null>(REMOVE_URL)
    // let getindex = this.todoArr.findIndex(
    //   (todo) => todo.todoId === removeObj.todoId
    // );
    // this.todoArr.splice(getindex, 1);
  }
}
