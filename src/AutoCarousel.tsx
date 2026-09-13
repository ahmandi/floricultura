import { useEffect, useState } from 'react'

type Slide = {
  src: string
  /** object-position da imagem, ex.: 'center 85%' */
  position?: string
}

type AutoCarouselProps = {
  slides: Slide[]
  alt: string
  interval?: number
  className?: string
}

// Carrossel que troca as imagens sozinho com fade (sem controles)
function AutoCarousel({ slides, alt, interval = 4000, className = '' }: AutoCarouselProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const id = setInterval(() => {
      // não avança com a aba em segundo plano
      if (!document.hidden) setActive((i) => (i + 1) % slides.length)
    }, interval)
    return () => clearInterval(id)
  }, [slides.length, interval])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={alt}
          aria-hidden={i !== active}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === active ? 'opacity-100' : 'opacity-0'}`}
          style={slide.position ? { objectPosition: slide.position } : undefined}
        />
      ))}
    </div>
  )
}

export default AutoCarousel
