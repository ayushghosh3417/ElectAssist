export default async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const apiKey = Netlify.env.get('GEMINI_API_KEY');
  if (!apiKey) {
    return Response.json(
      { error: 'GEMINI_API_KEY is not configured on the server.' },
      { status: 500 },
    );
  }

  let userText;
  try {
    ({ userText } = await req.json());
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!userText || typeof userText !== 'string') {
    return Response.json({ error: 'Missing userText in request body.' }, { status: 400 });
  }

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    'You are an expert on the Indian Election Process. Answer briefly and simply. User asked: ' +
                    userText,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await upstream.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return Response.json({ text: data.candidates[0].content.parts[0].text });
    }
    if (data.error) {
      return Response.json({ error: data.error.message }, { status: 500 });
    }
    return Response.json({ error: 'Unexpected response from Gemini.' }, { status: 500 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};

export const config = {
  path: '/api/chat',
};
