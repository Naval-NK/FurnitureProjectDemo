import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Validators } from '@angular/forms'
declare var $:any;

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})

export class WinComponent implements OnInit {
  public _stop;
  constructor(private http: HttpClient , formBuilder: FormBuilder) {

    // FORM VALIDATION
    this.contactForm = formBuilder.group({
      name: new FormControl('',Validators.compose([Validators.required, Validators.minLength(3),Validators.pattern('[a-z,A-Z ]*')])),
      email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.minLength(9)])),
      message: new FormControl('',Validators.compose([Validators.required,Validators.maxLength(256),Validators.minLength(10)]))
    });
  }
  public imgs;
  public dots;
  public static imgNum :number = 0;
  public ele ;
  public body;
  public moreId;
  public dotId;
  public moreBtn;
  public testForm;
  public formData;
  public _relo;

  ngOnInit(): void {
    this.displaySlides();    
  }


  // -------------------------------------------------------------------------------------

  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl('')
  });

  onSubmit() {
    this.body = new HttpParams()
    .set('form-name', 'contact')
    .append('name', this.contactForm.value.name)
    .append('email', this.contactForm.value.email)
    .append('message', this.contactForm.value.message)
    this.http.post('/', this.body.toString(), {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).subscribe(
      res => {},
      err => {
        if (err instanceof ErrorEvent) {
          //client side error
          alert("Something went wrong when sending your message.");
          console.log(err.error.message);
        } else {
          //backend error. If status is 200, then the message successfully sent
          if (err.status === 200) {
            alert("Your message has been sent!");
            this.pageReload();
          } else {
            alert("Something went wrong when sending your message.");
            this.pageReload();
            console.log('Error status:');
            console.log(err.status);
            console.log('Error body:');
            console.log(err.error);
          };
        };
      }
    );
  };

  pageReload(){
    setTimeout(()=>
      window.location.reload(),1000
    )
  }
  // -------------------------------------------------------------------------------------

  // SLIDE MECHANISM
  displaySlides(){
    try {
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
    } catch (error) {
       
    }
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

  public name:string;
  public email:string;
  public message:string;
  // public client:Client

  // client = new Client("ABC","ABC@123","HI THERE");
  
  // submitForm(){
  //   this.client  = new Client(this.clientName,this.clientEmail,this.clientMessage);
  //   this.subscribeData();
  // }

  // subscribeData(){
  //   this._clientDataService.sendEmail(this.client).
  //   subscribe(
  //     data => console.log("GOT DATA",data),
  //   )
  // }






}




/* VANILLA JS FORM SUBMISSION USING FETCH API
this.testForm = document.querySelector("#contact form"); 
this.testForm.addEventListener('submit', e => {
    e.preventDefault();

    this.formData = new FormData(this.testForm);
    fetch(this.testForm.getAttribute('action'), {
      method: 'POST',
      headers: {
        'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams(this.formData).toString()
    })
    .then(res => {
      if (res) {
        // M.toast({
        //   html: 'Thank you for your submission!',
        //   classes: 'pulse'
        // });
        alert("ASDASD");
      }
    });
  });*/


// JQUERY FOR FORMS
/*
    $('#submitForm').on('click',function(){
      $('#contactForm').submit();
    });

    $("#contactForm").submit(function(e) {
      e.preventDefault();
    
      var $form = $(this);
      $.post($form.attr("action"), $form.serialize()).then(function() {
        alert("Thank you!");
      });
    });

    $(function() {
      //hang on event of form with id=myform
      $("#contactForm").submit(function(e) {
  
          //prevent Default functionality
          e.preventDefault();
  
          //get the action-url of the form
          var actionurl = "";
  
          //do your own request an handle the results
          $.ajax({
                  url: actionurl,
                  type: 'post',
                  dataType: 'application/json',
                  data: $("#contactForm").serialize(),
                  success: function(data) {
                      alert("FORM HAS BEEN SUBMITTED");
                  }
          });
  
      });
  
  });
*/