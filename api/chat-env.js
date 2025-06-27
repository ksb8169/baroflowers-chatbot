// Vercel Serverless Function - 환경변수 사용 버전
// /api/chat.js 파일로 저장

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST 요청만 처리
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 환경변수에서 storehash 가져오기 (더 안전!)
    const STORE_HASH = process.env.STORE_HASH || '3ad7a029-218f-11f0-b6a3-fa163ec3e4eb';
    
    // 실제 API로 요청 전달
    const response = await fetch(
      `https://apitalk.commerce.nepirity.com/auto_reply?storehash=${STORE_HASH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('API 요청 오류:', error);
    return res.status(500).json({ 
      code: '99', 
      message: '서버 오류가 발생했습니다.' 
    });
  }
}