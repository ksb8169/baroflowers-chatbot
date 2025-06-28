// 🔄 피그마 자동 동기화 스크립트
// 이 스크립트는 피그마의 변경사항을 실시간으로 감지하고 웹사이트에 자동 반영합니다

const API_BASE = 'http://localhost:3002';
let lastSyncTime = Date.now();
let isAutoSyncEnabled = false;

// 🎨 색상 자동 업데이트
async function autoUpdateColors() {
    try {
        const response = await fetch(`${API_BASE}/api/colors`);
        const data = await response.json();
        
        if (data.success && data.colors) {
            // CSS 변수로 변환
            const root = document.documentElement;
            
            Object.entries(data.colors).forEach(([name, color]) => {
                // 피그마 색상 이름을 CSS 변수로 변환
                const cssVarName = `--figma-${name.toLowerCase().replace(/[\/\s]+/g, '-')}`;
                
                if (color.value) {
                    root.style.setProperty(cssVarName, color.value);
                    console.log(`✅ 색상 업데이트: ${cssVarName} = ${color.value}`);
                }
            });
            
            // 바로꽃배달 브랜드 색상에 매핑
            mapToBrandColors(data.colors);
        }
    } catch (error) {
        console.error('❌ 색상 동기화 실패:', error);
    }
}

// 🎨 피그마 색상을 브랜드 색상에 매핑
function mapToBrandColors(figmaColors) {
    const root = document.documentElement;
    
    // 피그마 색상 이름과 브랜드 색상 매핑
    const colorMapping = {
        'Primary/Main': '--color-primary-main',
        'Primary/Light': '--color-primary-light',
        'Primary/Dark': '--color-primary-dark',
        'Primary/Pale': '--color-primary-pale',
        'Secondary/Green': '--color-secondary-green',
        'Secondary/Leaf': '--color-secondary-leaf',
        'Secondary/Mint': '--color-secondary-mint',
        'Gray/900': '--color-gray-900',
        'Gray/700': '--color-gray-700',
        'Gray/500': '--color-gray-500',
        'Gray/300': '--color-gray-300',
        'Gray/100': '--color-gray-100',
        'White': '--color-white',
        'System/Success': '--color-system-success',
        'System/Warning': '--color-system-warning',
        'System/Error': '--color-system-error',
        'System/Info': '--color-system-info'
    };
    
    Object.entries(colorMapping).forEach(([figmaName, cssVar]) => {
        if (figmaColors[figmaName] && figmaColors[figmaName].value) {
            root.style.setProperty(cssVar, figmaColors[figmaName].value);
        }
    });
}

// 🧩 컴포넌트 스타일 자동 업데이트
async function autoUpdateComponents() {
    try {
        const response = await fetch(`${API_BASE}/api/components`);
        const data = await response.json();
        
        if (data.success && data.components) {
            console.log(`✅ ${data.components.length}개 컴포넌트 발견`);
            
            // 각 컴포넌트의 CSS 가져오기
            for (const component of data.components) {
                await updateComponentStyle(component);
            }
        }
    } catch (error) {
        console.error('❌ 컴포넌트 동기화 실패:', error);
    }
}

// 🎯 개별 컴포넌트 스타일 업데이트
async function updateComponentStyle(component) {
    try {
        const response = await fetch(`${API_BASE}/api/component-to-css/${component.id}`);
        const data = await response.json();
        
        if (data.success && data.css) {
            // 동적 스타일 태그 생성 또는 업데이트
            let styleTag = document.getElementById(`figma-style-${component.id}`);
            
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = `figma-style-${component.id}`;
                document.head.appendChild(styleTag);
            }
            
            styleTag.textContent = data.css;
            console.log(`✅ 컴포넌트 스타일 업데이트: ${component.name}`);
        }
    } catch (error) {
        console.error(`❌ 컴포넌트 ${component.name} 스타일 업데이트 실패:`, error);
    }
}

// 🔄 자동 동기화 시작/중지
function toggleAutoSync() {
    isAutoSyncEnabled = !isAutoSyncEnabled;
    
    if (isAutoSyncEnabled) {
        console.log('🚀 피그마 자동 동기화 시작!');
        syncWithFigma(); // 즉시 한 번 실행
        
        // 5초마다 동기화
        window.figmaSyncInterval = setInterval(syncWithFigma, 5000);
    } else {
        console.log('⏹️ 피그마 자동 동기화 중지');
        clearInterval(window.figmaSyncInterval);
    }
    
    return isAutoSyncEnabled;
}

// 🎯 전체 동기화 실행
async function syncWithFigma() {
    console.log('🔄 피그마 동기화 중...');
    
    // 서버 연결 확인
    try {
        const response = await fetch(API_BASE);
        if (!response.ok) {
            console.error('❌ MCP 서버 연결 실패');
            return;
        }
    } catch (error) {
        console.error('❌ MCP 서버가 실행되지 않았습니다');
        return;
    }
    
    // 색상과 컴포넌트 동기화
    await Promise.all([
        autoUpdateColors(),
        autoUpdateComponents()
    ]);
    
    lastSyncTime = Date.now();
    console.log('✅ 동기화 완료!', new Date().toLocaleTimeString());
}

// 📱 동기화 상태 표시 UI
function createSyncStatusUI() {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'figma-sync-status';
    statusDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        border: 2px solid #FF6B9D;
        border-radius: 8px;
        padding: 12px 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        font-family: Arial, sans-serif;
        font-size: 14px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    statusDiv.innerHTML = `
        <div style="
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #DC3545;
            animation: pulse 2s infinite;
        " id="sync-indicator"></div>
        <span id="sync-text">피그마 동기화 대기</span>
        <button onclick="toggleAutoSync()" style="
            background: #FF6B9D;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
        " id="sync-button">시작</button>
    `;
    
    // 애니메이션 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(statusDiv);
}

// 🚀 초기화 및 자동 실행
window.addEventListener('DOMContentLoaded', () => {
    // 동기화 상태 UI 생성
    createSyncStatusUI();
    
    // 자동 동기화 토글 함수 업데이트
    window.toggleAutoSync = function() {
        const wasEnabled = isAutoSyncEnabled;
        toggleAutoSync();
        
        const indicator = document.getElementById('sync-indicator');
        const text = document.getElementById('sync-text');
        const button = document.getElementById('sync-button');
        
        if (!wasEnabled) {
            indicator.style.background = '#28A745';
            text.textContent = '피그마 동기화 중';
            button.textContent = '중지';
        } else {
            indicator.style.background = '#DC3545';
            text.textContent = '피그마 동기화 대기';
            button.textContent = '시작';
        }
    };
    
    console.log('🎨 피그마 자동 동기화 준비 완료!');
    console.log('💡 toggleAutoSync()를 호출하여 시작하세요');
});

// 🛠️ 개발자 도구 명령어
window.figmaSync = {
    start: () => window.toggleAutoSync(),
    stop: () => window.toggleAutoSync(),
    syncNow: syncWithFigma,
    updateColors: autoUpdateColors,
    updateComponents: autoUpdateComponents,
    status: () => ({
        enabled: isAutoSyncEnabled,
        lastSync: new Date(lastSyncTime).toLocaleTimeString(),
        serverUrl: API_BASE
    })
};

console.log('💡 피그마 동기화 명령어:');
console.log('- figmaSync.start() : 자동 동기화 시작');
console.log('- figmaSync.stop() : 자동 동기화 중지');
console.log('- figmaSync.syncNow() : 즉시 동기화');
console.log('- figmaSync.status() : 상태 확인');
