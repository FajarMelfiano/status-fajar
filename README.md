# Status Fajar

Dashboard status untuk aplikasi Fajar. Data diambil dari Gatus yang berjalan
sebagai binary systemd di VPS DigitalOcean (165.245.177.40:8080), lewat
Vercel Function `api/status.js` (proxy server-side).

- Gatus: `/root/gatus/config.yaml` di VPS, service `gatus` (systemd)
- 24 endpoint: 20 aplikasi Vercel + github-api + github-status + vercel-status + 9router-gateway-vps
- Deploy: Vercel, proyek `status-fajar`, terhubung ke repo GitHub ini
