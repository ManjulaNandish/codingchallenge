import { Component, OnInit, ViewChild, Injectable, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss'],
 
})
export class NavBar implements OnInit {
    
    @Output() navstatus = new EventEmitter();
 


  constructor() {
  
  }

  ngOnInit() {
  }

  setHome(event, navitem: string){
     

     let evn = event;
  let styleclass: string = "active";
  const btnNor = document.getElementsByClassName(
    styleclass
  ) as HTMLCollectionOf<HTMLElement>;
  btnNor[0].classList.remove(styleclass);
  evn.currentTarget.classList.add(styleclass);
  this.navstatus.emit({state: navitem});

  }
 


}
