import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listSize: number;
  page_no: number;
  usersList:any = [];
  httpOptions: { headers: Headers; };

  /*
    Initialized page number and page size and then loaded 1st set of records to the list
  */
  constructor(public navCtrl: NavController,private http: Http) {
    this.listSize = 5;
    this.page_no = 1;
    if(this.usersList.length == 0) {
      this.loadUsers(this.listSize,this.page_no);
    }
  }

  /* 
   loadUsers function used to load records from the service with page size and page number parameters
  */
  loadUsers(size,pageNumber){ 
    this.http.get('https://randomuser.me/api/?results='+size+'&page='+pageNumber).map(res => res.json()).subscribe(data =>
    { console.log(data);
      for(var i=0;i<data.results.length;i++){
        this.usersList.push(data.results[i]);
      }
    });
  }

  /*
    when scroll reached to the end of the screen doInfinite function will be called and will be loaded with next set of records by calling loadUsers function.
  */
  doInfinite(infiniteScroll){
    this.listSize += 5;
    this.page_no +=1;
    setTimeout(() => {
      this.loadUsers(this.listSize,this.page_no);
      infiniteScroll.complete();
      }, 500);
  }
  /*
    dateFormat function is used to convert date from database format to DD-MON-YYYY
  */
  dateFormat(date){
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return day+"-"+months[month]+"-"+year;
  }
}
