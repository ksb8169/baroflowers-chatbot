// 🌺 바로꽃배달 AI 배송안내 - 스크립트 (피그마 디자인 버전)
// 이 파일은 AI 챗봇 스타일의 현대적인 UI를 구현합니다

// API 엔드포인트 설정 (Vercel Functions 사용)
const API_URL = '/api/chat';

// DOM 요소들을 미리 선택해둡니다 (성능 최적화)
const elements = {
    addressForm: null,
    addressInput: null,
    submitButton: null,
    buttonText: null,
    addressInputSection: null,
    resultSection: null,
    aiStatus: null,
    typingIndicator: null,
    resultContent: null,
    confirmedAddress: null,
    deliveryDetails: null,
    specialNotice: null
};

// DOM이 로드되면 요소들을 초기화합니다
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    setupEventListeners();
    
    // 페이지 로드시 입력창에 포커스
    if (elements.addressInput) {
        elements.addressInput.focus();
    }
});

// DOM 요소 초기화
function initializeElements() {
    elements.addressForm = document.getElementById('addressForm');
    elements.addressInput = document.getElementById('addressInput');
    elements.submitButton = document.getElementById('submitButton');
    elements.buttonText = document.getElementById('buttonText');
    elements.addressInputSection = document.getElementById('addressInputSection');
    elements.resultSection = document.getElementById('resultSection');
    elements.aiStatus = document.getElementById('aiStatus');
    elements.typingIndicator = document.getElementById('typingIndicator');
    elements.resultContent = document.getElementById('resultContent');
    elements.confirmedAddress = document.getElementById('confirmedAddress');
    elements.deliveryDetails = document.getElementById('deliveryDetails');
    elements.specialNotice = document.getElementById('specialNotice');
}

// 이벤트 리스너 설정
function setupEventListeners() {
    if (elements.addressForm) {
        elements.addressForm.addEventListener('submit', handleFormSubmit);
    }
}

// 폼 제출 처리
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const address = elements.addressInput.value.trim();
    if (!address) {
        showNotification('주소를 입력해주세요!');
        return;
    }
    
    // 버튼 상태를 로딩으로 변경
    setLoadingState(true);
    
    // 화면 전환
    switchToResultView();
    
    // AI 분석 시작
    await analyzeAddress(address);
    
    // 버튼 상태 복원
    setLoadingState(false);
}

// 로딩 상태 관리
function setLoadingState(isLoading) {
    elements.submitButton.disabled = isLoading;
    
    if (isLoading) {
        elements.buttonText.innerHTML = `
            <div class="loading">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
        `;
    } else {
        elements.buttonText.textContent = '배송정보 확인';
    }
}

// 결과 화면으로 전환
function switchToResultView() {
    elements.addressInputSection.classList.add('hidden');
    elements.resultSection.classList.remove('hidden');
    
    // AI 상태 메시지 업데이트
    elements.aiStatus.textContent = '주소를 분석하고 있어요...';
    
    // 타이핑 애니메이션 시작
    elements.typingIndicator.classList.remove('hidden');
    elements.resultContent.classList.add('hidden');
}

// 주소 분석 실행
async function analyzeAddress(address) {
    try {
        // API 호출
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: address })
        });
        
        const data = await response.json();
        
        // 타이핑 효과를 위해 1.5초 대기
        setTimeout(() => {
            displayResult(address, data);
        }, 1500);
        
    } catch (error) {
        console.error('API Error:', error);
        setTimeout(() => {
            displayError(address);
        }, 1500);
    }
}

// 결과 표시
function displayResult(address, data) {
    // AI 상태 업데이트
    elements.aiStatus.textContent = '분석 완료!';
    
    // 타이핑 애니메이션 숨기고 결과 표시
    elements.typingIndicator.classList.add('hidden');
    elements.resultContent.classList.remove('hidden');
    
    // 입력한 주소 표시
    elements.confirmedAddress.textContent = address;
    
    // API 응답에 따른 처리
    if (data.code === '00' && data.message) {
        const deliveryInfo = parseDeliveryInfo(data.message);
        displayDeliveryInfo(deliveryInfo);
    } else {
        displayError(address);
    }
}

// 배송 정보 파싱 (AI가 응답을 분석하는 것처럼 보이게)
function parseDeliveryInfo(message) {
    const info = {
        extraFee: '없음',
        restrictions: [],
        tips: [],
        rawMessage: message
    };
    
    // 추가 배송비 추출
    if (message.includes('추가 배송비') || message.includes('추가배송비')) {
        const feeMatch = message.match(/추가\s?배송비[^\d]*(\d+,?\d*원|없음)/);
        if (feeMatch) {
            info.extraFee = feeMatch[1];
        }
    }
    
    // 반입 가능 상품 추출
    if (message.includes('반입 가능') || message.includes('반입가능')) {
        const lines = message.split('\n');
        let inRestrictionSection = false;
        
        lines.forEach(line => {
            if (line.includes('반입 가능') || line.includes('반입가능')) {
                inRestrictionSection = true;
            } else if (inRestrictionSection && line.trim().startsWith('•')) {
                info.restrictions.push(line.trim().substring(1).trim());
            } else if (inRestrictionSection && line.trim().startsWith('-')) {
                info.restrictions.push(line.trim().substring(1).trim());
            }
        });
    }
    
    // 특별 안내사항 추출
    if (message.includes('대량 주문') || message.includes('협의')) {
        info.tips.push('대량 주문시 배송비 협의가 가능합니다');
    }
    
    if (message.includes('고객센터')) {
        info.tips.push('자세한 문의는 고객센터로 연락주세요');
    }
    
    return info;
}

// 배송 정보를 보기 좋게 표시
function displayDeliveryInfo(info) {
    let html = '';
    
    // 추가 배송비 섹션
    html += `
        <div class="info-item">
            <span class="icon" style="color: #FFC107;">💰</span>
            <div>
                <div class="info-label">추가 배송비</div>
                <div class="info-value">
                    ${info.extraFee === '없음' ? 
                        '<span class="badge green">추가 배송비 없음</span>' : 
                        `<span class="badge">${info.extraFee}</span>`}
                </div>
            </div>
        </div>
    `;
    
    // 반입 가능 상품 섹션
    if (info.restrictions.length > 0) {
        html += `
            <div class="info-item">
                <span class="icon" style="color: #17A2B8;">📦</span>
                <div>
                    <div class="info-label">반입 가능 상품</div>
                    <div class="info-value">
                        ${info.restrictions.map(item => `• ${item}`).join('<br>')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // 예상 배송 시간 (기본 정보)
    html += `
        <div class="info-item">
            <span class="icon" style="color: #6F42C1;">⏰</span>
            <div>
                <div class="info-label">예상 배송 시간</div>
                <div class="info-value">주문 후 1-2일 이내</div>
            </div>
        </div>
    `;
    
    // 배송 가능 시간
    html += `
        <div class="info-item">
            <span class="icon" style="color: #28A745;">🕐</span>
            <div>
                <div class="info-label">배송 가능 시간</div>
                <div class="info-value">오전 9시 ~ 오후 6시</div>
            </div>
        </div>
    `;
    
    elements.deliveryDetails.innerHTML = html;
    
    // 특별 안내사항 표시
    updateSpecialNotice(info);
}

// 특별 안내사항 업데이트
function updateSpecialNotice(info) {
    const notice = elements.specialNotice;
    
    if (info.tips.length > 0) {
        notice.innerHTML = `
            <span class="emoji">💡</span>
            <strong>꽃배달 팁:</strong> ${info.tips[0]}
        `;
        notice.classList.remove('hidden');
    } else if (info.extraFee === '없음') {
        notice.innerHTML = `
            <span class="emoji">🌸</span>
            <strong>좋은 소식!</strong> 해당 지역은 추가 배송비 없이 모든 꽃을 배송해드릴 수 있어요!
        `;
        notice.classList.remove('hidden');
    } else if (info.extraFee && info.extraFee !== '없음') {
        notice.innerHTML = `
            <span class="emoji">📍</span>
            <strong>안내:</strong> 해당 지역은 거리에 따라 추가 배송비가 발생합니다.
        `;
        notice.classList.remove('hidden');
    } else {
        notice.classList.add('hidden');
    }
}

// 에러 표시
function displayError(address) {
    elements.aiStatus.textContent = '분석 완료!';
    elements.typingIndicator.classList.add('hidden');
    elements.resultContent.classList.remove('hidden');
    elements.confirmedAddress.textContent = address;
    
    elements.deliveryDetails.innerHTML = `
        <div class="info-item">
            <span class="icon" style="color: #DC3545;">⚠️</span>
            <div>
                <div class="info-value" style="color: #DC3545;">
                    배송 정보를 가져올 수 없습니다.<br>
                    고객센터(010-2498-8515)로 문의해주세요.
                </div>
            </div>
        </div>
    `;
    
    elements.specialNotice.classList.add('hidden');
}

// 예시 주소 설정 (전역 함수로 만들어 HTML에서 호출 가능)
window.setExample = function(address) {
    elements.addressInput.value = address;
    elements.addressInput.focus();
    
    // 입력 애니메이션 효과
    elements.addressInput.style.transform = 'scale(1.02)';
    setTimeout(() => {
        elements.addressInput.style.transform = 'scale(1)';
    }, 200);
};

// 다시 검색
window.resetSearch = function() {
    // 화면 전환
    elements.addressInputSection.classList.remove('hidden');
    elements.resultSection.classList.add('hidden');
    
    // 입력 필드 초기화
    elements.addressInput.value = '';
    elements.addressInput.focus();
    
    // 결과 초기화
    elements.resultContent.classList.add('hidden');
    elements.typingIndicator.classList.remove('hidden');
};

// 알림 표시 (토스트 메시지)
function showNotification(message) {
    // 임시 알림 요소 생성
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 3초 후 제거
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 애니메이션 스타일 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translate(-50%, -100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    @keyframes slideUp {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 디버그 모드 (개발시 유용)
window.debugMode = {
    // 테스트 데이터로 결과 표시
    testResult: function(extraFee = '5,000원', hasRestrictions = true) {
        const testData = {
            code: '00',
            message: `주소: 테스트 주소\n추가 배송비 ${extraFee}\n${hasRestrictions ? '반입 가능 상품:\n• 꽃다발\n• 화분' : ''}`
        };
        
        switchToResultView();
        setTimeout(() => {
            displayResult('테스트 주소', testData);
        }, 1500);
    }
};