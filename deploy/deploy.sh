#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ENV_FILE:-$ROOT_DIR/deploy/.env}"
STACK_FILE="${STACK_FILE:-$ROOT_DIR/deploy/docker-stack.yml}"

if [ -f "$ENV_FILE" ]; then
  echo "Usando variáveis de $ENV_FILE"
  # shellcheck source=/dev/null
  set -a && source "$ENV_FILE" && set +a
else
  echo "Arquivo $ENV_FILE não encontrado, seguindo com valores padrão/variáveis do shell."
fi

STACK_NAME="${STACK_NAME:-jyze}"
IMAGE_NAME="${IMAGE_NAME:-jyze-frontend}"
IMAGE="${IMAGE:-${IMAGE_NAME}:latest}"
DOMAIN="${DOMAIN:-jyze.newaylab.com.br}"
TRAEFIK_NETWORK="${TRAEFIK_NETWORK:-saborpaulista}"
TRAEFIK_CERTRESOLVER="${TRAEFIK_CERTRESOLVER:-letsencrypt}"
TRAEFIK_ENTRYPOINT_WEB="${TRAEFIK_ENTRYPOINT_WEB:-web}"
TRAEFIK_ENTRYPOINT_WEBSECURE="${TRAEFIK_ENTRYPOINT_WEBSECURE:-websecure}"
REPLICAS="${REPLICAS:-1}"

export STACK_NAME IMAGE IMAGE_NAME DOMAIN TRAEFIK_NETWORK TRAEFIK_CERTRESOLVER TRAEFIK_ENTRYPOINT_WEB TRAEFIK_ENTRYPOINT_WEBSECURE REPLICAS

if ! docker network inspect "$TRAEFIK_NETWORK" >/dev/null 2>&1; then
  echo "Rede $TRAEFIK_NETWORK não encontrada. Crie-a antes de deploy: docker network create --driver=overlay --attachable $TRAEFIK_NETWORK"
  exit 1
fi

echo "Construindo imagem ${IMAGE}..."
docker build -f "$ROOT_DIR/deploy/Dockerfile" -t "$IMAGE" "$ROOT_DIR"

echo "Publicando stack ${STACK_NAME}..."
docker stack deploy --prune -c "$STACK_FILE" "$STACK_NAME"

echo "Deploy finalizado."
echo "Serviços ativos: docker stack services ${STACK_NAME}"
echo "Logs: docker service logs ${STACK_NAME}_web -f"
