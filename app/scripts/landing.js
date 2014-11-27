$(document).ready(function() { 
    $('.hero-content h3').click(function(){
      var subText = $(this).text();
       $(this).text(subText + "!");
    });


  //Extra Exercises

  /*
  var fadeOut = function(event){
    console.log("You clicked on the Bloc Jams Header.");
    $(this).fadeOut("slow");
  }
  
  $('nav').click(fadeOut);
  

  var changeColorOn = function(event) {
    $(this).css("color","green");
  };

  var changeColorOff = function(event) {
    $(this).css("color","white")
  };
  
    $('.hero-content h3').hover(changeColorOn, changeColorOff);
 
   
  var changeFontSize = function(event) {
    console.log("Click-action triggered.");
    $(this).css({'font-size': '30px'});
  };

    $('h5').click(changeFontSize);
*/

   var onHoverAction = function(event) {
     console.log('Hover action triggered.');
     $(this).animate({'margin-top': '10px'});
   };
 
   var offHoverAction = function(event) {
     console.log('Off-hover action triggered.');
     $(this).animate({'margin-top': '0px'});
   };
 
    $('.selling-points .point').hover(onHoverAction, offHoverAction);
  });

