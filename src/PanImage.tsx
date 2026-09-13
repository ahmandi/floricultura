import { useState } from 'react'
import type { PointerEvent, SyntheticEvent } from 'react'

type PanImageProps = {
  src: string
  alt: string
  /** enquadramento com o mouse fora da imagem, ex.: 'center 85%' */
  restPosition?: string
  className?: string
  loading?: 'lazy' | 'eager'
}

// Só vale mover a foto se o object-cover esconder pelo menos 10% dela
const MIN_HIDDEN = 0.1

// Converte a posição do mouse (0–1) em object-position (0–100%),
// com uma margem de 10% nas bordas para ficar fácil chegar ao topo e ao fim da foto
const toPercent = (ratio: number) => Math.min(100, Math.max(0, ((ratio - 0.1) / 0.8) * 100))

// Imagem cortada (object-cover) que acompanha o mouse para mostrar a foto inteira.
// Em telas sem mouse, a classe pan-auto percorre a foto sozinha (ver index.css).
function PanImage({ src, alt, restPosition = 'center', className = '', loading }: PanImageProps) {
  const [position, setPosition] = useState(restPosition)
  const [pannable, setPannable] = useState(false)

  // Mede quanto da foto o object-cover está escondendo no tamanho atual da caixa
  const checkOverflow = (img: HTMLImageElement) => {
    const { naturalWidth: nw, naturalHeight: nh, clientWidth: cw, clientHeight: ch } = img
    if (!nw || !nh || !cw || !ch) return
    const scale = Math.max(cw / nw, ch / nh)
    const hidden = Math.max(1 - cw / (nw * scale), 1 - ch / (nh * scale))
    setPannable(hidden > MIN_HIDDEN)
  }

  const handleMove = (e: PointerEvent<HTMLImageElement>) => {
    // e.buttons: não mexe na foto enquanto o usuário arrasta o carrossel
    if (!pannable || e.pointerType !== 'mouse' || e.buttons) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = toPercent((e.clientX - rect.left) / rect.width)
    const y = toPercent((e.clientY - rect.top) / rect.height)
    setPosition(`${x.toFixed(1)}% ${y.toFixed(1)}%`)
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      draggable={false}
      onLoad={(e: SyntheticEvent<HTMLImageElement>) => checkOverflow(e.currentTarget)}
      onPointerEnter={(e) => checkOverflow(e.currentTarget)}
      onPointerMove={handleMove}
      onPointerLeave={() => setPosition(restPosition)}
      className={`object-cover transition-[object-position] duration-500 ease-out ${pannable ? 'pan-auto' : ''} ${className}`}
      style={{ objectPosition: position }}
    />
  )
}

export default PanImage
