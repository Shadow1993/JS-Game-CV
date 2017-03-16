/*-~- JavaScript -~-*/

$(document).ready(function() {

    $(window).load(function() {
        //Preloader
        (function hidePreloader() {
            var $preloader = $('#preloader');
            $preloader.fadeOut(500);
            setTimeout(function() {
                $preloader.addClass('hidden');
            });
        }());

    });

    var $zone = $('.zone'),
        zoneState = false,
        zWidth = $zone.innerWidth(),
        cScaleAmount = 3500,
        cScale = $zone.innerWidth() / cScaleAmount,
        $char = $('.character'),
        animationCancel = '';

    function charShow() {
        cScale = $zone.innerWidth() / cScaleAmount;
        $char.css({
            'transform': 'translate(0, 0) scale(' + cScale + ')'
        });
        $char.removeClass('hidden');
        setTimeout(function() {
            $char.fadeIn();
        }, 500);
    }

    function funcAnimationCancel() {
        $char.animateSprite('stop');
    }

    function zoneShow() {
        $zone.removeClass('hidden');
        zoneState = true;
        setTimeout(function() {
            $zone.fadeIn();
        }, 500);
        setTimeout(function() {
            charShow();
        }, 1000);
    }

    function zoneHide() {
        $zone.fadeOut();
        zoneState = false;
        setTimeout(function() {
            $zone.addClass('hidden');
        }, 500);
        setTimeout(function() {
            charShow();
        }, 1000);
    }

    $(window).on('resize', function() {
        charShow();
    });

    $zone.click(function(event) {
        clearTimeout(animationCancel);
        funcAnimationCancel();

        $char.animateSprite('play', 'walkRight');
        console.log(event);
        var x = event.clientX - $zone[0].getBoundingClientRect().left - $char.width() / 2;
        console.log(x);
        var y = event.clientY - $zone[0].getBoundingClientRect().top - $char.height() / 2;

        if (x < 0) {
            x = 0;
        } else if (x > zWidth) {
            x = zWidth;
        }

        $char.css({
            'transform': 'translate(' + x + 'px, ' + y + 'px) scale(' + cScale + ')'
        });
        animationCancel = setTimeout(funcAnimationCancel, 2100);
        if (event.target.className === 'testBox') {
            window.alert('Nice! You found me!');
        }
    });

    $char.animateSprite({
        fps: 5,
        loop: true,
        animations: {
            walkLeft: [1, 2, 3, 4],
            walkRight: [9, 8, 7, 6]
        },
        autoplay: false,
        complete: function() {
            console.log('Sprite animation complete!');
        }
    });

    $('#navBtn1').on('click', function() {
        if (zoneState) {
            zoneHide();
        } else if (!zoneState) {
            zoneShow();
        }
    });

});
