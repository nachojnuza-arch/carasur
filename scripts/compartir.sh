#!/usr/bin/env bash

# Script para generar una vista previa remota temporal de Cara Sur con Cloudflare
# No utiliza emojis y garantiza el apagado seguro de los procesos al salir.

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

# 1. Verificar si cloudflared esta instalado
if ! command -v cloudflared &> /dev/null; then
  echo "Error: cloudflared no esta instalado en este equipo."
  echo "Instalalo con: sudo apt install cloudflared (o descargalo desde cloudflare.com)."
  exit 1
fi

STARTED_DEV_SERVER=false
DEV_SERVER_PID=""

# 2. Verificar si el servidor local en el puerto 3000 esta activo
if ! curl -s --head --request GET http://localhost:3000 | grep "200 OK" > /dev/null 2>&1; then
  echo "Iniciando servidor local en segundo plano..."
  npm run dev > /dev/null 2>&1 &
  DEV_SERVER_PID=$!
  STARTED_DEV_SERVER=true

  # Esperar a que el puerto 3000 responda (maximo 10 segundos)
  COUNTER=0
  while ! curl -s --head --request GET http://localhost:3000 | grep "200 OK" > /dev/null 2>&1; do
    sleep 1
    COUNTER=$((COUNTER + 1))
    if [ $COUNTER -ge 10 ]; then
      echo "Error: No se pudo iniciar el servidor local en el puerto 3000."
      if [ -n "$DEV_SERVER_PID" ]; then
        kill "$DEV_SERVER_PID" 2>/dev/null || true
      fi
      exit 1
    fi
  done
fi

# 3. Archivo temporal para capturar el log de cloudflared
TMP_LOG=$(mktemp /tmp/carasur_tunnel_XXXXXX.log)

CLEANED=false
# Limpieza al cerrar con Ctrl + C
cleanup() {
  if [ "$CLEANED" = true ]; then
    return
  fi
  CLEANED=true
  echo ""
  echo "Cerrando tunel y finalizando vista previa..."
  if [ -n "$CLOUDFLARED_PID" ]; then
    kill "$CLOUDFLARED_PID" 2>/dev/null || true
  fi
  if [ "$STARTED_DEV_SERVER" = true ] && [ -n "$DEV_SERVER_PID" ]; then
    kill "$DEV_SERVER_PID" 2>/dev/null || true
  fi
  rm -f "$TMP_LOG"
  echo "Vista previa finalizada. El enlace remoto ha dejado de existir."
  exit 0
}

trap cleanup INT TERM EXIT

# 4. Iniciar tunel de Cloudflare
cloudflared tunnel --url http://localhost:3000 > "$TMP_LOG" 2>&1 &
CLOUDFLARED_PID=$!

# 5. Esperar la aparicion de la URL de trycloudflare.com
TUNNEL_URL=""
MAX_WAIT=20
WAIT_COUNT=0

while [ -z "$TUNNEL_URL" ] && [ $WAIT_COUNT -lt $MAX_WAIT ]; do
  sleep 1
  WAIT_COUNT=$((WAIT_COUNT + 1))
  TUNNEL_URL=$(grep -o 'https://[a-zA-Z0-9-]\+\.trycloudflare\.com' "$TMP_LOG" | head -n 1 || true)
done

if [ -z "$TUNNEL_URL" ]; then
  echo "Error: No se pudo obtener el enlace de Cloudflare tras $MAX_WAIT segundos."
  echo "Detalle del log:"
  cat "$TMP_LOG"
  exit 1
fi

# 6. Mostrar el enlace limpio y claro en consola
clear || true
echo "============================================================"
echo "CARA SUR PRODUCTORA - VISTA PREVIA REMOTA"
echo "============================================================"
echo ""
echo "Enlace para compartir:"
echo ""
echo "  $TUNNEL_URL"
echo ""
echo "Detalles:"
echo "- La persona podra navegar la web completa desde cualquier lugar."
echo "- El panel de edicion local permanece bloqueado para el exterior."
echo "- Este enlace dejara de funcionar cuando cierres este comando."
echo ""
echo "Presiona Ctrl + C para finalizar la vista previa."
echo "============================================================"

# Mantener el proceso activo esperando Ctrl + C
wait "$CLOUDFLARED_PID"
