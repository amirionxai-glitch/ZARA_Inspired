import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AvatarLaunchPage from './AvatarLaunchPage.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/avatar-launch" element={<AvatarLaunchPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
