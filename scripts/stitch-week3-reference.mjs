/**
 * One-off: create a Stitch project (if needed), generate 3 desktop reference screens,
 * write a JSON summary under docs/archive/week3/ (no secrets).
 *
 * Run from repo root (requires STITCH_API_KEY):
 *   node --env-file=.env scripts/stitch-week3-reference.mjs
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stitch } from '@google/stitch-sdk';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'docs', 'archive', 'week3');
const outFile = join(outDir, 'stitch-api-output.json');

const PROMPTS = {
  home: `Desktop web page for an educational psychology platform (China, Chinese UI).
Professional, minimal, trustworthy; not playful. Brand primary color #14B8C4 (teal), page background #F7F8FA, white cards, subtle borders.
Layout: top area is NOT needed (site chrome is separate). Content: large hero with H1 + short subtitle; two equal prominent cards linking to "心理测评" and "课程"; then a 3-column "产品特点" section with short text. Max width ~1200px feel, generous whitespace.`,

  assessmentList: `Desktop web page section: "心理测评" list for an educational psychology platform.
Same visual system: #F7F8FA background, white cards, #14B8C4 accents, restrained typography.
Include: page title + short subtitle + hint line; a filter panel with search field and three dropdowns (主题/对象/场景); below, a responsive grid of assessment cards. Each card shows: title, 2-3 small tags, summary text, audience line, duration line, two buttons (查看详情 / 开始测评).`,

  courseList: `Desktop web page section: "课程" list for an educational psychology platform.
Same visual system as above.
Include: title + subtitle; filter panel with search + two dropdowns (audience/topic); grid of course cards with cover placeholder area on top, title, summary, audience line, primary button (查看详情).`,
};

async function main() {
  if (!process.env.STITCH_API_KEY) {
    console.error('Missing STITCH_API_KEY. Set it or use: node --env-file=.env scripts/stitch-week3-reference.mjs');
    process.exit(1);
  }

  await mkdir(outDir, { recursive: true });

  const created = await stitch.callTool('create_project', {
    title: `KL Lab Week3 reference ${new Date().toISOString().slice(0, 10)}`,
  });

  /** @type {any} */
  const payload =
    created?.content?.[0]?.text != null
      ? JSON.parse(created.content[0].text)
      : created;

  await writeFile(join(outDir, 'stitch-create-project-raw.json'), JSON.stringify(created, null, 2), 'utf8');

  const name = payload?.name;
  const projectId =
    payload?.projectId ??
    payload?.id ??
    (typeof name === 'string' && name.includes('/')
      ? name.split('/').pop()
      : null);

  if (!projectId) {
    await writeFile(outFile, JSON.stringify(payload ?? created, null, 2), 'utf8');
    throw new Error(
      'Could not parse project id from create_project response. See docs/archive/week3/stitch-api-output.json',
    );
  }

  const project = stitch.project(String(projectId));

  const screens = [];
  for (const [key, prompt] of Object.entries(PROMPTS)) {
    const screen = await project.generate(prompt, 'DESKTOP');
    const htmlUrl = await screen.getHtml();
    const imageUrl = await screen.getImage();
    screens.push({
      key,
      screenId: screen.screenId ?? screen.id,
      prompt,
      htmlDownloadUrl: htmlUrl,
      imageDownloadUrl: imageUrl,
    });
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    projectId: String(projectId),
    screens,
  };

  await writeFile(outFile, JSON.stringify(summary, null, 2), 'utf8');
  console.log('Wrote', outFile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
