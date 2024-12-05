function toggleFullscreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
      document.exitFullscreen();
  }
} 
 
 // 버튼과 비행기 이미지 가져오기
  const startButton = document.getElementById("게임시작");
  const moveButton = document.getElementById("버튼");
  const airplane = document.getElementById("비행기");
  
  // 상대적 좌표 (0~1 범위로 정의)
  const relativePositions = [
    { x: 0.254, y: 0.55 }, // 첫 번째 좌표
    { x: 0.45, y: 0.55 }, // 두 번째 좌표
    { x: 0.665, y: 0.55 }  // 세 번째 좌표
  ];
  
  // 현재 위치 인덱스와 이동 방향 (1: 순방향, -1: 역방향)
  let currentIndex = 0;
  let direction = 1;
  let gameStarted = false; // 게임 시작 여부
  
  // 창 크기에 따른 절대 좌표 계산 함수
  function calculatePositions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return relativePositions.map(pos => ({
      x: pos.x * width,
      y: pos.y * height
    }));
  }
  
  // 초기화
  let positions = calculatePositions();
  
  // 창 크기 변경 시 좌표 업데이트
  window.addEventListener("resize", () => {
    positions = calculatePositions();
    if (gameStarted) {
      const currentPosition = positions[currentIndex];
      airplane.style.left = `${currentPosition.x}px`;
      airplane.style.top = `${currentPosition.y}px`;
    }
  });
  
  // 게임 시작 버튼 클릭 이벤트
  startButton.addEventListener("click", () => {
    if (!gameStarted) {
      gameStarted = true;
      alert("게임 시작!");
      currentIndex = 1; // 두 번째 좌표로 설정
      airplane.style.left = `${positions[currentIndex].x}px`;
      airplane.style.top = `${positions[currentIndex].y}px`;
      startMissiles(); // 미사일 생성 시작
    }
  });
  
  let score = 0; // 점수 초기화
  let intervalId; // setInterval ID를 저장하기 위한 변수

  const scoreElement = document.getElementById('score');
  

  // 게임 시작 버튼 클릭 이벤트
  startButton.addEventListener('click', () => {
      // 중복 실행 방지: 기존 타이머가 있으면 멈춤
      if (intervalId) {
          clearInterval(intervalId);
      }

      // 1초마다 점수 증가
      intervalId = setInterval(() => {
          score++;
          scoreElement.textContent = `점수: ${score}`;
      }, 1000);

      // 버튼 비활성화 (한 번만 클릭 가능하게 설정, 필요에 따라 제거 가능)
      startButton.disabled = true;
  });





  // 게임시작 버튼 클릭 시 해당 버튼 숨기기
  document.getElementById('게임시작').addEventListener('click', function() {
    document.getElementById('게임시작').style.display = 'none'; // 버튼 숨기기
  });
  
  // 비행기 이동 버튼 클릭 이벤트
  moveButton.addEventListener("click", () => {
    if (!gameStarted) {
      alert("게임을 먼저 시작하세요!");
      return;
    }
  
    // 다음 좌표로 이동
    const nextPosition = positions[currentIndex];
    airplane.style.left = `${nextPosition.x}px`;
    airplane.style.top = `${nextPosition.y}px`;
  
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
  
  // 충돌 감지 함수
  function checkCollision(airplane, missile) {
    const airplaneRect = airplane.getBoundingClientRect();
    const missileRect = missile.getBoundingClientRect();
  
    return !(
      airplaneRect.bottom < missileRect.top ||
      airplaneRect.top > missileRect.bottom ||
      airplaneRect.right < missileRect.left ||
      airplaneRect.left > missileRect.right
    );
  }
  
  // 게임오버 처리 함수
  function gameOver() {
    alert("게임 오버!");
    window.location.reload(); // 페이지 새로고침으로 게임 초기화
  }
  
  // 미사일 생성 및 움직임
  function startMissiles() {
    setInterval(() => {
      createMissile();
    }, 500); // 0.5초마다 새로운 미사일 생성
  }
  
  function createMissile() {
    const missile = document.createElement("img");
    missile.src = "l.png"; // 미사일 이미지 경로
    missile.style.position = "absolute";
    missile.style.width = "25px"; // 미사일 크기
    missile.style.left = `${Math.random() * window.innerWidth}px`;
    missile.style.top = "0px"; // 화면 위에서 시작
    document.body.appendChild(missile);
  
    // 미사일 움직임
    let missileInterval = setInterval(() => {
      const currentTop = parseInt(missile.style.top) || 0;
      if (currentTop > window.innerHeight) {
        clearInterval(missileInterval); // 화면 아래로 벗어나면 제거
        document.body.removeChild(missile);
      } else {
        missile.style.top = `${currentTop + 45}px`; // 미사일 아래로 이동
  
        // 충돌 확인
        if (checkCollision(airplane, missile)) {
          clearInterval(missileInterval); // 충돌 시 미사일 움직임 멈춤
          gameOver(); // 게임오버 호출
        }
      }
    }, 50); // 50ms 간격으로 이동
  }
