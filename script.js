document.getElementById('generate').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    document.getElementById('hashtags').textContent = data.hashtags;
  });
  
  document.getElementById('copy').addEventListener('click', () => {
    const hashtags = document.getElementById('hashtags').textContent;
    navigator.clipboard.writeText(hashtags);
    alert('Hashtags copied to clipboard!');
  });
  
  document.getElementById('regenerate').addEventListener('click', () => {
    document.getElementById('prompt').value = '';
    document.getElementById('hashtags').textContent = '';
  });
  