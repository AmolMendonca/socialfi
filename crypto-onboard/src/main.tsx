import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HowItWorks from './pages/HowItWorks.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './pages/About.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />,  
  },
  {
    path: "/about",
    element: <About />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)