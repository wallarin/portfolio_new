// 초기 로딩 표시 제어 이벤트 추가
window.addEventListener("load", function () {
    document.getElementById("loading").style.display = "none";

    const mainContent = document.querySelector('.main-content-1');
    const elements = mainContent.querySelectorAll('h1, p'); // h1과 p 모두 선택

    // 0.5초 지연 후 애니메이션 클래스 추가
    setTimeout(() => {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
                
                // 마지막 요소 애니메이션이 끝나면 클래스 변경
                if (index === elements.length - 1) {
                    el.addEventListener('animationend', () => {
                        mainContent.classList.remove('main-content-1');
                        mainContent.classList.add('main-content');
                        // 애니메이션을 비활성화하기 위해 'animated' 클래스 제거
                        elements.forEach((el) => {
                            el.classList.remove('animated');
                        });
                    });
                }
            }, index * 300); // 각 요소마다 지연 시간 추가
        });
    }, 300);
});

// 이메일 클릭 시 텍스트 복사 이벤트 추가
document.getElementById('email').addEventListener('click', function() {
    const emailText = this.innerText;

    // 클립보드에 텍스트 복사 이벤트 설정
    navigator.clipboard.writeText(emailText).then(function() {
        // 복사 후 2초 후 사라지는 알림 메시지 설정
        const notification = document.getElementById('copy-notification');
        notification.style.visibility = 'visible';

        setTimeout(function() {
            notification.style.visibility = 'hidden';
        }, 2000);
    }).catch(function(err) {
        console.log('복사 실패:', err);
    });
});

// 첫 번째 섹션으로 이동 스크롤 이벤트 추가
document.getElementById('scrollToTop').addEventListener('click', function() {
    const firstSection = document.querySelector('.section-1');
    firstSection.scrollIntoView({
        behavior: 'smooth'
    });
});

var swiper = new Swiper('.swiper-container', {
    loop: true, // 무한 루프
    allowTouchMove: false,
    autoplay: {
        delay: 5000, // 5초마다 자동으로 배경 전환
    },
    effect: 'fade', // 페이드 효과를 적용해 부드러운 전환
});