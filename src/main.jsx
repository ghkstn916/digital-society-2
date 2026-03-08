import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import LessonPage from './pages/LessonPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/digital-society-2">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:moduleId/:lessonId" element={<LessonPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
