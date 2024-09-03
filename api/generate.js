const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const prompt = req.body.prompt;

  const apiKey = 'YOUR_OPENAI_API_KEY_HERE';

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const hashtags = response.data.choices[0].text.trim();
    res.status(200).json({ hashtags });
  } catch (error) {
    console.error('Error generating hashtags:', error);
    res.status(500).send('Error generating hashtags');
  }
};
