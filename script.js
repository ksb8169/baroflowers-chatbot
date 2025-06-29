/*
   바로플라워스 스타일 JavaScript V3
   - 예시 박스와 배송정보 박스가 서로 전환됨
   - 검색 시작하면 예시 박스 → 배송정보 박스로 변경
*/

// API 설정 (Vercel Functions 사용 - 즉시 응답)
const API_URL = '/api/chat';

// DOM 요소들 (초기화 함수에서 설정)
let addressForm, addressInput, searchButton, deliveryBox, deliveryContent;

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소들 가져오기
    addressForm = document.getElementById('addressForm');
    addressInput = document.getElementById('addressInput');
    searchButton = document.getElementById('searchButton');
    deliveryBox = document.getElementById('deliveryBox');
    deliveryContent = document.getElementById('deliveryContent');
    
    // 폼 제출 이벤트 처리
    addressForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // 페이지 새로고침 방지
        
        const address = addressInput.value.trim();
        
        // 주소가 비어있는지 확인
        if (!address) {
            alert('주소를 입력해주세요.');
            return;
        }
        
        // 배송 정보 조회 시작
        await checkDeliveryConditions(address);
    });
    
    // 초기 포커스
    addressInput.focus();
});

// 배송 조건 확인 함수
async function checkDeliveryConditions(address) {
    // 배송정보 박스 표시
    deliveryBox.style.display = 'block';
    
    // 로딩 표시
    showLoading();
    searchButton.disabled = true;
    
    try {
        // API 호출
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: address
            })
        });
        
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }
        
        const data = await response.json();
        
        // API 응답 처리
        if (data.code === '00') {
            // 성공 - 챗봇 응답을 그대로 표시
            console.log('원본 메시지:', data.message);
            console.log('메시지 길이:', data.message.length);
            console.log('첫 글자 코드:', data.message.charCodeAt(0));
            showResult(data.message);
        } else {
            // 오류 응답
            showError(data.message || '배송 정보를 확인할 수 없습니다.');
        }
        
    } catch (error) {
        console.error('API 호출 오류:', error);
        showError('서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        searchButton.disabled = false;
    }
}

// 로딩 표시
function showLoading() {
    deliveryContent.innerHTML = `
        <div class="loading-state">
            <div class="loader"></div>
            <p>주소 정보를 확인하고 있습니다...</p>
        </div>
    `;
}

/* 결과 표시 (챗봇 응답 그대로) */
function showResult(message) {
    // 메시지 앞뒤 공백 제거
    let trimmedMessage = message.trim();
    
    // 각 줄을 개별적으로 처리
    const lines = trimmedMessage.split('\n');
    const processedLines = lines.map((line, index) => {
        // 각 줄의 앞뒤 공백 제거
        let processedLine = line.trim();
        
        // 첫 번째 줄에 특별한 처리
        if (index === 0 && processedLine) {
            // 보이지 않는 문자들 제거 (zero-width space, non-breaking space 등)
            processedLine = processedLine.replace(/^[\s\u200B\u200C\u200D\uFEFF\u00A0]+/, '');
        }
        
        return processedLine;
    });
    
    // pre 태그로 모든 내용을 한 번에 처리
    const formattedMessage = processedLines.join('\n');
    
    deliveryContent.innerHTML = `
        <div class="result-message" style="margin: 0; padding: 20px; display: block;">
            <pre style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.2; margin: 0; padding: 0; white-space: pre-wrap; text-align: left;">${formattedMessage}</pre>
        </div>
    `;
}

// 에러 표시
function showError(message) {
    deliveryContent.innerHTML = `
        <div class="error-message">
            ❌ ${message}
        </div>
    `;
}

// 새로운 검색 시작 (초기 상태로 돌아감)
function resetSearch() {
    // 배송정보 박스 숨기기
    deliveryBox.style.display = 'none';
    
    // 입력창 초기화
    addressInput.value = '';
    addressInput.focus();
    
    // 배송정보 내용 초기화
    deliveryContent.innerHTML = '';
}

// 예시 태그 클릭 시 주소 설정 함수
// 태그를 클릭하면 주소가 자동으로 입력되고 검색이 실행됩니다
function setExampleAddress(address) {
    // 1. 입력창에 주소를 넣습니다
    addressInput.value = address;
    
    // 2. 입력창에 포커스를 줍니다 (사용자가 어디에 입력되었는지 알 수 있도록)
    addressInput.focus();
    
    // 3. 약간의 지연 후 자동으로 검색을 실행합니다
    setTimeout(() => {
        addressForm.dispatchEvent(new Event('submit'));
    }, 100);
}