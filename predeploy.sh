#!/bin/bash

echo "Deploy precheck..."

yarn build

DIRTY_FILES=$(git status --porcelain 2>/dev/null)
if [[ ! -z "$DIRTY_FILES" ]]; then
  echo "Repository contains uncommitted changes: "
  echo "$DIRTY_FILES"
  echo "Please commit those changes first."
  exit 1
else
  echo "Deploy precheck passed."
fi
