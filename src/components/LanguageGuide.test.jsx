import { render, screen, fireEvent } from '@testing-library/react'
import LanguageGuide from './LanguageGuide'
import { ToastProvider } from './Toast'

describe('LanguageGuide Component', () => {
  const mockPhrases = [
    { category: 'Test', phrase: 'Hello', translation: 'Kon', pronunciation: 'K', language: 'JP' }
  ]

  it('should render correctly', () => {
    render(
      <ToastProvider>
        <LanguageGuide phrases={mockPhrases} />
      </ToastProvider>
    )
    expect(screen.getByText('語言手冊')).toBeInTheDocument()
    expect(screen.getByText('你好')).toBeInTheDocument()
  })

  it('should filter by category', () => {
    render(
      <ToastProvider>
        <LanguageGuide />
      </ToastProvider>
    )
    const filterBtn = screen.getByRole('button', { name: '基礎用語' })
    fireEvent.click(filterBtn)
    expect(screen.getAllByText('你好').length).toBeGreaterThan(0)
  })
})
