"use strict";$(document).ready(function(){$(".arrow-left").hover(function(){$(".arrow-left img").attr("src","./assets/arrow-blue-left.png")},function(){$(".arrow-left img").attr("src","./assets/arrow-gray-left.png")}),$(".arrow-right").hover(function(){$(".arrow-right img").attr("src","./assets/arrow-blue-right.png")},function(){$(".arrow-right img").attr("src","./assets/arrow-gray-right.png")}),$(".arrow-left").on("click",function(){let t=$(".top-counter img"),r=$(".bottom-counter img");t.animate({left:t.last().width()+10}),r.animate({left:r.last().width()+10}),setTimeout(()=>{t.last().insertBefore(t.first()),t.css({left:0}),r.last().insertBefore(r.first()),r.css({left:0})},500)}),$(".arrow-right").on("click",function(){let t=$(".top-counter img"),r=$(".bottom-counter img");t.css({left:t.first().width()+10}),t.first().insertAfter(t.last()),t.animate({left:0}),r.css({left:r.first().width()+10}),r.first().insertAfter(r.last()),r.animate({left:0})})});
