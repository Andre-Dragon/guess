'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
document.addEventListener('DOMContentLoaded', function () {
  var gameApp = function gameApp() {
    var preloader = document.querySelector('.preloader');
    var fieldWrap = document.querySelector('.game__field--wrap');
    var winning = document.querySelector('.winning');
    var themes = {
      "default": {
        '--default-color': '#faffaf',
        '--preloader-color': '#ce4100',
        '--button-bg': '#ce4100',
        '--button-hover-bg': '#861500',
        '--button-hover-color': '#faffaf',
        '--button-color': '#faffaf',
        '--disabled-bg': '#505050',
        '--card-bg': '#ce4100',
        '--card-color': '#faffaf',
        '--card-flip-bg': '#861500',
        '--card-flip-color': '#faffaf',
        '--card-winner-bg': '#003939',
        '--box-winner-bg': '#ce4100e6'
      },
      dark: {
        '--default-color': '#faffaf',
        '--preloader-color': '#faffaf',
        '--button-bg': 'transparent',
        '--button-hover-bg': '#faffaf',
        '--button-color': '#faffaf',
        '--button-hover-color': '#161e2c',
        '--disabled-bg': '#505050',
        '--card-bg': 'transparent',
        '--card-color': '#faffaf',
        '--card-flip-bg': '#faffaf',
        '--card-flip-color': '#161e2c',
        '--card-winner-bg': '#505050',
        '--box-winner-bg': '#000000e6'
      }
    };
    var data = {
      "default": ['cyan', 'red', 'blue', 'green', 'indigo', 'pink', 'yellow', 'purple', 'white', 'orange'],
      dark: ['black', 'white'],
      name: ['square', 'rectangle', 'hexagram', 'pentagram', 'dodecagram'],
      min: 15,
      max: 45,
      figureCount: 40,
      theme: 'default',
      firstCard: null,
      secondCard: null,
      clickable: true,
      difficult: null,
      interval: null,
      minute: 0,
      second: 0,
      ms: 0,
      timeoutOpacity: null,
      timeoutInnerHtml: null
    };

    /** Zero */
    var addZero = function addZero(n) {
      return n < 10 ? '0' + n : n;
    };
    /** Hide */
    var addClass = function addClass(elem, name) {
      return elem.classList.add(name);
    };
    /** Show */
    var removeClass = function removeClass(elem, name) {
      return elem.classList.remove(name);
    };
    var preloaderPage = function preloaderPage() {
      preloader.style.zIndex = 9999;
      setTimeout(function () {
        return removeClass(preloader, 'close');
      }, 100);
      setTimeout(function () {
        return addClass(preloader, 'close');
      }, 1000);
      setTimeout(function () {
        return preloader.style.zIndex = -1;
      }, 1100);
    };
    var addConfettiHtml = function addConfettiHtml(_ref) {
      var speed = _ref.speed,
        color = _ref.color,
        name = _ref.name;
      return "\n            <i style=\"--speed: ".concat(speed, "; --bg: ").concat(color, "\" class=\"").concat(name, "\"></i>\n        ");
    };
    var getRandom = function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    };
    var createConfetti = function createConfetti() {
      var colorTheme = data[data.theme];
      var confetti = document.createElement('div');
      confetti.className = 'confetti';
      for (var i = 0; i <= data.figureCount; i++) {
        var newData = {
          speed: getRandom(data.min, data.max),
          color: colorTheme[getRandom(0, colorTheme.length)],
          name: data.name[getRandom(0, data.name.length)]
        };
        confetti.insertAdjacentHTML('beforeend', addConfettiHtml(newData));
      }
      return confetti;
    };
    var stopTimeuotWinning = function stopTimeuotWinning() {
      clearTimeout(data.timeoutOpacity);
      clearTimeout(data.timeoutInnerHtml);
    };
    var winningHandler = function winningHandler() {
      var fragment = new DocumentFragment();
      fragment.append(createConfetti());
      winning.append(fragment);
      data.timeoutOpacity = setTimeout(function () {
        return winning.style.opacity = 0;
      }, 7500);
      data.timeoutInnerHtml = setTimeout(function () {
        return winning.innerHTML = '';
      }, 8000);
    };
    var createTimerHtml = function createTimerHtml() {
      return "\n    <div class=\"game__total\">\n                <div class=\"game__total--text\"><span>\u0412\u0440\u0435\u043C\u044F:</span></div>\n    <div class=\"game__indicator game__timer\">\n        <span class=\"game__timer--minute\" id=\"minute\">".concat(addZero(data.minute), "</span>\n        <span>:</span>\n        <span class=\"game__timer--second\" id=\"second\">").concat(addZero(data.second), "</span>\n        <span>:</span>\n        <span class=\"game__timer--millisecond\" id=\"millisecond\">").concat(addZero(data.ms), "</span>\n    </div>\n    </div>\n    ");
    };
    var addTimerWrap = function addTimerWrap() {
      var wrapTimer = document.createElement('div');
      wrapTimer.className = 'game__timer--wrap';
      wrapTimer.insertAdjacentHTML('beforeend', createTimerHtml());
      return wrapTimer;
    };
    var createGameCard = function createGameCard(frontSideIcon, reverseSideIcon) {
      var card = document.createElement('div');
      var frontSide = document.createElement('span');
      var reverseSide = document.createElement('span');
      card.className = 'game__card';
      frontSide.classList.add('fa', "fa-".concat(frontSideIcon));
      reverseSide.classList.add('fa', "fa-".concat(reverseSideIcon));
      card.append(reverseSide, frontSide);
      return card;
    };
    var shuffleArray = function shuffleArray(array) {
      var currentIndex = array.length;
      var randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        var _ref2 = [array[randomIndex], array[currentIndex]];
        array[currentIndex] = _ref2[0];
        array[randomIndex] = _ref2[1];
      }
      return array;
    };
    var duplicateArray = function duplicateArray(array) {
      return array.reduce(function (res, current) {
        return res.concat([current, current]);
      }, []);
    };
    var createIconsArray = function createIconsArray(count) {
      var cardIcons = ['heart', 'home', 'lock', 'star', 'wifi', 'bomb', 'car', 'cogs', 'paperclip', 'bolt'];
      switch (count) {
        case 8:
          return cardIcons.slice(0, 4);
        case 12:
          return cardIcons.slice(0, 6);
        case 16:
          return cardIcons.slice(0, 8);
        case 20:
          return cardIcons;
        default:
          break;
      }
    };
    var resetData = function resetData() {
      data.firstCard = null;
      data.secondCard = null;
      data.clickable = true;
    };

    /** Reset time */
    var resetTimer = function resetTimer() {
      document.getElementById('minute').textContent = addZero(data.minute = 0);
      document.getElementById('second').textContent = addZero(data.second = 0);
      document.getElementById('millisecond').textContent = addZero(data.ms = 0);
    };
    var gameTimer = function gameTimer() {
      var minute = document.getElementById('minute');
      var second = document.getElementById('second');
      var millisecond = document.getElementById('millisecond');

      /** Minutes */
      var clearTimer = function clearTimer() {
        if (data.minute === 59 && data.second === 59 && data.ms === 99) {
          clearInterval(data.interval);
          preloaderPage();
          resetTimer();
          setTimeout(function () {
            return startGame(data.difficult);
          }, 600);
        }
      };

      /** Seconds */
      var timerSeconds = function timerSeconds() {
        if (data.second > 59) {
          data.minute++;
          minute.textContent = addZero(data.minute);
          data.second = 0;
          second.textContent = addZero(data.second);
        }
        clearTimer();
      };

      /** Milliseconds */
      var timerMilliseconds = function timerMilliseconds() {
        if (data.ms > 99) {
          data.second++;
          second.textContent = addZero(data.second);
          data.ms = 0;
          millisecond.textContent = addZero(data.ms);
        }
        timerSeconds();
      };

      /** Timer */
      var startTimer = function startTimer() {
        data.ms++;
        millisecond.textContent = addZero(data.ms);
        timerMilliseconds();
      };
      startTimer();
    };
    var addClassOverlay = function addClassOverlay(wrap, start) {
      addClass(wrap, 'overlay');
      removeClass(start, 'fa-circle-pause');
      addClass(start, 'fa-circle-play');
    };
    var removeClassOverlay = function removeClassOverlay(wrap, start) {
      removeClass(wrap, 'overlay');
      removeClass(start, 'fa-circle-play');
      addClass(start, 'fa-circle-pause');
    };
    var winnerGameOver = function winnerGameOver() {
      var gameTable = document.querySelector('.game__table');
      var cards = document.querySelectorAll('.game__card');
      var startBtn = document.querySelector('.game__start');
      var themeBtn = document.querySelector('.game__theme');
      var wrapWin = document.querySelector('.game__win');
      var gameIndicator = document.querySelector('.game__indicator');
      if (Array.from(cards).every(function (card) {
        return card.className.includes('flip');
      })) {
        setTimeout(function () {
          startBtn.disabled = true;
          themeBtn.disabled = true;
          addClass(wrapWin, 'open');
          addClass(startBtn, 'disabled');
          addClass(themeBtn, 'disabled');
          addClassOverlay(gameTable, startBtn);
          addClass(gameIndicator, 'animate-opacity');
        }, 500);
        clearInterval(data.interval);
        wrapWin.style.zIndex = 15;
        winningHandler();
      }
    };
    var checkEqualityCards = function checkEqualityCards() {
      var cards = document.querySelectorAll('.game__card');
      cards.forEach(function (card, index) {
        return card.addEventListener('click', function () {
          if (data.clickable === true && !card.classList.contains('success')) {
            card.classList.add('flip');
            if (data.firstCard === null) {
              data.firstCard = index;
            }
            if (index !== data.firstCard) {
              data.secondCard = index;
              data.clickable = false;
            }
            if (data.firstCard !== null && data.secondCard !== null && data.firstCard !== data.secondCard) {
              if (cards[data.firstCard].firstElementChild.className === cards[data.secondCard].firstElementChild.className) {
                setTimeout(function () {
                  addClass(cards[data.firstCard], 'success');
                  addClass(cards[data.secondCard], 'success');
                  resetData();
                }, 500);
              } else {
                setTimeout(function () {
                  removeClass(cards[data.firstCard], 'flip');
                  removeClass(cards[data.secondCard], 'flip');
                  resetData();
                }, 500);
              }
            }
            winnerGameOver();
          }
        });
      });
    };
    var createBtnsGroup = function createBtnsGroup() {
      var wrapBtns = document.createElement('div');
      var startBtn = document.createElement('button');
      var repeatBtn = document.createElement('button');
      var restartBtn = document.createElement('button');
      var themeBtn = document.createElement('button');
      wrapBtns.className = 'game__btns--wrap';
      startBtn.classList.add('game__btn', 'game__start', 'fa', 'fa-circle-play');
      repeatBtn.classList.add('game__btn', 'game__replay', 'fa', 'fa-repeat');
      restartBtn.classList.add('game__btn', 'game__restart', 'fa', 'fa-power-off');
      themeBtn.classList.add('game__btn', 'game__theme', 'fa', 'fa-palette', data.theme);
      wrapBtns.append(startBtn, repeatBtn, restartBtn, themeBtn);
      return wrapBtns;
    };
    var setTheme = function setTheme(name) {
      var selectedThemObj = themes[name];
      Object.entries(selectedThemObj).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        document.documentElement.style.setProperty(key, value);
      });
    };
    var clearSetMethods = function clearSetMethods() {
      stopTimeuotWinning();
      clearInterval(data.interval);
      resetTimer();
    };
    var eventHandlerBtns = function eventHandlerBtns() {
      var startBtn = document.querySelector('.game__start');
      var repeatBtn = document.querySelector('.game__replay');
      var restartBtn = document.querySelector('.game__restart');
      var themeBtn = document.querySelector('.game__theme');
      startBtn.addEventListener('click', function () {
        var gameTable = document.querySelector('.game__table');
        if (!!gameTable.classList.contains('overlay')) {
          removeClassOverlay(gameTable, startBtn);
          data.interval = setInterval(gameTimer, 10);
        } else {
          addClassOverlay(gameTable, startBtn);
          clearInterval(data.interval);
        }
      });
      repeatBtn.addEventListener('click', function () {
        preloaderPage();
        clearSetMethods();
        setTimeout(function () {
          return startGame(data.difficult);
        }, 600);
      });
      restartBtn.addEventListener('click', function () {
        preloaderPage();
        clearSetMethods();
        setTimeout(function () {
          return createGameMenu();
        }, 600);
      });
      themeBtn.addEventListener('click', function () {
        if (!!themeBtn.classList.contains('default')) {
          data.theme = 'dark';
          addClass(themeBtn, 'dark');
          removeClass(themeBtn, 'default');
          setTheme(data.theme);
        } else {
          data.theme = 'default';
          addClass(themeBtn, 'default');
          removeClass(themeBtn, 'dark');
          setTheme(data.theme);
        }
      });
    };
    var resetVariables = function resetVariables() {
      fieldWrap.innerHTML = '';
      winning.innerHTML = '';
      winning.style.opacity = 1;
    };
    var startGame = function startGame(difficult) {
      var fieldTable = document.createElement('div');
      var wrapWin = document.createElement('div');
      var textWin = document.createElement('p');
      resetVariables();
      data.difficult = difficult;
      textWin.textContent = 'Победа в игре';
      fieldTable.classList.add('game__table', 'overlay');
      wrapWin.className = 'game__win';
      textWin.className = 'game__win--text';
      wrapWin.append(textWin);
      fieldTable.append(wrapWin);
      var iconsArr = createIconsArray(difficult);
      var duplicateArr = duplicateArray(iconsArr);
      var shuffleArr = shuffleArray(duplicateArr);
      shuffleArr.forEach(function (icon) {
        return fieldTable.append(createGameCard('file-circle-question', icon));
      });
      fieldWrap.append(addTimerWrap(), fieldTable, createBtnsGroup());
      checkEqualityCards();
      eventHandlerBtns();
    };
    var createGameMenu = function createGameMenu() {
      var title = document.createElement('h2');
      title.textContent = 'Выбор сложности';
      title.className = 'game__field--title';
      resetVariables();
      var createDifficultBtn = function createDifficultBtn(difficult) {
        var btn = document.createElement('button');
        btn.className = 'game__field--btn';
        btn.textContent = "".concat(difficult, " \u041A\u0430\u0440\u0442");
        btn.addEventListener('click', function () {
          preloaderPage();
          setTimeout(function () {
            return startGame(difficult);
          }, 600);
        });
        return btn;
      };
      fieldWrap.append(title, createDifficultBtn(8), createDifficultBtn(12), createDifficultBtn(16), createDifficultBtn(20));
    };
    var beginGame = function beginGame() {
      setTimeout(function () {
        return addClass(preloader, 'close');
      }, 1000);
      setTimeout(function () {
        return preloader.style.zIndex = -1;
      }, 1100);
      createGameMenu();
    };
    beginGame();
  };
  gameApp();
});