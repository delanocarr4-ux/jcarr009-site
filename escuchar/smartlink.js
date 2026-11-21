const albumUrl = document.querySelector('link[rel="canonical"]').href;
const shareSection = document.querySelector('.share-album');
const shareButton = document.querySelector('#share-album');
const shareFallback = document.querySelector('.share-fallback');
const shareStatus = document.querySelector('#share-status');

shareSection.hidden = false;
shareButton.addEventListener('click', async () => {
  shareStatus.textContent = '';
  shareFallback.hidden = true;

  if (navigator.share) {
    try {
      await navigator.share({ title: 'Made in Babel · J.Cärr', url: albumUrl });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }

  try {
    await navigator.clipboard.writeText(albumUrl);
    shareStatus.textContent = 'Enlace copiado.';
  } catch {
    shareFallback.hidden = false;
    const input = shareFallback.querySelector('input');
    input.focus();
    input.select();
  }
});

function recordClick(event) {
  const link = event.target.closest('a[data-click]');
  if (!link || (event.type === 'auxclick' && event.button !== 1)) return;

  const body = new URLSearchParams({ item: link.dataset.click });
  if (navigator.sendBeacon?.('/api/smartlink-click', body)) return;
  fetch('/api/smartlink-click', { method: 'POST', body, keepalive: true }).catch(() => {});
}

document.addEventListener('click', recordClick);
document.addEventListener('auxclick', recordClick);
