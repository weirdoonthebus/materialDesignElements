(function($){
  $(".paper").on("click",function(){
  var w=$(this).width(),x=event.clientX,y=event.clientY;
    $(".ink").remove();
    $(this).append("<span class='ink'></span>");
    $(".ink").css({"top":"0"+y+"px","left":"0"+x+"px"});
    setTimeout(function(){
      $(".ink").css({"top":"0"+y-w*1.5-48+"px","left":"0"+x-w*1.5-48+"px","width":"0"+w*3+"px","height":"0"+w*3+"px","opacity":"1","transition-duration":"1s"});
    },1);
    $(this).css({"box-shadow": "0 0 3em rgba(0,0,0,0.1)"});
    setTimeout(function(){
      $(".paper").css({"box-shadow": "0 0 3em rgba(0,0,0,0.3)"});
      $(".ink").css({"opacity":"0","transition-duration":"0.5s"});
    },2000);
  });
})(jQuery)
