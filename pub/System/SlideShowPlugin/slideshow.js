(function($){function switchSlide(incr){var hash=window.location.hash,slideNumber,slide,lastSlide=$(".slideShowLastSlide"),maxSlideNumber=parseInt(lastSlide.attr("id").replace(/GoSlide/,""),10);if(hash.match(/^#GoSlide\d+$/)){if(incr===Number.MAX_VALUE){slide=lastSlide;hash="#GoSlide"+maxSlideNumber}else if(incr===0){hash="#GoSlide1";slide=$("div"+hash)}else{slideNumber=parseInt(hash.replace(/^#GoSlide/,"","g"),10);if(isNaN(slideNumber)){slideNumber=0}slideNumber+=incr;if(slideNumber<1){slideNumber=1}if(slideNumber>maxSlideNumber){slideNumber=maxSlideNumber}hash="#GoSlide"+slideNumber;slide=$("div"+hash)}}else{slide=$(".slideShowFirstSlide")}$(".slideShowPane").removeClass("slideShowCurrentSlide");slide.addClass("slideShowCurrentSlide");window.location.hash=hash}$(function(){switchSlide(0);$(document).on("keydown",function(ev){switch(ev.keyCode){case 27:window.location.href=window.location.href.replace(/\?.*$/,"");return false;case 33:switchSlide(-10);return false;case 34:switchSlide(10);return false;case 35:switchSlide(Number.MAX_VALUE);return false;case 36:switchSlide(0);return false;case 37:switchSlide(-1);return false;case 32:case 39:switchSlide(1);return false;case 38:$(".slideShowCurrentSlide").scrollTo("-=21px",0,{axis:"y"});return false;case 40:$(".slideShowCurrentSlide").scrollTo("+=21px",0,{axis:"y"});return false;default:break}});$(".slideShowFirst").on("click",function(){switchSlide(0);return false});$(".slideShowLast").on("click",function(){switchSlide(Number.MAX_VALUE);return false});$(".slideShowNext").on("click",function(){switchSlide(1);return false});$(".slideShowPrev").on("click",function(){switchSlide(-1);return false})})})(jQuery);