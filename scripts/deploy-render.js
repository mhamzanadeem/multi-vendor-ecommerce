// Source-build deployment: exact commit, bounded polling, no production defaults.
async function main() {
  for (const key of ['RENDER_API_KEY', 'RENDER_SERVICE_ID', 'CI_COMMIT_SHA']) {
    if (!process.env[key]) throw new Error(`${key} is required`);
  }
  const base = `https://api.render.com/v1/services/${encodeURIComponent(process.env.RENDER_SERVICE_ID)}/deploys`;
  async function request(url, options = {}) {
    const response = await fetch(url, { ...options, headers: {
      authorization: `Bearer ${process.env.RENDER_API_KEY}`, 'content-type': 'application/json' },
      signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Render API returned ${response.status}`);
    return response.json();
  }
  const deploy = await request(base, { method: 'POST', body: JSON.stringify({ commitId: process.env.CI_COMMIT_SHA }) });
  for (let attempt = 0; attempt < 80; attempt++) {
    const current = await request(`${base}/${encodeURIComponent(deploy.id)}`);
    if (current.status === 'live') {
      if (current.commit?.id !== process.env.CI_COMMIT_SHA) throw new Error('Render deployed a different commit');
      console.log(`Render deployment ${deploy.id} is live at commit ${current.commit.id}`); return;
    }
    if (['build_failed', 'update_failed', 'canceled', 'deactivated'].includes(current.status)) {
      throw new Error(`Deployment stopped: ${current.status}`);
    }
    await new Promise(resolve => setTimeout(resolve, 15000));
  }
  throw new Error('Render deployment timed out');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
