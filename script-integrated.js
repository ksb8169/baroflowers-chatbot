/**
 * 바로꽃배달 배송정보 안내 - 통합형 스크립트
 * 네피리티 API와 연동하여 배송 조건을 안내하는 기능
 */

// ================================
// 전역 변수 및 설정
// ================================

// API 엔드포인트 설정 (Vercel Functions 사용)
const API_ENDPOINT = '/api/chat';

// DOM 요소들을 저장할 객체
const elements = {};

// ================================
// 초기화 함수
// ================================

/**
 * 페이지 로드시 실행되는 초기화 함수
 * DOM 요소를 찾고 이벤트 리스너를 설정합니다
 */
document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 캐싱 (자주 사용하는 요소들을 미리 찾아둡니다)
    elements.form = document.getElementById('addressForm');
    elements.input = document.getElementById('addressInput');
    elements.searchBtn = document.getElementById('searchBtn');
    elements.exampleTags = document.querySelectorAll('.example-tag');
    elements.sections = {
        input: document.getElementById('addressInputSection'),
        loading: document.getElementById('loadingSection'),
        result: document.getElementById('resultSection'),
        error: document.getElementById('errorSection')
    };
    elements.resetBtn = document.getElementById('resetBtn');
    elements.retryBtn = document.getElementById('retryBtn');
    
    // 이벤트 리스너 설정
    setupEventListeners();
    
    // 초기 상태 설정
    showSection('input');
});

// ================================
// 이벤트 리스너 설정
// ================================

/**
 * 모든 이벤트 리스너를 설정하는 함수
 */
function setupEventListeners() {
    // 폼 제출 이벤트 (주소 검색)
    elements.form.addEventListener('submit', handleFormSubmit);
    
    // 예시 태그 클릭 이벤트
    elements.exampleTags.forEach(tag => {
        tag.addEventListener('click', handleExampleClick);
    });
    
    // 다시 조회 버튼
    elements.resetBtn.addEventListener('click', handleReset);
    
    // 에러시 재시도 버튼
    elements.retryBtn.addEventListener('click', handleReset);
    
    // 입력 필드 엔터키 처리
    elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            elements.form.dispatchEvent(new Event('submit'));
        }
    });
}

// ================================
// 이벤트 핸들러 함수들
// ================================

/**
 * 폼 제출 처리 함수
 * @param {Event} e - 폼 제출 이벤트
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // 입력값 가져오기 및 검증
    const address = elements.input.value.trim();
    if (!address) {
        showError('주소를 입력해주세요.');
        return;
    }
    
    // 배송정보 조회 시작
    await searchDeliveryInfo(address);
}

/**
 * 예시 태그 클릭 처리 함수
 * @param {Event} e - 클릭 이벤트
 */
function handleExampleClick(e) {
    e.preventDefault();
    const address = e.target.getAttribute('data-address');
    elements.input.value = address;
    
    // 자동으로 검색 실행
    elements.form.dispatchEvent(new Event('submit'));
}

/**
 * 초기화 처리 함수
 * 처음 상태로 돌아갑니다
 */
function handleReset() {
    elements.input.value = '';
    showSection('input');
    elements.input.focus();
}

// ================================
// API 통신 함수
// ================================

/**
 * 네피리티 API를 호출하여 배송정보를 조회하는 함수
 * @param {string} address - 조회할 주소
 */
async function searchDeliveryInfo(address) {
    // 로딩 상태 표시
    showSection('loading');
    
    try {
        // API 호출
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                question: address 
            })
        });
        
        // 응답 처리
        const data = await response.json();
        
        // 응답 코드 확인
        if (data.code === '00') {
            // 성공: 결과 표시
            displayResult(address, data.message);
        } else {
            // 실패: 에러 메시지 표시
            showError(data.message || '배송정보를 조회할 수 없습니다.');
        }
        
    } catch (error) {
        // 네트워크 에러 등 예외 처리
        console.error('API 호출 중 오류:', error);
        showError('서버와의 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
}

// ================================
// 결과 표시 함수
// ================================

/**
 * API 응답을 파싱하여 화면에 표시하는 함수
 * @param {string} address - 입력한 주소
 * @param {string} message - API 응답 메시지
 */
function displayResult(address, message) {
    // 주소 표시
    document.getElementById('confirmedAddress').textContent = address;
    
    // 메시지 파싱
    const parsedInfo = parseDeliveryMessage(message);
    
    // 조건별 표시
    if (parsedInfo.hasConditions) {
        // 추가 배송비가 있는 경우
        if (parsedInfo.extraFee) {
            document.getElementById('extraFeeText').textContent = parsedInfo.extraFee;
            document.getElementById('extraFeeSection').style.display = 'block';
        } else {
            document.getElementById('extraFeeSection').style.display = 'none';
        }
        
        // 반입 제한이 있는 경우
        if (parsedInfo.restrictions && parsedInfo.restrictions.length > 0) {
            const restrictionList = document.getElementById('restrictionList');
            restrictionList.innerHTML = '';
            
            parsedInfo.restrictions.forEach(restriction => {
                const li = document.createElement('li');
                li.textContent = restriction;
                restrictionList.appendChild(li);
            });
            
            document.getElementById('restrictionSection').style.display = 'block';
        } else {
            document.getElementById('restrictionSection').style.display = 'none';
        }
        
        // 조건 없음 섹션 숨기기
        document.getElementById('noConditionsSection').style.display = 'none';
        
    } else {
        // 특별한 조건이 없는 경우
        document.getElementById('extraFeeSection').style.display = 'none';
        document.getElementById('restrictionSection').style.display = 'none';
        document.getElementById('noConditionsSection').style.display = 'block';
    }
    
    // 결과 섹션 표시
    showSection('result');
}

/**
 * API 메시지를 파싱하여 구조화된 데이터로 변환하는 함수
 * @param {string} message - API 응답 메시지
 * @returns {Object} 파싱된 배송정보 객체
 */
function parseDeliveryMessage(message) {
    const info = {
        hasConditions: false,
        extraFee: null,
        restrictions: []
    };
    
    // 메시지를 줄 단위로 분리
    const lines = message.split('\n').map(line => line.trim()).filter(line => line);
    
    // 각 줄을 분석
    lines.forEach(line => {
        // 추가 배송비 체크
        if (line.includes('추가 배송비') || line.includes('추가배송비')) {
            if (line.includes('없음') || line.includes('무료')) {
                info.extraFee = '추가 배송비 없음';
            } else {
                // 금액 추출 (예: "추가 배송비 5,000원")
                const feeMatch = line.match(/[\d,]+원/);
                if (feeMatch) {
                    info.extraFee = `추가 배송비 ${feeMatch[0]}`;
                    info.hasConditions = true;
                } else {
                    // 금액이 명시되지 않은 경우
                    info.extraFee = line;
                    info.hasConditions = true;
                }
            }
        }
        
        // 반입 가능 상품 체크
        if (line.includes('반입') || line.includes('가능') || line.includes('상품')) {
            // 특정 상품만 가능한 경우를 찾기
            if (line.includes('근조') || line.includes('축하') || line.includes('화환') || 
                line.includes('꽃바구니') || line.includes('관엽') || line.includes('동양란')) {
                info.restrictions.push(line);
                info.hasConditions = true;
            }
        }
    });
    
    // 조건이 없다고 명시된 경우
    if (message.includes('조건 없음') || message.includes('모든 상품 배송 가능')) {
        info.hasConditions = false;
    }
    
    return info;
}

// ================================
// UI 제어 함수
// ================================

/**
 * 특정 섹션만 표시하고 나머지는 숨기는 함수
 * @param {string} sectionName - 표시할 섹션 이름
 */
function showSection(sectionName) {
    // 모든 섹션 숨기기
    Object.values(elements.sections).forEach(section => {
        section.style.display = 'none';
    });
    
    // 선택한 섹션만 표시
    if (elements.sections[sectionName]) {
        elements.sections[sectionName].style.display = 'block';
    }
}

/**
 * 에러 메시지를 표시하는 함수
 * @param {string} message - 표시할 에러 메시지
 */
function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    showSection('error');
}

// ================================
// 유틸리티 함수
// ================================

/**
 * 디바운스 함수 - 연속적인 호출을 제한합니다
 * @param {Function} func - 실행할 함수
 * @param {number} wait - 대기 시간(밀리초)
 * @returns {Function} 디바운스된 함수
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ================================
// 개발자 도구 (디버깅용)
// ================================

// 개발 환경에서만 작동하는 디버그 함수
if (window.location.hostname === 'localhost') {
    window.debugAPI = {
        testAddress: (address) => searchDeliveryInfo(address),
        showSection: (name) => showSection(name),
        parseMessage: (msg) => console.log(parseDeliveryMessage(msg))
    };
    console.log('디버그 모드 활성화됨. window.debugAPI를 사용하세요.');
}