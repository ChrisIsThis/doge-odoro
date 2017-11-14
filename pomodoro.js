$("document").ready(function(){
  var workCounter = 20;
  var breakCounter = 5;
  var secondsStart = 0;
  var isPaused = 0;
  var isWork = 1;
  var countDown;
  var hasStarted = 0;

  $("#work-add").click(function(){
    workCounter++;
    $("#work-time").html(workCounter);
  })

  $("#work-subtract").click(function(){
    if(workCounter >0){
      workCounter--;
      $("#work-time").html(workCounter);
    }
  })

  $("#break-add").click(function(){
    breakCounter++;
    $("#break-time").html(breakCounter);
  })

  $("#break-subtract").click(function(){
    if(breakCounter > 0){
      breakCounter--;
      $("#break-time").html(breakCounter);
    }
  })

  $("#work-start").click(function(){
    secondsStart = workCounter * 60 + 1;
    workOn();
    isWork = 1;
    hasStarted = 1;
    $("#pause").html("paws");
    clearInterval(countDown);
    countDown = setInterval(function(){startTimer()},1000);
  })

  $("#break-start").click(function(){
    secondsStart = breakCounter * 60 + 1;
    breakOn();
    isWork = 0;
    hasStarted = 1;
    $("#pause").html("paws");
    clearInterval(countDown);
    countDown = setInterval(function(){startTimer()},1000);
  })

  $("#plus-one").click(function(){
    secondsStart = secondsStart + 60;
    hasStarted = 1;
    clearInterval(countDown);
    if(isPaused === 0){
      countDown = setInterval(function(){startTimer()},1000);
    } else {
      minutes = Math.floor(secondsStart/60);
      if (secondsStart - minutes * 60 > 9){
        seconds = secondsStart - minutes * 60;
      } else {
        tmp = secondsStart - minutes * 60
        seconds = "0" + tmp;
      }
      $("#countdown-h2").html(minutes + ":" + seconds)
    }

  })
  $("#minus-one").click(function(){
    if(secondsStart > 60){
      secondsStart = secondsStart - 60;
    } else {
      secondsStart === 0;
    }
    clearInterval(countDown);
    if(secondsStart > 0){
      hasStarted = 1;
      if(isPaused === 0){
        countDown = setInterval(function(){startTimer()},1000);
      } else {
        minutes = Math.floor(secondsStart/60);
        if (secondsStart - minutes * 60 > 9){
          seconds = secondsStart - minutes * 60;
        } else {
          tmp = secondsStart - minutes * 60
          seconds = "0" + tmp;
        }
        $("#countdown-h2").html(minutes + ":" + seconds)
      }
    }

  })

  $("#pause").click(function(){
    if(hasStarted ===1){
      if(isPaused === 0){
        clearInterval(countDown);
        isPaused = 1;
        $("#pause").html("unpaws");
      } else {
        clearInterval(countDown);
        countDown = setInterval(function(){startTimer()},1000);
        isPaused = 0;
        $("#pause").html("paws");
      }
    }
  })

  function startTimer(){
    secondsStart--
    minutes = Math.floor(secondsStart/60);
    if (secondsStart - minutes * 60 > 9){
      seconds = secondsStart - minutes * 60;
    } else {
      tmp = secondsStart - minutes * 60
      seconds = "0" + tmp;
    }
    $("#countdown-h2").html(minutes + ":" + seconds)
    if (secondsStart === 0){
      clearInterval(countDown);
      flip();
    }
  }


  function flip(){
    var message;
    function postMessage(){
      message = setTimeout(switchMessage(),3000);
    }
    postMessage();
    switchCenter();
    if(isWork === 1){
      secondsStart = breakCounter * 60;
      isWork = 0;
    } else {
      secondsStart = workCounter * 60;
      isWork = 1;
    }
    countDown = setInterval(function(){startTimer()},1000);
  }

  function switchMessage(){
    if(isWork === 1){
      $("#countdown-h2").html("paws!")
    } else {
      $("#countdown-h2").html("werk!")
    }
  }

  function switchCenter(){
    if(isWork === 1){
      breakOn();
    } else {
      workOn();
    }
  }
  function workOn(){
    $("#center-pic").remove();
    $("#center").prepend('<a href="http://bit.ly/2iVEk7z" target="_blank"><img id="center-pic" src="https://i.imgur.com/YzBMXJj.png"></a>')
    $("#quote").html("werk time");
  }

  function breakOn(){
    $("#quote").html("on brek");
    $("#center-pic").remove();
    $("#center").prepend('<a href="https://www.youtube.com/results?search_query=cat+videos" target="_blank"><img id="center-pic" src="https://i.imgur.com/oxs1teG.jpg"></a>')
  }


})

/*
To fix
//edge case: one or more sides is 0

Improve
//add sound!
//make pretty
//background color transitions

*/
