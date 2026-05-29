/**
 * List screens for a Stitch project and download HTML from getHtml() URLs.
 *
 * Usage:
 *   node --env-file=.env scripts/fetch-stitch-project.mjs [projectId]
 * Default projectId: 7886715977653878132
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stitch } from '@google/stitch-sdk';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT = '7886715977653878132';

async function downloadText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url.slice(0, 80)}…`);
  return res.text();
}

async function main() {
  const projectId = process.argv[2] || DEFAULT_PROJECT;
  if (!process.env.STITCH_API_KEY) {
    console.error('Missing STITCH_API_KEY. Use: node --env-file=.env scripts/fetch-stitch-project.mjs');
    process.exit(1);
  }

  const outDir = join(__dirname, '..', 'docs', 'stitch', 'fetched');
  await mkdir(outDir, { recursive: true });

  const project = stitch.project(projectId);
  const screens = await project.screens();

  const summary = {
    fetchedAt: new Date().toISOString(),
    projectId,
    screenCount: screens.length,
    /** 当前项目 API 仅列出首页 + 测评列表两屏，无独立「课程列表」画面 */
    hasDedicatedCourseListScreen: false,
    screens: [],
  };

  for (const s of screens) {
    const sid = s.screenId ?? s.id;
    let htmlUrl = '';
    try {
      htmlUrl = await s.getHtml();
    } catch (e) {
      summary.screens.push({ screenId: sid, error: String(e?.message ?? e) });
      continue;
    }

    let html = '';
    try {
      html = await downloadText(htmlUrl);
    } catch (e) {
      summary.screens.push({ screenId: sid, htmlDownloadUrl: htmlUrl, downloadError: String(e?.message ?? e) });
      continue;
    }

    const safeName = String(sid).replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `screen-${safeName}.html`;
    await writeFile(join(outDir, fileName), html, 'utf8');

    const head = html.slice(0, 12000);
    const isAssessmentList =
      head.includes('心理测评') && (head.includes('关键词搜索') || head.includes('筛选'));

    summary.screens.push({
      screenId: sid,
      htmlFile: `docs/stitch/fetched/${fileName}`,
      htmlDownloadUrl: htmlUrl,
      byteLength: html.length,
      heuristicAssessmentList: isAssessmentList,
    });
  }

  await writeFile(join(outDir, 'stitch-fetch-summary.json'), JSON.stringify(summary, null, 2), 'utf8');
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
