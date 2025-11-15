# Instruções para criar Fork e enviar alterações

## Passo 1: Criar o Fork no GitHub

1. Acesse: https://github.com/jyzespace/JYZE__LANDPAGE
2. Clique no botão "Fork" no canto superior direito
3. Escolha sua conta/organização para criar o fork
4. Aguarde a criação do fork

## Passo 2: Configurar o repositório remoto

Após criar o fork, execute os seguintes comandos no terminal (substitua SEU_USUARIO pelo seu usuário do GitHub):

```bash
# Remover o remoto atual (se necessário)
git remote remove origin

# Adicionar seu fork como origin
git remote add origin https://github.com/SEU_USUARIO/JYZE__LANDPAGE.git

# Verificar se foi configurado corretamente
git remote -v
```

## Passo 3: Enviar para a branch main do fork

```bash
# Garantir que está na branch master/main
git checkout master

# Fazer merge das alterações (se necessário)
git merge feature/atualizacoes-landing-page

# Renomear master para main (se o fork usar main)
git branch -M main

# Enviar para o fork
git push -u origin main
```

## Alternativa: Usar um remoto diferente

Se quiser manter o remoto original e adicionar seu fork como outro remoto:

```bash
# Adicionar seu fork como 'fork' (mantém 'origin' original)
git remote add fork https://github.com/SEU_USUARIO/JYZE__LANDPAGE.git

# Enviar para seu fork
git push -u fork master:main
```

## Alterações incluídas neste commit

- ✅ Removida seção de planos (comentada)
- ✅ Alterada fonte do site para Parkinsans
- ✅ Removido botão 'Planos' do menu de navegação
- ✅ Botão 'Falar com especialista' redireciona para WhatsApp
- ✅ Removido botão 'Ver planos e preços' da seção hero
- ✅ Alterada cor da seção 'Modelos de Delivery atendidos' para branco
- ✅ Aplicado estilo do botão 'Ver planos' no botão 'Falar com especialista'

## Nota Importante

⚠️ **Lembre-se de adicionar os arquivos da fonte Parkinsans na pasta `public/fonts/`:**
- Parkinsans-Regular.woff2 (ou .woff/.ttf)
- Parkinsans-Bold.woff2 (ou .woff/.ttf)

Você pode baixar a fonte em: https://fontmeme.com/fontes/fonte-parkinsans/

