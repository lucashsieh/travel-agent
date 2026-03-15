import './styles/App.css'
import TemplateGallery from './components/TemplateGallery'
import LanguageGuide from './components/LanguageGuide'

function App() {
  return (
    <div className="app">
      <header className="app-header glass">
        <h1>✈️ Travel Agent</h1>
        <p>Your premium travel planning companion</p>
      </header>
      <main className="app-main">
        <TemplateGallery />
        <LanguageGuide />
      </main>
    </div>
  )
}

export default App
