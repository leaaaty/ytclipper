const API_URL = 'https://api.finanaryugu.com/download'; //todo

const form = document.getElementById('dlForm');
const ts = document.getElementById('ts');
form.addEventListener('change', () => {
  ts.style.display = form.range.value === 'custom' ? 'block' : 'none';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('status');
  status.innerText = 'Sending request...';

  const payload = {
    url: document.getElementById('url').value.trim(),
    format: document.getElementById('format').value,
    range: form.range.value,
    start: document.getElementById('start').value.trim() || undefined,
    end: document.getElementById('end').value.trim() || undefined
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        // 'x-api-key': 'YOUR_API_KEY'
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      status.innerText = 'Error: ' + text;
      return;
    }

    const data = await res.json();
    // backend returns { downloadUrl }
    status.innerHTML = `<a href="${data.downloadUrl}" target="_blank" rel="noopener">Download ready — click to download</a>`;
  } catch (err) {
    status.innerText = 'Network error: ' + err.message;
  }
});
