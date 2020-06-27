#!/bin/bash

echo "Deploy precheck…"

yarn build

# Ensure all routes always return the same page on Github pages
cp build/index.html build/404.html

DIRTY_FILES=$(git status --porcelain 2>/dev/null)
if [[ ! -z "$DIRTY_FILES" ]]; then
  echo "Repository contains uncommitted changes: "
  echo "$DIRTY_FILES"
  echo "Please commit those changes first."
  exit 1
else
  echo "Deploy precheck passed."
fi
