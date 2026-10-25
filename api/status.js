// Proxy server-side ke API Gatus di VPS (menghindari mixed-content/CORS di browser).
// Data yang diteruskan: hasil probe nyata Gatus, tanpa angka karangan.
const GATUS = "http://165.245.177.40:8080/api/v1/endpoints/statuses";
module.exports = async (req, res) => {
  try {
    const r = await fetch(GATUS, { signal: AbortSignal.timeout(15000) });
    if (!r.ok) return res.status(502).json({ ok: false, error: "gatus_http_" + r.status });
    const data = await r.json();
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=30");
    return res.status(200).json({ ok: true, fetchedAt: new Date().toISOString(), endpoints: data });
  } catch (e) {
    return res.status(502).json({ ok: false, error: "gatus_unreachable" });
  }
};
