
$(document).ready(function () {
  function resetSettings(boardSize, ballSize, eBoardSize, velocity) {
    aver = (+$('#velocity').attr('max') + +$('#velocity').attr('min')) / 2
    choices = choices.map(a => +a + +velocity - +aver)
    oldchoices = [...choices]
    $('.board').css('height', $('.board').height() / aver * boardSize)
    $('.square').css({ 'height': $('.square').height() / aver * ballSize, 'width': $('.square').width() / aver * ballSize })
    $('.enemy').css('height', $('.enemy').height() / aver * eBoardSize)

  }
  $('.settings i').click(function () {
    $('.settings').toggleClass('show')
  })

  $('.btnRestart').click(function () {
    arr = [];
    [...$(this).siblings('input')].forEach((a) => {
      arr.push(a.value)
    })
    resetSettings(arr[0], arr[1], arr[2], arr[3])
  })

  function main() {
    choices = [4, 5, 6]
    oldchoices = [...choices]
    minscore = platerscore = computerscore = squareTop = squareLeft = x = 0
    additionY = choices[1]
    additionX = choices[2]
    stop = start = false
    turn = true
    $('.square').css({ top: Math.floor(Math.random() * 18) * 20, left: $('.square').height() * 2 })
    setInterval(firstPlayer, 1000 / 60)
    setInterval(secondPlayer, 1000 / 60)
  }
  main()
  function firstPlayer() {
    if (stop || !start) return
    squareTop = $('.square').position().top + additionY
    squareLeft = $('.square').position().left + additionX
    if (squareTop > ($('.box').height() - 20) || squareTop <= 0) {
      additionY = -additionY
    }
    if (squareLeft > ($('.box').width() - 20) || squareLeft <= 0) {
      additionX = -additionX
    }

    $('.square').css({ top: squareTop, left: squareLeft })
    if (squareLeft <= 0 && !turn) {
      turn = true
      x = $('.board').position().top
      if (x > squareTop || x + $('.board').height() < squareTop) {
        computerscore++
        writescore()
        reset()
      } else {
        if (minscore == 5) {
          update()
        }
        minscore++
        y = squareTop - $('.board').position().top
        if (y > $('.board').height() * 3 / 4 || y < $('.board').height() / 4) {
          additionX = choices[2] + 3
        } else {
          additionX = choices[1]
        }
      }
    }
  }

  function secondPlayer() {
    if (stop || !start) return
    if ($('.square').position().left >= $('.box').width() - $('.square').width()) {

      if (($('.enemy').position().top - $('.square').height() > squareTop || $('.enemy').position().top + $('.enemy').height() < squareTop) && turn) {
        turn = false
        platerscore++
        writescore()
        $('.box').css("background-color", "green")
        setTimeout(() => {
          $('.box').css("background-color", "black")
        }, 500)
        return
      }
      turn = false
    }


    if ($('.enemy').position().top + $('.enemy').height() / 2 < $('.square').position().top) {
      $('.enemy').css({ top: $('.enemy').position().top + 4, right: 0 })
    } else if ($('.enemy').position().top + $('.enemy').height() / 2 > $('.square').position().top) {
      $('.enemy').css({ top: $('.enemy').position().top - 4, right: 0 })
    }
  }
  $(document).mousemove(function (e) {
    if (stop || !start) return
    if (e.pageY < $('.box').offset().top) {
      $('.board').css({ top: 0, left: 0 })
      return
    } else if (e.pageY + $('.board').height() > $('.box').offset().top + $('.box').height()) {
      $('.board').css({ top: $('.box').height() - $('.board').height(), left: 0 })
      return
    }
    x = e.pageY - $('.box').position().top
    $('.board').css({ top: x, left: 0 })
  })
  function reset() {
    minscore = 0
    choices = oldchoices
    additionX = choices[1]
    $('.box').css("background-color", "red")
    setTimeout(() => {
      $('.box').css("background-color", "black")
    }, 500)
  }
  $('button').mouseenter(function () {
    if (stop == true) {
      setTimeout(() => {
        $('.box').css('background', 'blue')
      }, 100)
      setTimeout(() => {
        $('.box').css('background', 'black')
      }, 200)
      setTimeout(() => {
        $('.box').css('background', 'blue')
      }, 300)
      setTimeout(() => {
        $('.box').css('background', 'black')
      }, 400)
      setTimeout(() => {
        $('.box').css('background', 'blue')
      }, 500)
      setTimeout(() => {
        $('.box').css('background', 'black')
        stop = !stop
      }, 600)
      return
    }
    stop = !stop
  })
  $('span').click(function () {
    setTimeout(() => {
      start = true
    }, 1000)
    $(this).parent().remove()
  })
  function update() {
    additionX++
    additionY++
    choices = choices.map(a => ++a)
    minscore = 0
  }
  function writescore() {
    $('.left').text(platerscore)
    $('.right').text(computerscore)
  }
});