'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const gameApp = () => {
    const preloader = document.querySelector('.preloader');
    const fieldWrap = document.querySelector('.game__field--wrap');
    const winning  = document.querySelector('.winning');
    const themes = {
        default: {
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
    const data = {
        default: [
            'cyan',
            'red',
            'blue',
            'green',
            'indigo',
            'pink',
            'yellow',
            'purple',
            'white',
            'orange'
        ],
        dark: [
            'black',
            'white',
        ],
        name: [
            'square',
            'rectangle',
            'hexagram',
            'pentagram',
            'dodecagram'
        ],
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
    const addZero = n => n < 10 ? '0' + n : n;
    /** Hide */
    const addClass = (elem, name) => elem.classList.add(name);
    /** Show */
    const removeClass = (elem, name) => elem.classList.remove(name);

    const preloaderPage = () => {
        preloader.style.zIndex = 9999;
        setTimeout(() => removeClass(preloader, 'close'), 100);
        setTimeout(() => addClass(preloader, 'close'), 1000);
        setTimeout (() => preloader.style.zIndex = -1, 1100);
    };

    const addConfettiHtml = ({ speed, color, name }) => {
        return `
            <i style="--speed: ${speed}; --bg: ${color}" class="${name}"></i>
        `;
    };

    const getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const createConfetti = () => {
        const colorTheme = data[data.theme];
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        for ( let i = 0; i <= data.figureCount; i++ ) {
            const newData = {
                speed: getRandom(data.min, data.max),
                color: colorTheme[getRandom(0, colorTheme.length)],
                name: data.name[getRandom(0, data.name.length)]
            };

            confetti.insertAdjacentHTML('beforeend', addConfettiHtml(newData));
        }
        return confetti;
    };

    const stopTimeuotWinning = () => {
        clearTimeout(data.timeoutOpacity);
        clearTimeout(data.timeoutInnerHtml);
    };

    const winningHandler = () => {
        let fragment = new DocumentFragment();
        fragment.append(createConfetti());
        winning.append(fragment );
        data.timeoutOpacity = setTimeout(() => winning.style.opacity = 0, 7500);
        data.timeoutInnerHtml = setTimeout(() => winning.innerHTML = '', 8000);
    };

    const createTimerHtml = () => {
    return `
    <div class="game__total">
                <div class="game__total--text"><span>Время:</span></div>
    <div class="game__indicator game__timer">
        <span class="game__timer--minute" id="minute">${addZero(data.minute)}</span>
        <span>:</span>
        <span class="game__timer--second" id="second">${addZero(data.second)}</span>
        <span>:</span>
        <span class="game__timer--millisecond" id="millisecond">${addZero(data.ms)}</span>
    </div>
    </div>
    `;
};

const addTimerWrap = () => {
const wrapTimer = document.createElement('div');
wrapTimer.className = 'game__timer--wrap';

wrapTimer.insertAdjacentHTML('beforeend', createTimerHtml());
return wrapTimer;
};

    const createGameCard = (frontSideIcon, reverseSideIcon) => {
        const card = document.createElement('div');
        const frontSide = document.createElement('span');
        const reverseSide = document.createElement('span');

        card.className = 'game__card';
        frontSide.classList.add('fa', `fa-${frontSideIcon}`);
        reverseSide.classList.add('fa', `fa-${reverseSideIcon}`);

        card.append(reverseSide, frontSide);
        return card;
    };

    const shuffleArray = array => {
        let currentIndex = array.length;
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    };

    const duplicateArray = array => {
        return array.reduce((res, current) => res.concat([current, current]), []);
    };

    const createIconsArray = count => {
        const cardIcons = [
            'heart',
            'home',
            'lock',
            'star',
            'wifi',
            'bomb',
            'car',
            'cogs',
            'paperclip',
            'bolt'
        ];

        switch(count) {
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

    const resetData = () => {
        data.firstCard = null;
        data.secondCard = null;
        data.clickable = true;
    };

    /** Reset time */
    const resetTimer = () => {
        document.getElementById('minute').textContent = addZero(data.minute = 0);
        document.getElementById('second').textContent = addZero(data.second = 0);
        document.getElementById('millisecond').textContent = addZero(data.ms = 0);
    };

    const gameTimer = () => {
        const minute = document.getElementById('minute');
        const second = document.getElementById('second');
        const millisecond = document.getElementById('millisecond');

        /** Minutes */
        const clearTimer = () => {
            if (data.minute === 59 && data.second === 59 && data.ms === 99) {
                clearInterval(data.interval);
                preloaderPage();
                resetTimer();
                setTimeout(() => startGame(data.difficult), 600);
            }
        };

        /** Seconds */
        const timerSeconds = () => {
            if (data.second > 59) {
                data.minute++;
                minute.textContent = addZero(data.minute);
                data.second = 0;
                second.textContent = addZero(data.second);
            }

            clearTimer();
        };

        /** Milliseconds */
        const timerMilliseconds = () => {
        if (data.ms > 99) {
            data.second++;
            second.textContent = addZero(data.second);
            data.ms = 0;
            millisecond.textContent = addZero(data.ms);
        }

        timerSeconds();
        };

        /** Timer */
        const startTimer = () => {
            data.ms++;
            millisecond.textContent = addZero(data.ms);
            timerMilliseconds();
        };

        startTimer();
    };

    const addClassOverlay = (wrap, start) => {
        addClass(wrap, 'overlay');
        removeClass(start, 'fa-circle-pause');
        addClass(start, 'fa-circle-play');
    };

    const removeClassOverlay = (wrap, start) => {
        removeClass(wrap, 'overlay');
        removeClass(start, 'fa-circle-play');
        addClass(start, 'fa-circle-pause');
    };

    const winnerGameOver = () => {
        const gameTable = document.querySelector('.game__table');
        const cards = document.querySelectorAll('.game__card');
        const startBtn = document.querySelector('.game__start');
        const themeBtn = document.querySelector('.game__theme');
        const wrapWin = document.querySelector('.game__win');
        const gameIndicator = document.querySelector('.game__indicator');

        if (Array.from(cards).every(card => card.className.includes('flip'))) {
            setTimeout(() => {
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

    const checkEqualityCards = () => {
        const cards = document.querySelectorAll('.game__card');

        cards.forEach((card, index) => card.addEventListener('click', () => {
            if (data.clickable === true && !card.classList.contains('success')) {
                card.classList.add('flip');

                if (data.firstCard === null) {
                    data.firstCard = index;
                }

                if (index !== data.firstCard) {
                    data.secondCard = index;
                    data.clickable = false;
                }

                if (
                    data.firstCard !== null &&
                    data.secondCard !== null &&
                    data.firstCard !== data.secondCard
                ) {
                    if (cards[data.firstCard].firstElementChild.className ===
                        cards[data.secondCard].firstElementChild.className
                    ) {
                        setTimeout(() => {
                            addClass(cards[data.firstCard], 'success');
                            addClass(cards[data.secondCard], 'success');
                            resetData();
                        }, 500);
                    }
                    else {
                        setTimeout(() => {
                            removeClass(cards[data.firstCard], 'flip');
                            removeClass(cards[data.secondCard], 'flip');
                            resetData();
                        }, 500);
                    }
                }

                winnerGameOver();
            }
        }));
    };

    const createBtnsGroup = () => {
    const wrapBtns = document.createElement('div');
    const startBtn = document.createElement('button');
        const repeatBtn = document.createElement('button');
        const restartBtn = document.createElement('button');
        const themeBtn = document.createElement('button');

wrapBtns.className = 'game__btns--wrap';
        startBtn.classList.add('game__btn', 'game__start', 'fa', 'fa-circle-play');
        repeatBtn.classList.add('game__btn', 'game__replay', 'fa', 'fa-repeat');
restartBtn.classList.add('game__btn', 'game__restart', 'fa', 'fa-power-off');
        themeBtn.classList.add('game__btn', 'game__theme', 'fa', 'fa-palette', data.theme);

wrapBtns.append(startBtn, repeatBtn, restartBtn, themeBtn);
return wrapBtns;
};

    const setTheme = name => {
        const selectedThemObj = themes[name];
        Object.entries(selectedThemObj).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    };

    const clearSetMethods = () => {
        stopTimeuotWinning();
        clearInterval(data.interval);
        resetTimer();
    };

    const eventHandlerBtns = () => {
        const startBtn = document.querySelector('.game__start');
        const repeatBtn = document.querySelector('.game__replay');
        const restartBtn = document.querySelector('.game__restart');
        const themeBtn = document.querySelector('.game__theme');

startBtn.addEventListener('click', () => {
            const gameTable = document.querySelector('.game__table');
            if (!!gameTable.classList.contains('overlay')) {
                removeClassOverlay(gameTable, startBtn);
                data.interval = setInterval(gameTimer, 10);
            }
            else {
                addClassOverlay(gameTable, startBtn);
                clearInterval(data.interval);
            }
});

        repeatBtn.addEventListener('click', () => {
            preloaderPage();
            clearSetMethods();
            setTimeout(() => startGame(data.difficult), 600);
        });

        restartBtn.addEventListener('click', () => {
            preloaderPage();
            clearSetMethods();
            setTimeout(() => createGameMenu(), 600);
        });

        themeBtn.addEventListener('click', () => {
            if (!!themeBtn.classList.contains('default')) {
                data.theme = 'dark';
                addClass(themeBtn, 'dark');
                removeClass(themeBtn, 'default');
                setTheme(data.theme);
            }
            else {
                data.theme = 'default';
                addClass(themeBtn, 'default');
                removeClass(themeBtn, 'dark');
                setTheme(data.theme);
            }
        });
    };

    const resetVariables = () => {
        fieldWrap.innerHTML = '';
        winning.innerHTML = '';
        winning.style.opacity = 1;
    };

    const startGame = difficult => {
        const fieldTable = document.createElement('div');
        const wrapWin = document.createElement('div');
        const textWin = document.createElement('p');

        resetVariables();
        data.difficult = difficult;
        textWin.textContent = 'Победа в игре';
        fieldTable.classList.add('game__table', 'overlay');
        wrapWin.className = 'game__win';
        textWin.className = 'game__win--text';
        wrapWin.append(textWin);
        fieldTable.append(wrapWin);

        const iconsArr = createIconsArray(difficult);
        const duplicateArr = duplicateArray(iconsArr);
        const shuffleArr = shuffleArray(duplicateArr);

        shuffleArr.forEach(icon => fieldTable.append(createGameCard('file-circle-question', icon)));
        fieldWrap.append(
        addTimerWrap(),
    fieldTable,
    createBtnsGroup()
);

        checkEqualityCards();
        eventHandlerBtns();
    };

    const createGameMenu = () => {
        const title = document.createElement('h2');
        title.textContent = 'Выбор сложности';
        title.className = 'game__field--title';

        resetVariables();

        const createDifficultBtn = difficult => {
            const btn = document.createElement('button');
            btn.className = 'game__field--btn';
            btn.textContent = `${difficult} Карт`;
            btn.addEventListener('click', () => {
                preloaderPage();
                setTimeout(() => startGame(difficult), 600);
            });
            return btn;
        };

        fieldWrap.append(
            title,
            createDifficultBtn(8),
            createDifficultBtn(12),
            createDifficultBtn(16),
            createDifficultBtn(20)
        );
    };

    const beginGame = () => {
        setTimeout(() => addClass(preloader, 'close'), 1000);
        setTimeout(() => preloader.style.zIndex = -1, 1100);
        createGameMenu();
    };

    beginGame();
};
gameApp();
});
