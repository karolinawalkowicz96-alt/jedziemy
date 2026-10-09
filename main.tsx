import React from 'react';
import {createRoot} from 'react-dom/client';
import {AppBoundary,ConnectionStatus} from './components/AppBoundary';
import Home from './app/page';
import './app/globals.css';
import './app/art-direction.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><AppBoundary><ConnectionStatus/><Home/></AppBoundary></React.StrictMode>);
