import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TemplateGallery from './TemplateGallery'

describe('TemplateGallery Component', () => {
  it('should render the gallery title', () => {
    render(<TemplateGallery />)
    expect(screen.getByText('AI Prompt Templates')).toBeInTheDocument()
  })

  it('should show categories', () => {
    render(<TemplateGallery />)
    expect(screen.getByText('Food & Dining')).toBeInTheDocument()
    expect(screen.getByText('Shopping')).toBeInTheDocument()
  })
})
