// Swiper 초기화
const swipers = document.querySelectorAll('.mySwiper');
const swiperInstances = []; // Swiper 인스턴스를 저장하는 배열
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// 각 Swiper에 대해 초기화 및 이벤트 처리
swipers.forEach((swiperElement, index) => {
    const nextButton = swiperElement.querySelector('.swiper-button-next');
    const prevButton = swiperElement.querySelector('.swiper-button-prev');
    const nextTabButton = swiperElement.querySelector('.nextTabButton'); // Swiper 별 nextTabButton
    const prevTabButton = swiperElement.querySelector('.prevTabButton'); // Swiper 별 prevTabButton

    const swiper = new Swiper(swiperElement, {
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: nextButton, prevEl: prevButton },
        simulateTouch: false, // 마우스 드래그 비활성화
        on: {
            init: function () {
                // 첫 번째 슬라이드에서만 prevTabButton을 보여주고, 그 외에는 Swiper-prev를 보여줌
                if (this.activeIndex === 0) {
                    prevTabButton.style.display = 'block';
                    prevButton.style.display = 'none';
                } else {
                    prevTabButton.style.display = 'none';
                    prevButton.style.display = 'flex';
                }
                // 슬라이드가 1개뿐일 때 nextTabButton, prevTabButton 표시
                if (this.slides.length === 1) {
                    nextTabButton.style.display = 'block';
                    nextButton.style.display = 'none'; // 다음 버튼 숨김
                    prevTabButton.style.display = 'block';
                    prevButton.style.display = 'none'; // 이전 버튼 숨김
                }
            },
            slideChange: function () {
                const currentSlide = this.activeIndex;
                const totalSlides = this.slides.length - 1;
                console.log(currentSlide);
                console.log(totalSlides);
                if (currentSlide === 0) {
                    prevTabButton.style.display = 'block';
                    prevButton.style.display = 'none'; // Swiper prev 버튼 숨김
                } else {
                    prevTabButton.style.display = 'none';
                    prevButton.style.display = 'flex'; // Swiper prev 버튼 표시
                }
            },
            slideChangeTransitionEnd: function () {
                const currentSlide = this.activeIndex;
                const totalSlides = this.slides.length - 1;
                console.log(currentSlide);
                console.log(totalSlides);
                // 마지막 슬라이드에 도달 시 nextTabButton 표시
                if (currentSlide === totalSlides) {
                    nextTabButton.style.display = 'block';
                    nextButton.style.display = 'none'; // 다음 버튼 숨김
                } else {
                    nextTabButton.style.display = 'none';
                    nextButton.style.display = 'flex'; // 다음 버튼 표시
                }
            }
        }
    });

    swiperInstances.push(swiper); // Swiper 인스턴스를 배열에 추가

    // "Next Tab" 버튼 클릭 시 다음 탭으로 이동
    nextTabButton.addEventListener('click', function () {
        const activeTab = Array.from(tabs).findIndex(tab => tab.classList.contains('active'));
        if (activeTab !== -1) {
            switchToNextTab(activeTab);
            nextTabButton.style.display = 'none'; // 버튼 숨김
        }
    });

    // "Prev Tab" 버튼 클릭 시 이전 탭으로 이동
    prevTabButton.addEventListener('click', function () {
        const activeTab = Array.from(tabs).findIndex(tab => tab.classList.contains('active'));
        if (activeTab !== -1) {
            switchToPrevTab(activeTab);
            prevTabButton.style.display = 'none'; // 버튼 숨김
        }
    });
});

// 탭 전환 시 상태 업데이트
function updateTabButtons(tabIndex) {
    console.log(tabIndex);
    const swiperInstance = swiperInstances[tabIndex];
    const nextButton = tabContents[tabIndex].querySelector('.swiper-button-next');
    const prevButton = tabContents[tabIndex].querySelector('.swiper-button-prev');
    const nextTabButton = tabContents[tabIndex].querySelector('.nextTabButton');
    const prevTabButton = tabContents[tabIndex].querySelector('.prevTabButton');
    console.log(swiperInstance.slides);
    if (swiperInstance.slides.length === 1) {
        nextTabButton.style.display = 'block'; // 슬라이드가 1개일 때 nextTabButton 보이기
        nextButton.style.display = 'none'; // 다음 버튼 숨김
        prevTabButton.style.display = 'block'; // 슬라이드가 1개일 때 prevTabButton 보이기
        prevButton.style.display = 'none'; // 이전 버튼 숨김
    } else {
        nextTabButton.style.display = 'none';
        nextButton.style.display = 'flex'; // 다음 버튼 표시
        // 첫 번째 슬라이드일 때만 prevTabButton을 보이고, 나머지에서는 Swiper prev 버튼을 보이도록 설정
        if (swiperInstance.activeIndex === 0) {
            prevTabButton.style.display = 'block';
            prevButton.style.display = 'none';
        } else {
            prevTabButton.style.display = 'none';
            prevButton.style.display = 'flex';
        }
    }
}

// 다음 탭으로 이동하는 함수
function switchToNextTab(currentIndex) {
    let nextTabIndex = currentIndex + 1;
    if (nextTabIndex >= tabs.length) {
        nextTabIndex = 0; // 마지막 탭이면 처음 탭으로 돌아감
    }
    activateTab(nextTabIndex);
}

// 이전 탭으로 이동하는 함수
function switchToPrevTab(currentIndex) {
    let prevTabIndex = currentIndex - 1;
    if (prevTabIndex < 0) {
        prevTabIndex = tabs.length - 1; // 첫 번째 탭이면 마지막 탭으로 이동
    }
    activateTab(prevTabIndex);
}

// 탭 활성화 함수
function activateTab(tabIndex) {
    tabs.forEach(item => item.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    tabs[tabIndex].classList.add('active');
    tabContents[tabIndex].classList.add('active');
    // 첫 번째 슬라이드로 이동
    swiperInstances[tabIndex].slideTo(0);
    // 버튼 상태 업데이트
    setTimeout(() => {
        updateTabButtons(tabIndex);
    }, 100);
}

// 탭 클릭 이벤트
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        activateTab(index);
    });
});

// 휠 스크롤 이벤트
const tabContainer = document.querySelector('.tabs');
tabContainer.addEventListener('wheel', (event) => {
    event.preventDefault(); // 기본 휠 동작을 막음 (Y축 스크롤 방지)
    tabContainer.scrollLeft += event.deltaY * 2; // Y축 스크롤을 X축 스크롤로 변환
});
