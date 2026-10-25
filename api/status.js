// Proxy server-side ke API Gatus di VPS (menghindari mixed-content/CORS di browser),
// plus detail server status VPS (port 8090, hanya berisi boolean/versi/persentase disk,
// tanpa kredensial). Data yang diteruskan: hasil probe nyata, tanpa angka karangan.
const GATUS = "http://165.245.177.40:8080/api/v1/endpoints/statuses";
const VPS_STATUS = "http://165.245.177.40:8090/status";
module.exports = async (req, res) => {
  try {
    const r = await fetch(GATUS, { signal: AbortSignal.timeout(15000) });
    if (!r.ok) return res.status(502).json({ ok: false, error: "gatus_http_" + r.status });
    const data = await r.json();
    let vps = null;
    try {
      const vr = await fetch(VPS_STATUS, { signal: AbortSignal.timeout(10000) });
      if (vr.ok) vps = await vr.json();
    } catch { vps = null; }
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=30");
    return res.status(200).json({ ok: true, fetchedAt: new Date().toISOString(), endpoints: data, vps });
  } catch (e) {
    return res.status(502).json({ ok: false, error: "gatus_unreachable" });
  }
};
