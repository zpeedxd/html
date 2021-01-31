$(document).ready(() => {
document.querySelector(".header--toggle")
            .addEventListener("click", function () {
                this.classList.toggle("active");
                if ($(this).hasClass("active")) {
                    $(".wrapper--header").animate({
                        height: "430px"
                    });
                    $(".wrapper--hiddenText").fadeIn();
                } else {
                    $(".wrapper--header").animate({
                        height: "130px"
                    });
                    $(".wrapper--hiddenText").fadeOut();
                }
            });
})

function fadeInOut (el, time = 2000 , cb) {
  $(el).fadeIn(time, () => {
    $(el).fadeOut(time, cb)
  })
}

function adBlockNotDetected () {
  if (page == 'index') {
    if (skip_intro == '1') {
      $('.p1').finish()
      $('.p2').finish()
      $('.p3').finish()
      $('.button2').finish()
      $('#main #wrapper_main').animate({top: '15%'}, 1000)
      $('.wrapper--header').fadeIn(1000, () => {
        $('.button2').css('display', 'inline-block')
        $('.button2').fadeIn(1000);
	$('.button_').fadeIn(1000)
      })
    } else {
      fadeInOut('.p1', 2000, () => {
        fadeInOut('.p2', 2000, () => {
          fadeInOut('.p3', 2000, () => {
            $('.skip_intro').fadeOut(500)
            $('#main #wrapper_main').animate({top: '15%'}, 1000)
            $('.button2').fadeIn(1000).css('display', 'inline-block')
            $('.wrapper--header').fadeIn(1000, () => {
	      $('.button_').fadeIn(1000)
            })
          })
        })
      })
    }
  } else if (page == 'account') {
    $('.wrapper--header').fadeIn(0)
    $('#main #wrapper_main').animate({top: '0%'}, 0)
    seconds =
      20 * 60 - $('.timer').html().replace('Get a new account in ', '') / -1
    $('.timer').html(
      'Get a new account in ' + secondsTimeSpanToHMS(seconds)
    )
    setInterval(function () {
      minutes = $('.timer').html().replace('Get a new account in ', '')
      seconds = hmsToSecondsOnly('' + minutes) - 1
      if (
        seconds <= 0 ||
        seconds.toString().toLowerCase().indexOf('nan') >= 0
      ) {
        $('.timer').html('Get a new account')
        $('.timer').attr('style', 'cursor:pointer !important')
        $('.timer').on('click', function () {
          location.reload()
        })
      } else {
        $('.timer').html(
          'Get a new account in ' + secondsTimeSpanToHMS(seconds)
        )
      }
    }, 1000)
  } else if (page == 'loading') {
    $('.wrapper--header').fadeIn(0)
    $('#main #wrapper_main').animate({top: '0%'}, 0)
    seconds = 1 * 60
    $('.redirect').html('Please wait ' + secondsTimeSpanToHMS(seconds))
    setInterval(function () {
      minutes = $('.redirect').html().replace('Please wait ', '')
      seconds = hmsToSecondsOnly('' + minutes) - 1
      if (
        seconds <= 0 ||
        seconds.toString().toLowerCase().indexOf('nan') >= 0
      ) {
        $('.redirect').html('Continue')
        $('.redirect').attr('style', 'cursor: pointer !important')
        $('.redirect').on('click', function () {
          location.href = 'https://mc-premium.org/account'
        })
      } else {
        $('.redirect').html('Please wait ' + secondsTimeSpanToHMS(seconds))
      }
    }, 1000)
  } else if (page == 'tos') {
    $('.wrapper--header').fadeIn(0)
  }
}
function adBlockDetected () {
  $('#noadblock').fadeIn(0)
  $('#main').fadeOut(0)
  $('#main').html('')
}

$(window).load(function () {
  console.log('DOM loaded')
  if (typeof fuckAdBlock === 'undefined') {
    adBlockDetected()
  } else {
    fuckAdBlock.onDetected(adBlockDetected)
    fuckAdBlock.onNotDetected(adBlockNotDetected)
  }
})

$(document).scroll(function () {})

function secondsTimeSpanToHMS (s) {
  var h = Math.floor(s / 3600) // Get whole hours
  s -= h * 3600
  var m = Math.floor(s / 60) // Get remaining minutes
  s -= m * 60
  return h + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) // zero padding on minutes and seconds
}

function hmsToSecondsOnly (minutes) {
  var p = minutes.split(':'), s = 0, m = 1
  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10)
    m *= 60
  }
  return s
}
