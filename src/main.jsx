import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AllNews from './pages/AllNews'
import NewsDetail from './pages/NewsDetail'
import ScrollToTop from './components/ScrollToTop'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<AllNews />} />
                <Route path="/news/:id" element={<NewsDetail />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
