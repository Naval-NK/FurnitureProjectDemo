import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent implements OnInit {
  public _stop;
  constructor() {}
  
  ngOnInit(): void {
    this.displaySlides();
  }

  public imgs;
  public dots;
  public static imgNum :number = 0;
  public ele ;

  displaySlides(){
    this.imgs = document.querySelectorAll(".imgs");
    this.dots = document.querySelectorAll(".dot");
    for( let i= 0 ; i<this.imgs.length ; i++ ){
      this.imgs[i].style.display="none";
    }
    if(WinComponent.imgNum >= this.imgs.length){
      WinComponent.imgNum = 0;
    }
    this.imgs[WinComponent.imgNum].style.display="block";
    WinComponent.imgNum++;
    for(let i =0;i<this.dots.length;i++){
      this.dots[i].className = this.dots[i].className.replace(" active","");
    }
    this.dots[WinComponent.imgNum-1].className += " active";
    this._stop = setTimeout(()=>
      this.displaySlides(),6000
    )
  }

  holdThis(num){
    this.imgs = document.querySelectorAll(".imgs");
    for( let i= 0 ; i<this.imgs.length ; i++ ){
      this.imgs[i].style.display="none";
    }
    clearTimeout(this._stop);
    for(let i =0;i<this.dots.length;i++){
      this.dots[i].className = this.dots[i].className.replace(" active","");
    }
    this.dots[num-1].className += " active";
    this.imgs[num-1].style.display="block";
    this._stop = setTimeout(()=>
      this.displaySlides(),6000
    )
  }

  scrollSmooth($element){
    $element.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
  }

  public moreId;
  public dotId;
  public moreBtn;
  showText(){
    this.moreBtn = document.getElementById("btnMore");
    this.dotId = document.getElementById("3dots");
    this.moreId = document.querySelector('#showMore')
    
    if(this.moreId.style.display == 'none'){
      this.moreId.style.display='inline';
      this.moreBtn.style.display='block';
      this.moreBtn.innerHTML='Show Less';
      this.dotId.style.display='none';
    }
    else{
      this.moreId.style.display='none';
      this.moreBtn.style.display='block';
      this.moreBtn.innerHTML='Show More';
      this.dotId.style.display='inline';
    }
  }

  submitForm(event){
    
    if(event.keycode == 13){
      prompt("You have pressed Enter for Search");
    }
  }

  iconBarExpand() {
    var x = document.getElementById("myNavBar");
    
    if (x.className === "navBar row") {
      x.className += " navBarResp";
    } else {
      x.className = "navBar row";
    }
  }
  hideUp(){
    var x = document.getElementById("myNavBar");
    if (x.className === "navBar row navBarResp") {
      x.className = "navBar row";
    }
  }
  
  showApi(){
    var x = document.getElementById("mapApi");
    if(x.className === "col-sm-6 hideIt"){
      x.className = "col-sm-6 mapApi";
    }else{
      x.className = "col-sm-6 hideIt";
    }

  }

}