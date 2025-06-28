#!/bin/bash
# macOS/Linux용 배포 스크립트

echo "========================================"
echo "🌺 바로꽃배달 통합형 UI GitHub 업로드"
echo "========================================"
echo ""

# Git 상태 확인
echo "📋 현재 Git 상태 확인 중..."
git status
echo ""

# 새 파일들 추가
echo "📁 새로운 통합형 UI 파일들을 추가합니다..."
git add index-integrated.html
git add style-integrated.css
git add script-integrated.js
git add compare-versions.html
git add README-integrated.md
git add "통합형UI구현가이드.md"
echo ""

# 커밋
echo "💾 변경사항을 커밋합니다..."
git commit -m "feat: 통합형 UI 버전 추가 - 상세페이지 통합에 최적화된 디자인"
echo ""

# GitHub에 푸시
echo "🚀 GitHub에 업로드합니다..."
git push origin main
echo ""

echo "✅ 완료! Vercel이 자동으로 배포를 시작합니다."
echo "📌 배포 상태 확인: https://vercel.com/dashboard"
echo "🌐 3-5분 후 확인: https://baroflowers-chatbot.vercel.app/"
echo ""
echo "📱 새 버전 테스트 URL:"
echo "   - 통합형: https://baroflowers-chatbot.vercel.app/index-integrated.html"
echo "   - 비교: https://baroflowers-chatbot.vercel.app/compare-versions.html"
echo ""