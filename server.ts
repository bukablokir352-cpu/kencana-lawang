import express from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Allow larger payload for base64 photo storage
  app.use(express.json({ limit: '60mb' }));
  app.use(express.urlencoded({ extended: true, limit: '60mb' }));

  const DATA_DIR = path.join(__dirname, 'data');
  const DATA_FILE = path.join(DATA_DIR, 'photos.json');

  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Helper to ensure descriptions are always consistent and accurate
  function cleanPhotos(list: any[]): any[] {
    return list.map((p) => {
      let desc = typeof p.desc === 'string' ? p.desc : '';
      if (
        (p.title && String(p.title).toUpperCase().includes('TURIREJO') || String(p.id) === '1794294301568') &&
        desc.includes('Srigading')
      ) {
        desc = desc.replace(/Ambulans Desa Srigading/g, 'Ambulans Desa Turirejo');
      }
      if (desc.includes('sungai Kali ini')) {
        desc = desc.replace(/sungai Kali ini/g, 'alur Kali Surak');
      }
      return { ...p, desc };
    });
  }

  // API Route: Get stored photos
  app.get('/api/photos', (req, res) => {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = cleanPhotos(parsed);
          return res.json({ success: true, photos: sanitized, source: 'server' });
        }
      }
      return res.json({ success: true, photos: null, source: 'empty' });
    } catch (err) {
      console.error('Error reading photos.json:', err);
      return res.status(500).json({ error: 'Failed to read photos' });
    }
  });

  // API Route: Save photos (synchronized across all computers)
  app.post('/api/photos', (req, res) => {
    try {
      const { photos } = req.body;
      if (!Array.isArray(photos)) {
        return res.status(400).json({ error: 'Invalid photos data: must be an array' });
      }
      const sanitized = cleanPhotos(photos);
      fs.writeFileSync(DATA_FILE, JSON.stringify(sanitized, null, 2), 'utf-8');
      return res.json({ success: true, count: sanitized.length, updatedAt: new Date().toISOString() });
    } catch (err) {
      console.error('Error saving photos.json:', err);
      return res.status(500).json({ error: 'Failed to save photos' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // In development, hook Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          server: httpServer,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the compiled dist folder
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Kencana Lawang Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
