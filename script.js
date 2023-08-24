
function displayTime() {
    var currentDay = $('#currentDay');
    var day = dayjs().format('MMMM DD, YYYY');

    return(
    currentDay.text(day));

}
setInterval(displayTime, 1000); 
console.log(displayTime());

$(function (){
//This grabs the current hour from dayjs to use in later functions
  var currentHour = dayjs().format('H');
  console.log(currentHour);

/* This function is used to toggle between classes based on if the block hour is equal to,
less than or greater than the current hour, telling the timeblocks what class to use based off of their hour*/
  function hourColor() {
    $('.time-block').each(function() {
      var blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }

  // this function will change the color according to whether it is past, present, or future
  function blockColor(){
    $('.time-block').each(function() {
      var blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

// this function will save user input to a text area in local storage
  function textEntry(){
    $('.saveBtn').on('click', function(){
      var key = $(this).parent().attr('id');
      var value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    
      //this is just to show text in an animated way whenever the save button is clicked
      $('#local-div').toggle('slow', function() {
        console.log('button clicked, animation complete');
      });
    });
  }

     // This will retreive the user input from local storage, saved from the textEntry function
        $('.time-block').each(function() {
      const key = $(this).attr('id');
      const value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });

    hourColor();
    textEntry();                
    blockColor();
  });

