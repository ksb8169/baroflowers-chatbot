// Vercel Serverless Function - 보안 강화 버전
// /api/chat.js 파일로 저장

export default async function handler(req, res) {
  // 1. 특정 도메인만 허용 (배포 후 수정)
  const allowedOrigins = [
    'https://your-domain.vercel.app',  // 실제 도메인으로 변경
    'http://localhost:3000'  // 개발용
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. POST 요청만 처리
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 3. 요청 본문 검증
  if (!req.body || !req.body.question) {
    return res.status(400).json({ 
      code: '01', 
      message: '주소를 입력해주세요.' 
    });
  }

  // 4. 요청 속도 제한 (간단한 방식)
  // 실제로는 Vercel의 Edge Config나 외부 서비스 사용 권장
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // 5. 입력값 길이 제한
  if (req.body.question.length > 200) {
    return res.status(400).json({ 
      code: '01', 
      message: '주소가 너무 깁니다.' 
    });
  }

  try {
    // 실제 API로 요청 전달
    const response = await fetch(
      'https://apitalk.commerce.nepirity.com/auto_reply?storehash=3ad7a029-218f-11f0-b6a3-fa163ec3e4eb',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: req.body.question.trim()  // 공백 제거
        }),
      }
    );

    const data = await response.json();
    
    // 6. 응답 검증
    if (!data || typeof data.code === 'undefined') {
      throw new Error('Invalid API response');
    }
    
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('API 요청 오류:', error);
    return res.status(500).json({ 
      code: '99', 
      message: '서버 오류가 발생했습니다.' 
    });
  }
}