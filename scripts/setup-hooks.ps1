# Activa los hooks versionados en .githooks
# Uso: pwsh scripts/setup-hooks.ps1

$ErrorActionPreference = "Stop"

git config core.hooksPath .githooks
Write-Host "Hooks activados: core.hooksPath = .githooks"
Write-Host "Rama actual: $(git branch --show-current)"
