import { render, screen } from '@testing-library/react'
import TemplateGallery from './TemplateGallery'
import { ToastProvider } from './Toast'

describe('TemplateGallery Component', () => {
  it('should render the gallery title', () => {
    render(
      <ToastProvider>
        <TemplateGallery />
      </ToastProvider>
    )
    expect(screen.getByText('AI 提示詞模板')).toBeInTheDocument()
  })

  it('should show categories', () => {
    render(
      <ToastProvider>
        <TemplateGallery />
      </ToastProvider>
    )
    expect(screen.getByText('美食餐廳')).toBeInTheDocument()
    expect(screen.getByText('購物逛街')).toBeInTheDocument()
  })
})
