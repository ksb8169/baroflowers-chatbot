## 🧹 프로젝트 정리 및 피그마 디자인 적용 가이드

### 1. 정리 작업 실행
```bash
# 1. cleanup.bat 실행하여 불필요한 파일 백업
cleanup.bat

# 2. 핵심 파일만 남은 상태 확인
dir /b
```

### 2. 피그마 디자인 적용

#### A. style.css 교체
```bash
# 기존 style.css 백업
copy style.css style-backup-original.css

# 새로운 스타일 적용
copy style-clean.css style.css
```

#### B. HTML 수정 (수동)
index.html에서 예시 박스 부분을 다음과 같이 수정:

```html
<!-- 예시 박스 (초기 표시) -->
<div id="exampleBox" class="example-box">
    <h3>💡 예시 주소를 클릭해보세요</h3>
    <div class="example-tags">
        <div class="example-tag" onclick="setExampleAddress('서울 강남구 테헤란로 152')">강남 코엑스</div>
        <div class="example-tag" onclick="setExampleAddress('부산 해운대구 우동 1413')">부산 벡스코</div>
        <div class="example-tag" onclick="setExampleAddress('대구가톨릭대학교병원')">대구가톨릭대병원</div>
        <div class="example-tag" onclick="setExampleAddress('포시즌스호텔 서울')">포시즌스호텔</div>
    </div>
</div>
```

#### C. script.js에 함수 추가
```javascript
// 예시 주소 설정 함수
function setExampleAddress(address) {
    document.getElementById('addressInput').value = address;
    document.getElementById('addressForm').dispatchEvent(new Event('submit'));
}
```

### 3. 테스트
```bash
# 로컬 테스트
cd ../server
node proxy-server.js

# 브라우저에서 열기
# index.html 열어서 테스트
```

### 4. GitHub 업데이트
```bash
# 변경사항 커밋
git add style.css index.html
git commit -m "refactor: Apply Figma design - cleaner UI"
git push origin main
```

### 5. 남은 파일 구조
```
baroflowers-v3-latest/
├── api/
│   └── chat.js       # Vercel Functions
├── index.html        # 메인 페이지 (피그마 디자인 적용)
├── script.js         # API 로직
├── style.css         # 피그마 기반 스타일
├── vercel.json       # 배포 설정
├── README.md         # 문서
└── backup_20250628/  # 백업된 파일들
```

### 6. 주요 변경사항
- ✅ 불필요한 파일 모두 백업 폴더로 이동
- ✅ 피그마 디자인 기반 깔끔한 UI
- ✅ 태그형 예시 버튼
- ✅ 상세페이지 통합에 적합한 디자인
- ✅ 흰 배경 기반

이제 원래 의도대로 깔끔하게 정리되었습니다!