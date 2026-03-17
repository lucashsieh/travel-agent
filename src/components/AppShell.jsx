import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Sparkles, BookOpen, Map, Film } from 'lucide-react'
import TemplateGallery from './TemplateGallery'
import LanguageGuide from './LanguageGuide'
import SocialVault from './SocialVault'
import './AppShell.css'

const NAV_ITEMS = [
  { id: 'home',      label: '探索',    icon: Compass,   component: null },
  { id: 'templates', label: 'AI 模板', icon: Sparkles,  component: TemplateGallery },
  { id: 'language',  label: '語言手冊', icon: BookOpen,  component: LanguageGuide },
  { id: 'social',    label: '靈感庫',  icon: Film,      component: SocialVault },
  { id: 'maps',      label: '導航',    icon: Map,       component: null },
]

const pageVariants = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } },
}

function HomeScreen() {
  return (
    <motion.div className="home-screen" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="home-hero">
        <motion.div
          className="home-hero-icon"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, type: 'spring', bounce: 0.4 }}
        >
          ✈️
        </motion.div>
        <motion.h2
          className="home-hero-title gradient-text-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
        >
          旅遊助手
        </motion.h2>
        <motion.p
          className="home-hero-sub"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        >
          你的 AI 旅遊規劃夥伴
        </motion.p>
      </div>

      <div className="home-cards">
        {[
          { icon: '✨', title: 'AI 提示詞模板', desc: '美食、景點、交通等分類模板，一鍵複製', tab: 'templates' },
          { icon: '🗣️', title: '語言手冊',      desc: '日韓常用語一鍵複製 + 語音朗讀',       tab: 'language' },
          { icon: '🎬', title: '社群靈感庫',    desc: '收藏 YouTube、IG、Threads 旅遊靈感', tab: 'social' },
          { icon: '🗺️', title: '導航連結',      desc: 'Google / Apple Maps 一鍵導航',       tab: 'maps' },
        ].map((card, i) => (
          <motion.div
            key={card.tab}
            className="home-card glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.35 }}
            whileHover={{ y: -4, boxShadow: 'var(--glass-shadow-hover)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="home-card-icon">{card.icon}</span>
            <div>
              <p className="home-card-title">{card.title}</p>
              <p className="home-card-desc">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function MapsScreen() {
  return (
    <motion.div className="maps-screen" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <h2 className="section-title">導航連結</h2>
      <p className="section-sub">功能即將上線</p>
    </motion.div>
  )
}

export default function AppShell() {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home':      return <HomeScreen key="home" />
      case 'templates': return <motion.div key="templates" variants={pageVariants} initial="initial" animate="animate" exit="exit"><TemplateGallery /></motion.div>
      case 'language':  return <motion.div key="language"  variants={pageVariants} initial="initial" animate="animate" exit="exit"><LanguageGuide /></motion.div>
      case 'social':    return <motion.div key="social"    variants={pageVariants} initial="initial" animate="animate" exit="exit"><SocialVault /></motion.div>
      case 'maps':      return <MapsScreen key="maps" />
      default:          return null
    }
  }

  return (
    <div className="app-shell">
      {/* ── Desktop Sidebar ── */}
      <aside className="sidebar glass-strong">
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon">✈️</span>
          <span className="sidebar-brand-name gradient-text-primary">旅遊助手</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <motion.button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {isActive && (
                  <motion.span
                    className="sidebar-active-pill"
                    layoutId="sidebar-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{item.label}</span>
              </motion.button>
            )
          })}
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="bottom-nav glass-strong">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {isActive && (
                <motion.span
                  className="bottom-nav-pill"
                  layoutId="bottom-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <motion.span
                animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -2 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="bottom-nav-icon"
              >
                <Icon size={22} strokeWidth={isActive ? 2.2 : 1.7} />
              </motion.span>
              <span className="bottom-nav-label">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
