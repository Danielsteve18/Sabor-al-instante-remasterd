#!/bin/sh
# Activa los hooks versionados en .githooks
# Uso: sh scripts/setup-hooks.sh

set -e

git config core.hooksPath .githooks
echo "Hooks activados: core.hooksPath = .githooks"
echo "Rama actual: $(git branch --show-current)"
