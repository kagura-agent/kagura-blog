#!/usr/bin/env bash
# check-deploy-health.sh — Quick deploy health check for blog-loop.
# Exits 0 if latest deploy succeeded, 1 if failed (prints details).
# Usage: ./scripts/check-deploy-health.sh [--consecutive N]
#   --consecutive N: fail if N or more consecutive failures (default: 1)

set -euo pipefail
cd "$(dirname "$0")/.."

THRESHOLD=1
while [[ $# -gt 0 ]]; do
  case "$1" in
    --consecutive) THRESHOLD="$2"; shift 2 ;;
    *) echo "Unknown arg: $1"; exit 2 ;;
  esac
done

# Fetch recent runs
RUNS=$(gh run list --workflow=deploy.yml --limit "$THRESHOLD" --json conclusion,headBranch,createdAt,url --jq '.')

if [[ -z "$RUNS" || "$RUNS" == "[]" ]]; then
  echo "⚠️  No deploy runs found"
  exit 0
fi

# Count consecutive failures from most recent
FAILURES=0
while IFS= read -r conclusion; do
  if [[ "$conclusion" == "failure" ]]; then
    ((FAILURES++))
  else
    break
  fi
done < <(echo "$RUNS" | jq -r '.[].conclusion')

if [[ $FAILURES -ge $THRESHOLD ]]; then
  echo "🚨 Deploy health: $FAILURES consecutive failure(s)!"
  echo "$RUNS" | jq -r '.[] | "  \(.createdAt) — \(.conclusion) — \(.url)"' | head -5
  exit 1
else
  LATEST=$(echo "$RUNS" | jq -r '.[0] | "\(.createdAt) — \(.conclusion)"')
  echo "✅ Deploy healthy: $LATEST"
  exit 0
fi
