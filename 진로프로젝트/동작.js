// 버튼과 비행기 이미지 가져오기
const startButton = document.getElementById("게임시작");
const moveButton = document.getElementById("버튼");
const airplane = document.getElementById("비행기");

// 지정된 좌표 (x, y) 배열
const positions = [
  { x: 329, y: 365 }, // 첫 번째 좌표
  { x: 603, y: 365 }, // 두 번째 좌표
  { x: 865, y: 365 }  // 세 번째 좌표
];

// 현재 위치 인덱스와 이동 방향 (1: 순방향, -1: 역방향)
let currentIndex = 0;
let direction = 1;
let gameStarted = false; // 게임 시작 여부

// 게임 시작 버튼 클릭 이벤트
startButton.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    alert("게임 시작!");
    currentIndex = 1; // 두 번째 좌표로 설정
    airplane.style.left = `${positions[currentIndex].x}px`; // 템플릿 리터럴로 수정
    airplane.style.top = `${positions[currentIndex].y}px`;  // 템플릿 리터럴로 수정
  }
});

// 게임시작 버튼 클릭 시 해당 버튼 숨기기
document.getElementById('게임시작').addEventListener('click', function() {
  document.getElementById('게임시작').style.display = 'none';  // 버튼 숨기기
});

// 비행기 이동 버튼 클릭 이벤트
moveButton.addEventListener("click", () => {
  if (!gameStarted) {
    alert("게임을 먼저 시작하세요!");
    return;
  }

  // 다음 좌표로 이동
  const nextPosition = positions[currentIndex];
  airplane.style.left = `${nextPosition.x}px`;  // 템플릿 리터럴로 수정
  airplane.style.top = `${nextPosition.y}px`;   // 템플릿 리터럴로 수정

  // 인덱스 업데이트
  if (direction === 1) {
    currentIndex++;
    if (currentIndex === positions.length - 1) {
      direction = -1; // 끝에 도달하면 역방향으로 전환
    }
  } else {
    currentIndex--;
    if (currentIndex === 0) {
      direction = 1; // 처음에 도달하면 순방향으로 전환
    }
  }
});
