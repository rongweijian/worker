/**
 * Created with JetBrains PhpStorm.
 * User: stecov
 * Date: 26/03/13
 * Time: 15:09
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {

    /* Define here the website's release date */
    var RELEASEDATE = new Date('10/01/2013 10:01 PM');
		//var RELEASEDATE = new Date('07/17/2013 11:43 AM');
    /* setbodyHeight */
    var setbodyHeight = function(){
       $('body').css('height',$(window).height()-32);
    };

    /* setCountdown */
    var setCountdown = function($countdown){

        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var timer;

        var twoDigits =  function(n){
            return n < 10 ? '0'+n : n;
        };

        var showRemaining = function(){
            var now = new Date();
            var distance = RELEASEDATE - now;
            if (distance < 0) {
                clearInterval(timer);
                //$('#countdown').innerHTML = 'EXPIRED!';
                //$countdown.html('&nbsp;00:00:00:00:00');
                $countdown.html('&nbsp;&nbsp;2013-7-17 02:58 PM');
                $("#logo_c").hide();
                $("#logo_a").show();
                return;
            }
            var days = twoDigits(Math.floor(distance / _day));
            var hours = twoDigits(Math.floor((distance % _day) / _hour));
            var minutes = twoDigits(Math.floor((distance % _hour) / _minute));
            var seconds = twoDigits(Math.floor((distance % _minute) / _second));
            var milliseconds = twoDigits(Math.floor(Math.random()*100));

            $countdown.html('-' + days + ':' + hours + ':' + minutes + ':' + seconds + ':' + milliseconds);
        };

        timer = setInterval(showRemaining, 100);
    };

    /* checkEmailField */
    var checkEmailField = function($input){
        $('#form-ajax-error').html('');

        var regexpEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+((\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)?)+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/i;
        var data = $input.val();
        var $error = $input.parents('form').find('.form-error');

        if (regexpEmail.test(data)){
            $input.add($error).removeClass('error');
            return true;
        }else{
            $input.add($error).addClass('error');
            return false;
        }
    };

    /* checkForm */
    var checkForm = function(){
        var $form = $('#form-register');
        var $email = $('#form-register-email');

        // clean error on focus
        $email.on('focus',function(){
            $(this).parents('form').find('.error').removeClass('error');
        });

        // submit form
        $form.on('submit', function(){
            var validation  = checkEmailField($email);

            if (!validation){
                return false;
            }else{
                $.ajax({
                    url: $(this).attr('action'),
                    type: $(this).attr('method'),
                    data: $(this).serialize(),
                    dataType: 'json',
                    success: function(json) {
                        if (json.code === 'ok'){
                            $form.html('<p class="confirmation">'+json.message+'</p>');
                            _gaq.push(['_trackEvent', 'Coming Soon', 'Inscription Coming Soon']);
                        }else{
                            $('#form-register-email').addClass('error');
                            $('#form-ajax-error').html(json.message).addClass('error');
                        }
                    },
                    error: function(json){
                        $('#form-ajax-error').html('something went wrong !').addClass('error');
                    }
                });
            }
            return false;
        });
    };

    /* CALL FUNCTIONS */
    setbodyHeight();
    window.onresize = function() {
        setbodyHeight();
    }
    setCountdown($('#countdown'));
    $('input').placeholder();
    checkForm();
});