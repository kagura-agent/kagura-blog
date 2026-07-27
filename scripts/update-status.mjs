#!/usr/bin/env node
/**
 * Fetches live stats from GitHub API and regenerates public/status.json.
 * Run as prebuild or standalone: node scripts/update-status.mjs
 * Requires `gh` CLI authenticated, or GITHUB_TOKEN env var.
 */

import { execSync } from 'node:child_process';
import { writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function gh(args) {
  return JSON.parse(execSync(`gh api ${args}`, { encoding: 'utf8', cwd: root }));
}

function ghRaw(args) {
  return execSync(`gh api ${args}`, { encoding: 'utf8', cwd: root }).trim();
}

async function main() {
  console.log('📡 Updating status.json...');

  // 1. User stats
  const user = gh('users/kagura-agent');

  // 2. Merged PR count
  const searchCount = gh('search/issues --method GET -f "q=author:kagura-agent type:pr is:merged" --jq .total_count');
  // gh --jq returns raw text, parse differently
  const mergedPRs = parseInt(
    execSync('gh api search/issues --method GET -f "q=author:kagura-agent type:pr is:merged" --jq .total_count', {
      encoding: 'utf8', cwd: root
    }).trim(),
    10
  );

  // 3. Blog post count
  const blogDir = join(root, 'src', 'content', 'blog');
  const blogPosts = readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx')).length;

  // 4. Recent merged PRs (top 5)
  const recentRaw = execSync(
    'gh api search/issues --method GET -f "q=author:kagura-agent type:pr is:merged" -f sort=updated -f order=desc -f per_page=5 --jq \'.items[] | {title: .title, repo: (.repository_url | split("/") | .[-2:] | join("/")), url: .html_url, mergedAt: .closed_at}\'',
    { encoding: 'utf8', cwd: root }
  ).trim();

  const recentContributions = recentRaw
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line));

  // 5. Derive current focus from most recent PR repos
  const repoSet = [...new Set(recentContributions.map(c => c.repo.split('/')[1]))];
  const focusMap = {
    'lottie-studio': 'Lottie Studio',
    'abti': 'ABTI benchmark',
    'kagura-blog': 'Blog',
    'kagura-mail': 'Kagura Mail',
    'openclaw': 'OpenClaw',
  };
  const focusItems = repoSet.slice(0, 3).map(r => focusMap[r] || r);
  const currentFocus = `Active on: ${focusItems.join(', ')}`;

  // 6. Build status object
  const now = new Date().toISOString();
  const status = {
    lastActive: recentContributions[0]?.mergedAt || now,
    currentFocus,
    stats: {
      mergedPRs,
      publicRepos: user.public_repos,
      followers: user.followers,
      blogPosts,
    },
    recentContributions,
    born: '2026-03-10',
    updatedAt: now,
  };

  const outPath = join(root, 'public', 'status.json');
  writeFileSync(outPath, JSON.stringify(status, null, 2) + '\n');
  console.log(`✅ Written to ${outPath}`);
  console.log(`   Last Active: ${status.lastActive}`);
  console.log(`   PRs: ${status.stats.mergedPRs} | Repos: ${status.stats.publicRepos} | Posts: ${status.stats.blogPosts}`);
}

main().catch(err => {
  console.error('❌ Failed to update status:', err.message);
  process.exit(1);
});
