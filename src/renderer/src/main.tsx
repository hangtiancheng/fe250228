import ReactDOM from 'react-dom/client'

import App from './app'
import { Toaster } from './components/ui/toast'
import './assets/main.css'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <Toaster>
    <App />
  </Toaster>
)
