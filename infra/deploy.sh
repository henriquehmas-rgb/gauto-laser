#!/usr/bin/env bash
# =============================================================================
# deploy.sh — deploy na VPS (rodar NA VPS, não na máquina local)
#   bash /docker/gauto-laser/infra/deploy.sh
# Pré-requisitos: repo clonado em /docker/gauto-laser, rede externa 'traefik'
# existente (Traefik global da VPS), DNS de gautolaser.com.br apontando pra VPS.
# =============================================================================
set -euo pipefail

APP_DIR="/docker/gauto-laser"
COMPOSE_FILE="infra/docker-compose.yml"
HEALTH_URL="https://gautolaser.com.br"

echo "==> [1/5] Entrando em ${APP_DIR}"
cd "${APP_DIR}"

echo "==> [2/5] Atualizando código (git pull)"
git pull --ff-only

echo "==> [3/5] Build da imagem"
docker compose -f "${COMPOSE_FILE}" build --pull

echo "==> [4/5] Subindo container (--remove-orphans limpa serviços renomeados)"
docker compose -f "${COMPOSE_FILE}" up -d --remove-orphans

echo "==> [5/5] Aguardando resposta em ${HEALTH_URL}"
for attempt in $(seq 1 24); do
  if curl -fsS --max-time 5 "${HEALTH_URL}" > /dev/null 2>&1; then
    echo "OK: site respondendo em ${HEALTH_URL}"
    exit 0
  fi
  echo "   tentativa ${attempt}/24 — aguardando 5s..."
  sleep 5
done

echo "AVISO: site não respondeu a tempo. Verifique 'docker compose logs -f'." >&2
exit 1
