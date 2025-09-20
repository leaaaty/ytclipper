// ✅ Auto-detect backend
const API_URL =
  window.location.hostname.includes("github.io")
    ? "https://ytclipper-backend.onrender.com"
    : "http://localhost:3000";

const form = document.getElementById('dlForm');
const ts = document.getElementById('ts');

// Show/hide custom timestamp inputs
form.addEventListener('change', () => {
  ts.style.display = form.range.value === 'custom' ? 'block' : 'none';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const status = document.getElementById('status');
  status.innerText = 'Sending request...';

  // Prepare payload
  const payload = {
    url: document.getElementById('url').value.trim(),
    format: document.getElementById('format').value,
    range: form.range.value,
    start: document.getElementById('start').value.trim() || undefined,
    end: document.getElementById('end').value.trim() || undefined
  };

  try {
    // ✅ Use /clip route
    const res = await fetch("https://ytclipper-backend.onrender.com/download", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'x-api-key': 'YOUR_API_KEY' // not needed now
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
