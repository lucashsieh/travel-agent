import './styles/App.css'
import TemplateGallery from './components/TemplateGallery'
import LanguageGuide from './components/LanguageGuide'
import { ToastProvider } from './components/Toast'

function App() {
  return (
    <ToastProvider>
      <div className="app">
        <header className="app-header glass">
          <h1>✈️ 旅遊助手</h1>
          <p>你的專屬旅遊規劃夥伴</p>
        </header>
        <main className="app-main">
          <TemplateGallery />
          <LanguageGuide />
        </main>
      </div>
    </ToastProvider>
  )
}

export default App
