import { SubmitFormService } from '../submit-form.service';
import { Client } from '../Client';
import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent implements OnInit {
  public _stop;
  constructor(private _clientDataService:SubmitFormService) {}
  
  public imgs;
  public dots;
  public static imgNum :number = 0;
  public ele ;

  public moreId;
  public dotId;
  public moreBtn;

  ngOnInit(): void {
    this.displaySlides();

    // $('#submitForm').on('click',function(){
    //   $('#contactForm').submit();
    // });

    $("#contactForm").submit(function(e) {
      e.preventDefault();
    
      var $form = $(this);
      $.post($form.attr("action","https://tablewoodfs.netlify.app/"), $form.serialize()).then(function() {
        alert("Thank you!");
      });
    });

  //   $(function() {
  //     //hang on event of form with id=myform
  //     $("#contactForm").submit(function(e) {
  
  //         //prevent Default functionality
  //         e.preventDefault();
  
  //         //get the action-url of the form
  //         var actionurl = "";
  
  //         //do your own request an handle the results
  //         $.ajax({
  //                 url: actionurl,
  //                 type: 'post',
  //                 dataType: 'application/json',
  //                 data: $("#contactForm").serialize(),
  //                 success: function(data) {
  //                     alert("FORM HAS BEEN SUBMITTED");
  //                 }
  //         });
  
  //     });
  
  // });

  }

  // SLIDE MECHANISM
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

  // SLIDE SHOW HOLD FOR SOME TIME WHEN DOT CLICKED
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

  // SCROLLING EFFECT
  scrollSmooth($element){
    $element.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
  }

  // SPECIALITY TEXT
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

  // AFTER CLICK OPEN NAVBAR IN MOBILE
  iconBarExpand() {
    var x = document.getElementById("myNavBar");
    
    if (x.className === "navBar row") {
      x.className += " navBarResp";
    } else {
      x.className = "navBar row";
    }
  }

  // AFTER CLICK HIDE NAVBAR IN MOBILE
  hideUp(){
    var x = document.getElementById("myNavBar");
    if (x.className === "navBar row navBarResp") {
      x.className = "navBar row";
    }
  }
  
  // SHOW MAP WHEN ICON GETS CLICKED
  showApi(){
    var x = document.getElementById("mapApi");
    if(x.className === "col-sm-6 hideIt"){
      x.className = "col-sm-6 mapApi";
    }else{
      x.className = "col-sm-6 hideIt";
    }

  }

  public clientName:string;
  public clientEmail:string;
  public clientMessage:string;
  public client:Client
  // client = new Client("ABC","ABC@123","HI THERE");
  
  submitForm(){
    this.client  = new Client(this.clientName,this.clientEmail,this.clientMessage);
    this.subscribeData();
  }

  subscribeData(){
    // this._clientDataService.sendEmail(this.client).
    // subscribe(
    //   data => console.log("GOT DATA",data),
    // )
    // (ngSubmit)="submitForm()"
  }






}