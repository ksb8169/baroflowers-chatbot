# 🚀 GitHub 업로드 및 Vercel 배포 실행 가이드

## 📌 현재 상태
- GitHub 저장소: ✅ 연결됨 (https://github.com/ksb8169/baroflowers-chatbot)
- Vercel 배포: ✅ 활성화됨 (https://baroflowers-chatbot.vercel.app)
- 새 파일들: ✅ 준비 완료

## 🎯 배포할 새 파일들
1. `index-integrated.html` - 통합형 메인 페이지
2. `style-integrated.css` - 통합형 스타일
3. `script-integrated.js` - 통합형 스크립트  
4. `compare-versions.html` - 버전 비교 페이지
5. `README-integrated.md` - 통합형 가이드
6. `통합형UI구현가이드.md` - 상세 문서

## 🔧 배포 실행 방법

### 방법 1: 배치 파일 사용 (Windows) 🪟
```cmd
cd C:\Users\오늘\Desktop\chatbot-webapp\baroflowers-v3-latest
deploy-integrated.bat
```

### 방법 2: 수동 Git 명령어 📝
```bash
# 1. 프로젝트 폴더로 이동
cd C:\Users\오늘\Desktop\chatbot-webapp\baroflowers-v3-latest

# 2. Git 상태 확인
git status

# 3. 새 파일 추가
git add index-integrated.html style-integrated.css script-integrated.js compare-versions.html README-integrated.md 통합형UI구현가이드.md

# 4. 커밋
git commit -m "feat: 통합형 UI 버전 추가 - 상세페이지 통합에 최적화된 디자인"

# 5. GitHub에 푸시
git push origin main
```

## ⏱️ 배포 후 확인 시간표

| 시간 | 작업 | 확인 URL |
|------|------|----------|
| 즉시 | GitHub 업로드 완료 | https://github.com/ksb8169/baroflowers-chatbot |
| 1-2분 | Vercel 빌드 시작 | https://vercel.com/dashboard |
| 3-5분 | 배포 완료 | https://baroflowers-chatbot.vercel.app/index-integrated.html |

## 🧪 배포 후 테스트

### 1. 통합형 버전 테스트
```
https://baroflowers-chatbot.vercel.app/index-integrated.html
```
- 주소 입력 테스트
- API 연동 확인
- 반응형 디자인 확인

### 2. 버전 비교 페이지
```
https://baroflowers-chatbot.vercel.app/compare-versions.html
```
- 기존 버전과 통합형 버전 비교
- 사이드바이사이드 뷰

### 3. 기존 버전 (변경 없음)
```
https://baroflowers-chatbot.vercel.app/
```
- 현재 운영 중인 버전
- 영향 없음 확인

## ✅ 성공 확인 방법

1. **GitHub**: 커밋이 main 브랜치에 표시됨
2. **Vercel**: Production 배포 상태가 "Ready"
3. **브라우저**: 새 URL에서 페이지 정상 작동

## ⚠️ 트러블슈팅

### Git 푸시 실패시
```bash
# 최신 변경사항 가져오기
git pull origin main

# 다시 푸시
git push origin main
```

### Vercel 빌드 실패시
- Vercel 대시보드에서 로그 확인
- 파일명 오타 확인
- vercel.json 설정 확인

## 📱 모바일 테스트
배포 완료 후 모바일에서도 확인:
1. QR 코드 생성기 사용
2. 또는 카카오톡으로 URL 전송

## 🎉 준비 완료!
이제 `deploy-integrated.bat`을 실행하여 배포를 시작하세요!

배포가 완료되면 새로운 통합형 UI가 라이브로 서비스됩니다.

---
**문의사항**: GitHub Issues 또는 010-2498-8515