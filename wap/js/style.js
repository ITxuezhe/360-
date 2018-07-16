$(function () {
  
    window.onload = function () {
        /*720代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少;100代表换算比例，这里写100是
          为了以后好算,比如，你测量的一个宽度是100px,就可以写为1rem,以及1px=0.01rem等等*/
        getRem(750, 100)
    };
    window.onresize = function () {
        getRem(750, 100)
    };

    function getRem(pwidth, prem) {
        var html = document.getElementsByTagName("html")[0];
        var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
        html.style.fontSize = oWidth / pwidth * prem + "px";
    }

    // 视屏
    // $('.fenm').on('click', function () {
    //     var video = document.getElementById("videoBoxList");
    //     $(this).hide();
    //     video.style.opacity = '1';
    //     video.style.width = "100%";
    //     video.style.height = "4.7rem";
    //     video.play();
    //     video.onpause = function () {
    //         video.style.opacity = '0';
    //         video.style.width = "0px";
    //         video.style.height = "0px";
    //         $('.fenm').show();
    //     }
    // })


    // 轮播热点
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,
        pagination: {
            el: '.swiper-pagination',
        },
        on: {
            slideChangeTransitionStart: function () {
                //   console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                
                  if (this.activeIndex == 0) {
                    $('.txt-p').removeClass('txt-dh');
                    $('.txt-p').eq(0).addClass('txt-dh');
                }  
                if (this.activeIndex == 1) {
                    $('.txt-p').removeClass('txt-dh');
                    $('.txt-p').eq(1).addClass('txt-dh');
                }
                if (this.activeIndex == 2) {
                    $('.txt-p').removeClass('txt-dh');
                    $('.txt-p').eq(2).addClass('txt-dh');
                }
                if (this.activeIndex == 3) {
                    $('.txt-p').removeClass('txt-dh');
                    $('.txt-p').eq(3).addClass('txt-dh');
                }
                if (this.activeIndex == 4) {
                    $('.txt-p').removeClass('txt-dh');
                    $('.txt-p').eq(4).addClass('txt-dh');
                }
                if (this.activeIndex == 5) {
                    $('.txt-p').removeClass('txt-dh');
                    $('.txt-p').eq(5).addClass('txt-dh');
                }
            },
        },
    })

        

    $(window).scroll(function () {
        var h_num = $(window).scrollTop();
        var h = $('.spbox').offset().top;
        if($(window).scrollTop() >= $('.spbox').offset().top-300 && $(window).scrollTop() <=$('.gcbox').offset().top){
            $('.p1').addClass('pd');
            $('.p2').addClass('pdh');
            $('.p3').addClass('pdx');
        }else{
            $('.p1').removeClass('pd');
            $('.p2').removeClass('pdh');
            $('.p3').removeClass('pdx');
        }    

        if(h_num >= $('.maidbox').offset().top){
            $(".back").show();
        }else{
            $(".back").hide();
        }
        
    });
})