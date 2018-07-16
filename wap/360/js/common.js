


$(function(){

/*手机自适应设置*/
    window.onload = window.onresize = window.onscroll = function () {
        fontSize();
        pageShow();
    };

    function pageShow() {
        var oBox = document.getElementsByTagName('body')[0];
        oBox.style.visibility = 'visible';

    }

    function fontSize() {
        document.documentElement.style.fontSize = 100 * (document.documentElement.clientWidth / 750) + 'px';
    }
    var sImgUrl = [
        ['images/mt360/1/1/', 'images/mt360/1/2/'],
        ['images/mt360/2/1/', 'images/mt360/2/2/'],
        ['images/mt360/3/1/', 'images/mt360/3/2/'],
        ['images/mt360/4/1/', 'images/mt360/4/2/'],
        ['images/mt360/5/1/', 'images/mt360/5/2/'],
        ['images/mt360/6/1/', 'images/mt360/6/2/'],
        ['images/mt360/7/1/', 'images/mt360/7/2/'],
        ['images/mt360/8/1/', 'images/mt360/8/2/'],
        ['images/mt360/9/1/', 'images/mt360/9/2/']
    ];
    var SCALE = 25;
    var _isLoaded = true;
    var colorReady = false;
    var aImg = [];
    // var wHeelImg = [];
    var iImgCount = 72;
    var iLoaded = 0;
    var iWheelLoaded = 0;
    var iNow = 0;
    var i = 0;


    function startImg(imgUrl, imgUrl1) {
        //加载所有资源
        loadStart();
        for (var i = 0; i < iImgCount; i++) {
            (function (i) {
                if (i <= 35) {
                    var oNewImg = new Image();
                    oNewImg.onload = function () {
                        oNewImg.onload = null;
                        var oImg = document.createElement('img');
                        oImg.src = this.src;
                        oImg.style.display = 'none';
                        oImg.title = "";
                        oImg.alt = "";
                        document.getElementById('imgTransfer').appendChild(oImg);

                        ++iLoaded;
                        aImg[i] = oImg;
                        $("#loading_img").text(parseInt((iLoaded / iImgCount) * 100) + "%");
                        if (iLoaded == iImgCount) {
                            colorReady = true;
                            _isLoaded = true;
                            onLoad();
                        }
                    };
                    oNewImg.src = imgUrl + i + '.png';
                } else {
                    var oNewImg = new Image();
                    oNewImg.onload = function () {
                        oNewImg.onload = null;
                        var oImg = document.createElement('img');
                        oImg.src = this.src;
                        oImg.style.display = 'none';
                        oImg.title = "";
                        oImg.alt = "";
                        document.getElementById('imgTransfer1').appendChild(oImg);

                        ++iLoaded;
                        aImg[i] = oImg;
                        $("#loading_img").text(parseInt((iLoaded / iImgCount) * 100) + "%");
                        if (iLoaded == iImgCount) {
                            colorReady = true;
                            _isLoaded = true;
                            onLoad();
                        }
                    };
                    oNewImg.src = imgUrl1 + (i - 36) + '.png';
                }

            })(i);
        }
    }

    function loadStart() {
        iLoaded = 0;
        iNow = 0;
        $("#loading_img").text("0" + "%");
        $("#load").text("0" + "%");
        // $('.mask_car').hide();
        $("#pageEnjoy").unbind("mousemove, mouseup, mousedown");
        $('#loading_img').show();
        $('#imgTransfer').empty();
        $('#imgTransfer1').empty();
        $('#pageEnjoy').unbind();
        _isLoaded = true;
    }

    function loadEnd() {
        $('#img1').remove();
        $('#loading_img').hide();
        iNow = 0;
    };

    //效果
    function onLoad() {
        loadEnd();
        var lastImg = null;
        var lastImg1 = null;
        var body = document.body;
        oImg = null;
        var timer = null;
        var num = iNow;
        var speed = 0;
        aImg[0].style.display = 'block';
        aImg[36].style.display = 'block';
        lastImg = aImg[0];
        lastImg1 = aImg[36];
        var page = document.getElementById('pageEnjoy');
        var startX, startY, lastX, lastY, _clicked = false;
        $(page).bind('touchstart', function (e) {
            var oEvent = e;
            if (oEvent.type == "touchstart") {
                startX = oEvent.originalEvent.targetTouches[0].pageX;
                lastX = startX;
                startY = oEvent.originalEvent.targetTouches[0].pageY;
                lastY = startY;
                SCALE = 45;
            } else {
                startX = oEvent.pageX;
                lastX = startX;
                startY = oEvent.pageY;
                lastY = startY;
            }

            stopMove();
            _clicked = true;
            e.preventDefault();
            return false;
        }).bind("mouseup touchend", function () {
            if (body.releaseCapture) body.releaseCapture();
            iNow = num;
            _clicked = false;
            startMove();
            clearInterval(timer)
        }).bind("mousemove touchmove", function (ev) {
            if (_clicked) {
                var oEvent = ev;
                if (oEvent.type == "touchmove") {
                    var i = (oEvent.originalEvent.targetTouches[0].pageX - startX) / SCALE;
                } else {
                    var i = (oEvent.pageX - startX) / SCALE;
                }
                num = (iNow + i + Math.abs(Math.floor(i / 36)) * 36) % 36;
                // num = (iNow + i + Math.abs(Math.floor(i / iImgCount)) * iImgCount) % iImgCount;
                if (lastImg != aImg[parseInt(num)]) {
                    lastImg.style.display = 'none';
                    lastImg1.style.display = 'none';
                    aImg[parseInt(num)].style.display = 'block';
                    aImg[parseInt(num + 36)].style.display = 'block';
                    lastImg = aImg[parseInt(num)];
                    lastImg1 = aImg[parseInt(num) + 36];

                }
                if (oEvent.type == "touchmove") {
                    speed = -(oEvent.originalEvent.targetTouches[0].pageX - lastX) / SCALE;
                    lastX = oEvent.originalEvent.targetTouches[0].pageX;
                    lastY = oEvent.originalEvent.targetTouches[0].pageY;
                } else {
                    speed = -(oEvent.pageX - lastX) / SCALE;
                    lastX = oEvent.pageX;
                    lastY = oEvent.pageY;
                }

                if (startY - lastY < -50) {
                    // console.log('下');
                    $('#imgTransfer').show();
                    $('#imgTransfer1').hide();
                }
                if (startY - lastY > 50) {
                    // console.log('上');
                    $('#imgTransfer1').show();
                    $('#imgTransfer').hide();
                }
                ev.preventDefault();
                return false;
            }

        }).bind('mouseenter', function () {
            // alert(1)
            _clicked = false;
        });

        function startMove() {

            timer = setInterval(function () {
                iNow = (iNow + speed + Math.abs(Math.floor(i / 36)) * 36) % 36;
                // iNow = (iNow + speed + Math.abs(Math.floor(i / iImgCount)) * iImgCount) % iImgCount;
                lastImg.style.display = 'none';
                lastImg1.style.display = 'none';
                aImg[parseInt(iNow)].style.display = 'block';
                aImg[parseInt(iNow + 36)].style.display = 'block';
                lastImg = aImg[parseInt(iNow)];
                lastImg1 = aImg[parseInt(iNow + 36)];
                speed *= 0.88;
                if (Math.abs(speed) <= 1) {
                    clearInterval(timer);
                    speed = 0;
                }
            }, 30);
        }

        function stopMove() {
            clearInterval(timer);
        }
    }
    // startImg(sImgUrl[0]);


    startImg(sImgUrl[0][0], sImgUrl[0][1]);


    $('.swiper-slide').on("click", function () {
        colorReady = false;
        document.onmousedown = null;
        var aIndex = $(this).index();
        // console.log(aIndex)
        startImg(sImgUrl[aIndex][0], sImgUrl[aIndex][1]);
        $('.swiper-slide').removeClass('imgborder');
        $(this).addClass('imgborder');

    });


    var swiper = new Swiper('.swiper-container', {
        slidesPerView : 5,
        spaceBetween : 10,
        slidesOffsetAfter : 22,
      });

    })
