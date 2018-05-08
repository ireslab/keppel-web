import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

declare var $:any
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css','../../assets/css/LoginPages.css'],
})
export class LandingPageComponent implements OnInit,AfterViewInit {
  
  constructor(private sbService:SidebarService) {
      this.sbService.getSidebar("login")
  }

  ngAfterViewInit(){
    $("#SignupButton").on("click", function () {
        $(".DeskTopButtons").animate({ opacity: 0 }, 500);
        $(".DeskTopButtons").css("visibility", "hidden");
        $(".SignupOpenClick").show();
        $(".SignupPopup").css("visibility", "visible");
        $(".SignupPopup").animate({ opacity: 1 }, 500);
    });

    $(".closeBtn").on("click", function () {
        $(".SignupPopup").animate({ opacity: 0 }, 500);
        $(".SignupPopup").css("visibility", "hidden");
        $(".SignupOpenClick").hide();
        $(".DeskTopButtons").css("visibility", "visible");
        $(".DeskTopButtons").animate({ opacity: 1 }, 500);
    })

    $(".SignupOpenClick").on("click", function () {
        $(".closeBtn").click();
    });

     this.AdjustHeight();
  }

  AdjustHeight(){

    if ($(window).width() > 991) {
        var totalHeight = $('.innerBody').outerHeight();
        var JumbotronHeight = $('.Jumbotron').outerHeight();
        JumbotronHeight = JumbotronHeight - (totalHeight - $(window).outerHeight());
        // alert('height'    + JumbotronHeight)
        let isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
        if(!isIEOrEdge)
        $('.Jumbotron img').height(JumbotronHeight + 150);
        else{
          JumbotronHeight = 372.609
          $('.Jumbotron img').height(JumbotronHeight);
        }
        // alert(JumbotronHeight)
        
    }
      
    return;
  }

  ngOnInit() {
    document.getElementById('bg').style.backgroundColor = "#000";
    // $(document).ready(function () {
    //     debugger
    //     $("#SignupButton").on("click", function () {
    //         $(".DeskTopButtons").animate({ opacity: 0 }, 500);
    //         $(".DeskTopButtons").css("visibility", "hidden");
    //         $(".SignupOpenClick").show();
    //         $(".SignupPopup").css("visibility", "visible");
    //         $(".SignupPopup").animate({ opacity: 1 }, 500);
    //     });

    //     $(".closeBtn").on("click", function () {
    //         $(".SignupPopup").animate({ opacity: 0 }, 500);
    //         $(".SignupPopup").css("visibility", "hidden");
    //         $(".SignupOpenClick").hide();
    //         $(".DeskTopButtons").css("visibility", "visible");
    //         $(".DeskTopButtons").animate({ opacity: 1 }, 500);
    //     })

    //     $(".SignupOpenClick").on("click", function () {
    //         $(".closeBtn").click();
    //     });

    //     AdjustHeight();

    //     $(window).on("resize", function () {
    //         AdjustHeight();
    //     });

    // });

    // function AdjustHeight() {
    //     // debugger;
    //     if ($(window).width() > 991) {
    //         var totalHeight = $('.innerBody').outerHeight();
    //         var JumbotronHeight = $('.Jumbotron').outerHeight();
    //         JumbotronHeight = JumbotronHeight - (totalHeight - $(window).outerHeight());
    //         $('.Jumbotron img').height(JumbotronHeight - 40);
    //     }
          
    //     return;
    // }
    
  }





}
