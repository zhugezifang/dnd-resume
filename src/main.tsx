import { PageEdit } from '@/pages/page-edit.tsx'
import { PagePreview } from '@/pages/page-preview.tsx'
// import App from './app.tsx'
import { Analytics } from '@vercel/analytics/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
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
