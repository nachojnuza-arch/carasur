import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';
import { spawn, type ChildProcess } from 'child_process';
import net from 'net';

function checkPort(port: number, host = '127.0.0.1'): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(400);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

function adminServerPlugin(): Plugin {
  let adminProcess: ChildProcess | null = null;

  return {
    name: 'admin-server-auto-launcher',
    async configureServer(server) {
      const serverScript = path.resolve(import.meta.dirname, 'server/admin-server.ts');
      if (!fs.existsSync(serverScript)) {
        return;
      }

      const isAlreadyRunning = await checkPort(3001);
      if (isAlreadyRunning) {
        server.config.logger.info('\x1b[32m✔ Servidor Admin local activo en http://127.0.0.1:3001\x1b[0m');
        return;
      }

      server.config.logger.info('\x1b[36mℹ Iniciando Servidor Admin local en http://127.0.0.1:3001...\x1b[0m');

      const tsxBin = path.resolve(import.meta.dirname, 'node_modules/.bin/tsx');

      adminProcess = spawn(tsxBin, [serverScript], {
        stdio: 'inherit',
        env: process.env,
      });

      adminProcess.on('error', (err) => {
        server.config.logger.error(`\x1b[31mError al iniciar servidor admin: ${err.message}\x1b[0m`);
      });

      const cleanup = () => {
        if (adminProcess && !adminProcess.killed) {
          try {
            adminProcess.kill('SIGTERM');
          } catch {
            // ignore
          }
          adminProcess = null;
        }
      };

      server.httpServer?.on('close', cleanup);
      process.on('exit', cleanup);
      process.on('SIGINT', cleanup);
      process.on('SIGTERM', cleanup);
    },
  };
}

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  const adminComponentPath = path.resolve(import.meta.dirname, 'src/components/AdminView.tsx');
  const hasLocalAdmin = fs.existsSync(adminComponentPath);

  // En modo build (sitio público), o si no existe AdminView.tsx en el clon, se usa el stub vacío
  const adminResolvedPath = isDev && hasLocalAdmin
    ? adminComponentPath
    : path.resolve(import.meta.dirname, 'src/components/AdminStub.tsx');

  return {
    plugins: [react(), tailwindcss(), adminServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
        '@admin-view': adminResolvedPath,
      },
    },
    define: {
      __HAS_ADMIN_UI__: JSON.stringify(isDev && hasLocalAdmin),
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3001',
          changeOrigin: true,
        },
      },
    },
  };
});
