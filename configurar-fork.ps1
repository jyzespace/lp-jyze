# Script PowerShell para configurar fork do repositório

Write-Host "=== Configuração do Fork ===" -ForegroundColor Cyan
Write-Host ""

# Solicitar o usuário do GitHub
$usuario = Read-Host "Digite seu usuário do GitHub"

if ([string]::IsNullOrWhiteSpace($usuario)) {
    Write-Host "Erro: Usuário não pode ser vazio!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Configurando remoto para: https://github.com/$usuario/JYZE__LANDPAGE.git" -ForegroundColor Yellow
Write-Host ""

# Verificar se já existe um remoto chamado 'fork'
$remotoExistente = git remote | Select-String -Pattern "^fork$"
if ($remotoExistente) {
    Write-Host "Remoto 'fork' já existe. Removendo..." -ForegroundColor Yellow
    git remote remove fork
}

# Adicionar o fork como remoto
git remote add fork "https://github.com/$usuario/JYZE__LANDPAGE.git"

Write-Host "✓ Remoto 'fork' adicionado com sucesso!" -ForegroundColor Green
Write-Host ""

# Verificar remotos configurados
Write-Host "Remotos configurados:" -ForegroundColor Cyan
git remote -v

Write-Host ""
Write-Host "=== Próximos passos ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Certifique-se de que criou o fork no GitHub:" -ForegroundColor Yellow
Write-Host "   https://github.com/jyzespace/JYZE__LANDPAGE -> Fork" -ForegroundColor White
Write-Host ""
Write-Host "2. Para enviar para a branch main do seu fork, execute:" -ForegroundColor Yellow
Write-Host "   git checkout master" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u fork main" -ForegroundColor White
Write-Host ""
Write-Host "Ou se quiser manter a branch master:" -ForegroundColor Yellow
Write-Host "   git push -u fork master:main" -ForegroundColor White
Write-Host ""

