import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'

import '@/app/styles/main.scss'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} else {
  console.error('Failed to find root element with id "root"')
}
