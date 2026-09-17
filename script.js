const WORK_TIME = 25 * 60; // 25분
const BREAK_TIME = 5 * 60; // 5분

let timeLeft = WORK_TIME;
let timerId = null;
let isWorkMode = true;

// DOM 요소 가져오기
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workBtn = document.getElementById('work-btn');
const breakBtn = document.getElementById('break-btn');

// 시간 화면 업데이트 함수
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

// 타이머 시작 함수
function startTimer() {
    if (timerId !== null) return; 
    
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            timerId = null;
            
            setTimeout(() => {
                alert(isWorkMode ? "집중 시간이 끝났습니다! 휴식을 취하세요." : "휴식이 끝났습니다! 다시 집중해볼까요?");
                setMode(!isWorkMode); 
            }, 50);
        }
    }, 1000);
}

// 타이머 일시정지 함수
function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

// 타이머 초기화 함수
function resetTimer() {
    pauseTimer();
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateDisplay();
}

// 모드(집중/휴식) 변경 함수
function setMode(workMode) {
    isWorkMode = workMode;
    pauseTimer();
    
    if (isWorkMode) {
        timeLeft = WORK_TIME;
        workBtn.classList.add('active');
        breakBtn.classList.remove('active');
        document.body.classList.remove('break-mode');
    } else {
        timeLeft = BREAK_TIME;
        breakBtn.classList.add('active');
        workBtn.classList.remove('active');
        document.body.classList.add('break-mode');
    }
    
    updateDisplay();
}

// 이벤트 리스너(버튼 클릭 동작) 연결
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

workBtn.addEventListener('click', () => setMode(true));
breakBtn.addEventListener('click', () => setMode(false));

// 브라우저가 열릴 때 초기 화면 설정
updateDisplay();