import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $('.scroll-top').fadeIn();
        } else {
          $('.scroll-top').fadeOut();
        }
      });
    
      $('.scroll-top').click(function () {
        $("html, body").animate({ scrollTop: 0}, 1100);
        return false;
      });
    
    });
  }

}
