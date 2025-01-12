// 로딩 스피너 GIF의 URL
const spinnerGifUrl = "https://i.ibb.co/411d9Y9/spinner.gif";

// 기존 스피너를 GIF로 교체하는 함수
function replaceSpinners() {
    // 모든 스피너 요소 선택
    const spinners = document.querySelectorAll(
        'span.spinner, div.spinner, span.loading, div.loading, span.loader, div.loader, ' +
        'span.loading-spinner, div.loading-spinner, span.loading-indicator, div.loading-indicator, ' +
        'span.spinner-border, div.spinner-border, span.spinner-grow, div.spinner-grow, ' +
        'span.is-loading, div.is-loading, span.ajax-loader, div.ajax-loader, ' +
        'span.waiting, div.waiting, span.progress, div.progress, ' + // 추가된 항목
        'span.fetching, div.fetching, span.fetching-data, div.fetching-data, ' + // 추가된 항목
        'span.data-loading, div.data-loading, span.loading-icon, div.loading-icon, ' + // 추가된 항목
        'span.loading-overlay, div.loading-overlay, span.loading-wrapper, div.loading-wrapper' // 추가된 항목
    );

    spinners.forEach(spinner => {
        // 스피너 GIF 로드
        fetch(spinnerGifUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 오류 : GIF 이미지 로드실패');
                }
                return response.blob();
            })
            .then(blob => {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(blob);
                img.alt = '로딩 중...';

                // 스피너의 컨테이너 크기 가져오기
                const containerWidth = spinner.clientWidth;
                const containerHeight = spinner.clientHeight;
                const spinnerSize = Math.min(containerWidth, containerHeight) * 0.1; // 스피너 크기조정

                // 최소 크기 설정
                const minSize = 100; // 최소 크기 100px
                const finalSize = Math.max(spinnerSize, minSize); // 계산된 크기와 최소 크기 중 더 큰 것 선택(?)

                // 스피너 크기 설정
                img.style.width = `${finalSize}px`;
                img.style.height = `${finalSize}px`;
                img.style.objectFit = 'contain'; // 비율 유지

                // 스피너 중앙 정렬
                img.style.position = 'absolute';
                img.style.top = '50%';
                img.style.left = '50%';
                img.style.transform = 'translate(-50%, -50%)';
                img.style.margin = '0';
                img.style.display = 'block';

                // 스피너가 여전히 존재하는지 확인한 후 교체
                if (spinner.parentNode) {
                    spinner.parentNode.replaceChild(img, spinner);
                }
            })
            .catch(error => {
                console.error('GIF 로드 중 오류 발생:', error);
            });
    });

    console.log(`GIF로 교체된 스피너 수: ${spinners.length}`);
}

// 페이지 로드 시 스피너 교체
window.addEventListener('load', replaceSpinners);

// 동적으로 추가된 스피너를 교체하기 위해 MutationObserver 사용
const observer = new MutationObserver(replaceSpinners);
observer.observe(document.body, { childList: true, subtree: true });