import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// Built-in plugin to serve from workspace `./assets` during dev and copy to `./dist/assets` during build
function serveAndCopyAssetsPlugin() {
  return {
    name: 'serve-and-copy-assets',
    // Dev server: Intercept and serve files from `./assets`
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/assets/')) {
          const cleanUrl = req.url.split('?')[0];
          const relativePath = cleanUrl.substring(8); // remove '/assets/'
          const filePath = path.resolve(process.cwd(), 'assets', relativePath);
          
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            let contentType = 'application/octet-stream';
            if (ext === '.png') contentType = 'image/png';
            else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
            else if (ext === '.svg') contentType = 'image/svg+xml';
            else if (ext === '.gif') contentType = 'image/gif';
            else if (ext === '.webp') contentType = 'image/webp';
            
            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    },
    // Production build: Copy files to output directory
    closeBundle() {
      const srcDir = path.resolve(process.cwd(), 'assets');
      const destDir = path.resolve(process.cwd(), 'dist', 'assets');
      
      if (!fs.existsSync(srcDir)) return;
      
      const copyRecursiveSync = (src: string, dest: string) => {
        const exists = fs.existsSync(src);
        const stats = exists && fs.statSync(src);
        const isDirectory = exists && stats.isDirectory();
        
        if (isDirectory) {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }
          fs.readdirSync(src).forEach((childItemName) => {
            if (childItemName === '.aistudio') return; // Skip AI Studio internal folder
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
          });
        } else {
          fs.copyFileSync(src, dest);
        }
      };
      
      copyRecursiveSync(srcDir, destDir);
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), serveAndCopyAssetsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
