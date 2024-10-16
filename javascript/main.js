// 초기 로딩 표시 제어 이벤트 추가
window.addEventListener("load", function () {
    document.getElementById("loading").style.display = "none";
});

// 이메일 클릭 시 텍스트 복사 이벤트 추가
document.getElementById('email').addEventListener('click', function() {
    const emailText = this.innerText;

    // 클립보드에 텍스트 복사 이벤트 설정
    navigator.clipboard.writeText(emailText).then(function() {
        // 복사 후 2초 후 사라지는 알림 메시지 설정
        const notification = document.getElementById('copy-notification');
        notification.style.display = 'block';

        setTimeout(function() {
            notification.style.display = 'none';
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

