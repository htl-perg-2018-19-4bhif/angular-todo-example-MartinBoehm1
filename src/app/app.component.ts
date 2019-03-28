import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { doesNotThrow } from 'assert';



interface IPerson{
  name: string
}
interface ITodoItem {
  id: number;
  assignedTo?: string;
  description: string;
  done?: boolean
  } 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  
  constructor (private http: HttpClient){
    this.getPeople();
  }
  selected;
  onlyUndone;
  onlyYours;
  yourName;
  done;
  number;
  people;
  people2;
  description;
  assignedTo;
  todos;
  todo:any="";
  nr = [
  ];

  
  
  title = 'my-new-angular-app';
  async deleteItem(){
    
    await this.http.delete(`http://localhost:8084/api/todos/${this.number}`).toPromise();
    this.loadTodos();
  } 

  async getItem(){
    
    this.todo=await this.http.get(`http://localhost:8084/api/todos/${this.number}`).toPromise();
  } 
  async updateItem(){
    if(this.description!==""){
      await this.http.patch(`http://localhost:8084/api/todos/${this.number}`, {
      "description": this.description}).toPromise();
    }
    if(this.assignedTo!==""){
      await this.http.patch(`http://localhost:8084/api/todos/${this.number}`, {
      "assignedTo": this.assignedTo}).toPromise();
    }
    if(this.done!==""){
      if(this.done==="false"){
        await this.http.patch(`http://localhost:8084/api/todos/${this.number}`, {
          "done": false}).toPromise();
      }else if(this.done==="true"){
        await this.http.patch(`http://localhost:8084/api/todos/${this.number}`, {
          "done":true}).toPromise();
      }
      
    }
    this.loadTodos();
  } 
  async loadTodos(){
    this.todos = await this.http.get<ITodoItem[]>('http://localhost:8084/api/todos').toPromise();
  } 
  async addTodo(){
      await this.http.post('http://localhost:8084/api/todos', {
      "description": this.description,
      "assignedTo": this.assignedTo,
      "done": false
      }).toPromise();
      this.loadTodos();
  }

  /*async getPeople2(){
    this.people2=await this.http.get<IPerson[]>('http://localhost:8084/api/people').toPromise();
  }*/
 async getPeople(){
    this.people = await this.http.get<IPerson[]>('http://localhost:8084/api/people').toPromise();
    /*
    this.nr= [
    ];
    const response = await fetch('http://localhost:8084/api/people');
    const myJson = await response.json(); 
    for (let value of Object.values(myJson)) {
      for (let newValue of Object.values(value)) {
        this.nr.push(newValue)
      }
    }*/
  }
}


