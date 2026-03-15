import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LanguageGuide from './LanguageGuide'

describe('LanguageGuide Component', () => {
  const mockPhrases = [
    { category: 'Test', phrase: 'Hello', translation: 'Kon', pronunciation: 'K', language: 'JP' }
  ]

  it('should render correctly', () => {
    render(<LanguageGuide phrases={mockPhrases} />)
    expect(screen.getByText('Language Guide')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('should filter by category', () => {
    render(<LanguageGuide phrases={mockPhrases} />)
    const filterBtn = screen.getByText('Test')
    fireEvent.click(filterBtn)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
