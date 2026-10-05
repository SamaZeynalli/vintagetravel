import path from "path"
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Vercel `api/` qovluğundakı faylları avtomatik serverless funksiyaya çevirir,
 * amma Vite-ın dev serveri bundan xəbərsizdir. Bu plugin lokal işləyəndə
 * /api/inquiry sorğusunu həmin fayla yönləndirir ki, formu `npm run dev`
 * ilə də sonadək yoxlaya biləsən.
 *
 * Yalnız dev rejimində işləyir — production build-ə heç nə əlavə etmir.
 */
function devApiPlugin() {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/inquiry', async (req, res, next) => {
        try {
          // Hər sorğuda yenidən yüklənir, yəni funksiyanı dəyişəndə
          // serveri yenidən başlatmağa ehtiyac yoxdur
          const module = await server.ssrLoadModule('/api/inquiry.js')
          await module.default(req, res)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // .env faylındakı dəyərləri process.env-ə yükləyirik ki,
  // api/inquiry.js lokal işləyəndə də Supabase açarlarını görsün
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
