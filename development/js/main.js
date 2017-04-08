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

    var containers = {
            $notify: $('#notification'),
            $intro: $('#introduction'),
            $info: $('#information'),
            $zone: $('#zone'),
            $contact: $('#contact')
        },
        states = {
            notify: false,
            intro: true,
            zone: false,
            info: false,
            contact: false
        },
        gameSize = {
            width: containers.$zone.innerWidth(),
            scale: 3500
        },
        game = {
            $char: $('#character'),
            charScale: gameSize.width / gameSize.scale,
            x: 5
        },
        navControl = {
            $nav1: $('#navBtn1'),
            $nav2: $('#navBtn2'),
            $nav3: $('#navBtn3'),
            $nav4: $('#navBtn4')
        },
        animationCancel = '';

    function charShow() {
        gameSize.width = containers.$zone.innerWidth();
        game.charScale = gameSize.width / gameSize.scale;
        game.$char.css({
            'transform': 'translate(0, 0) scale(' + game.charScale + ')'
        });
        game.$char.removeClass('hidden');
        setTimeout(function() {
            game.$char.fadeIn();
        }, 500);
    }

    function funcAnimationCancel() {
        game.$char.animateSprite('stop');
    }

    function containersHide() {
        for (var i in containers) {
            containers[i].fadeOut();
        }
        for (var j in states) {
            states[j] = false;
        }
    }

    function zoneShow() {
        containersHide();
        states.zone = true;
        containers.$zone.fadeIn();
        charShow();
    }

    function infoShow() {
        containersHide();
        states.info = true;
        containers.$info.fadeIn();
    }

    function introShow() {
        containersHide();
        states.intro = true;
        containers.$intro.fadeIn();
    }

    function contactShow() {
        containersHide();
        states.contact = true;
        containers.$contact.fadeIn();
    }

    function viewPortResponsive() {
        var viewPortW = $(window).width(),
            viewPortH = $(window).height();
        // if (viewPortH < 480) {
        //     $('#navBtn1').html('<i class="fa fa-eye" aria-hidden="true"></i>');
        //     $('#navBtn2').html('<i class="fa fa-user-circle-o" aria-hidden="true"></i>');
        // } else
        if (680 < viewPortW && 735 < viewPortH) {
            navControl.$nav2.html('<i class="fa fa-eye" aria-hidden="true"></i></i> Scavenge Info');
            navControl.$nav3.html('<i class="fa fa-user-circle-o" aria-hidden="true"></i> Scavenged Info');
        } else if (640 < viewPortW < 680 && viewPortH < 735) {
            navControl.$nav2.html('<i class="fa fa-eye" aria-hidden="true"></i></i> Find');
            navControl.$nav3.html('<i class="fa fa-user-circle-o" aria-hidden="true"></i> Info');
        }
    }

    viewPortResponsive();
    $(window).on('resize', function() {
        charShow();
        viewPortResponsive();
    });

    containers.$zone.click(function(event) {
        clearTimeout(animationCancel);
        funcAnimationCancel();

        if (event.clientX < game.x) {
            game.$char.animateSprite('play', 'walkLeft');
        } else {
            game.$char.animateSprite('play', 'walkRight');
        }
        // console.log(event);
        // console.log(event.clientX);
        // console.log(game.x);
        var x = event.clientX - containers.$zone[0].getBoundingClientRect().left - game.$char.width() / 2;
        var y = event.clientY - containers.$zone[0].getBoundingClientRect().top - game.$char.height() / 2;
        game.x = event.clientX;

        if (x < 0) {
            x = 0;
        } else if (x > gameSize.width) {
            x = gameSize.width;
        }

        game.$char.css({
            'transform': 'translate(' + x + 'px, ' + y + 'px) scale(' + game.charScale + ')'
        });
        animationCancel = setTimeout(funcAnimationCancel, 2100);
        if (event.target.className === 'info') {
            setTimeout(function() {
                containers.$notify.html('Nice! You found information!').fadeIn();
                setTimeout(function() {
                    containers.$notify.fadeOut();
                }, 3000);
            }, 2000);
            $('#' + event.target.id).fadeOut(1);
            $('#information span.hidden').first().removeClass('hidden');
        }
    });

    game.$char.animateSprite({
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

    navControl.$nav1.on('click', function() {
        if (states.intro) {
            // containersHide();
        } else if (!states.intro) {
            introShow();
        }
    });
    navControl.$nav2.on('click', function() {
        if (states.zone) {
            // containersHide();
        } else if (!states.zone) {
            zoneShow();
        }
    });
    navControl.$nav3.on('click', function() {
        if (states.info) {
            // containersHide();
        } else if (!states.info) {
            infoShow();
        }
    });
    navControl.$nav4.on('click', function() {
        if (states.contact) {
            // containersHide();
        } else if (!states.contact) {
            contactShow();
        }
    });

    $('#submit').on('click', function() {
        var iName = $('#name').val(),
            iEmail = $('#email').val(),
            iMsg = $('#msg').val();

        $.ajax({
            url: '/contact',
            type: 'post',
            data: {
                name: iName,
                email: iEmail,
                msg: iMsg
            },
            complete: function(xhr, status) {
                var msg =
                'Your message has been recieved <em><b>' + xhr.responseJSON.name + '</b></em>! Enjoy your day :)';
                // console.log(status);
                console.log(xhr);
                if (status === 'success') {
                    $('#name').val('');
                    $('#email').val('');
                    $('#msg').val('');
                    containers.$notify.html(msg).fadeIn();
                    setTimeout(function() {
                        containers.$notify.fadeOut();
                    }, 3000);
                }
            }
        });
    });
    $('.cheat').on('click', function() {
        $('.hidden').toggleClass('hidden');
        $(this).addClass('hidden');
    });
});
