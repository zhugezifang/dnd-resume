import { PageEdit } from '@/pages/edit'
import { PagePreview } from '@/pages/preview'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
// @ts-expect-error ignore
import 'virtual:svg-icons-register'
import './index.css'
import App from './app.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="dnd-resume">
      <Routes>
        <Route
          path="/"
          element={<App />}
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
    </BrowserRouter>
  </StrictMode>,
)
