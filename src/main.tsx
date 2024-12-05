import { PageEdit } from '@/pages/edit'
import { PagePreview } from '@/pages/preview'
// import App from './app.tsx'
import { Analytics } from '@vercel/analytics/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
// @ts-expect-error ignore
import 'virtual:svg-icons-register'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PageEdit />}
        />
        <Route
          path="/edit"
          element={<PageEdit />}
        />
        <Route
          path="/preview"
          element={<PagePreview />}
        />
      </Routes>
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)
