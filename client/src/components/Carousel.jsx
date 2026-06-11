import { useRef, useState, useEffect, useCallback } from 'react'
import api from '../api'

export default function Carousel() {
  const offsetRef   = useRef(0)
  const targetRef   = useRef(0)
  const rafRef      = useRef()
  const isDragging  = useRef(false)
  const lastX       = useRef(0)
  const itemRefs    = useRef([])
  const [hovered, setHovered]   = useState(null)
  const [projects, setProjects] = useState([])
  const [dimensions, setDimensions] = useState({
    isMobile: window.innerWidth < 768,
    width: window.innerWidth
  })

  const RADIUS      = dimensions.isMobile ? 180 : 600
  const ITEM_W      = dimensions.isMobile ? 260 : 500
  const ITEM_H      = dimensions.width < 768  ? 340
                    : dimensions.width < 1024 ? 400
                    : 600
  const ARC_DEGREES = dimensions.isMobile ? 20 : 10
  const LERP        = dimensions.isMobile ? 0.06 : 0.08

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        isMobile: window.innerWidth < 768,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const radius      = dimensions.isMobile ? 180 : 600
    const arcDegrees  = dimensions.isMobile ? 20 : 10
    const lerp        = dimensions.isMobile ? 0.06 : 0.08

    const tick = () => {
      offsetRef.current += (targetRef.current - offsetRef.current) * lerp

      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const totalItems = itemRefs.current.filter(Boolean).length
        const totalDegrees = totalItems * arcDegrees
        const rawAngle = (i * arcDegrees) + offsetRef.current
        // Normalize angle to loop within the full circle of items
        const angle = ((rawAngle % totalDegrees) + totalDegrees) % totalDegrees
        const rad      = (angle * Math.PI) / 180
        const x        = Math.sin(rad) * radius
        const z        = Math.cos(rad) * radius - radius
        const absAngle = Math.abs(((angle % 360) + 360) % 360)
        const facing   = absAngle < 90 || absAngle > 270
        const normAngle = absAngle < 180 ? absAngle : 360 - absAngle
        const t        = Math.min(1, normAngle / 80)
        const opacity  = facing ? Math.max(0.15, 1 - t * 0.8) : 0
        const scale    = facing ? Math.max(0.6, 1 - t * 0.45) : 0.6

        el.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`
        el.style.opacity   = opacity
        el.style.zIndex    = Math.round((1 - t) * 100)
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [dimensions])

  const onPointerDown = useCallback((e) => {
    isDragging.current = true
    lastX.current      = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastX.current
    targetRef.current -= dx * 0.15
    lastX.current      = e.clientX
  }, [])

  const onPointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const onWheel = useCallback((e) => {
    e.preventDefault()
    targetRef.current += e.deltaY * 0.05
  }, [])

  const onTouchStart = useCallback((e) => {
    lastX.current = e.touches[0].clientX
  }, [])

  const onTouchMove = useCallback((e) => {
    const dx = e.touches[0].clientX - lastX.current
    // Faster scroll multiplier on mobile
    targetRef.current -= dx * 10.00
    lastX.current = e.touches[0].clientX
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get("/api/projects")
        setProjects(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div
      style={{
        width:      '100vw',
        height:     '100vh',
        background: '#000000',
        overflow:   'hidden',
        cursor:     'grab',
        padding:    '30px',
        userSelect: 'none',
        touchAction: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <div style={{
        position:          'absolute',
        top:               '50%',
        left:              '50%',
        transform:         'translate(-50%, -50%)',
        perspective:       '1200px',
        perspectiveOrigin: '50% 50%',
        width:             0,
        height:            0,
      }}>
        <div
          key={dimensions.isMobile ? 'mobile' : 'desktop'}
          style={{
            transformStyle: 'preserve-3d',
            position:       'relative',
            width:          '100vw',
            height:         dimensions.isMobile ? '45vh' : '60vh'
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project._id}
              ref={el => itemRefs.current[i] = el}
              onMouseEnter={() => setHovered(project)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position:   'absolute',
                width:      ITEM_W,
                height:     ITEM_H,
                marginLeft: -(ITEM_W / 2),
                marginTop:  -(ITEM_H / 2),
                borderRadius: 4,
                overflow:   'hidden',
                willChange: 'transform, opacity',
                boxShadow:  hovered?._id === project._id
                  ? '0 0 40px rgba(255,255,255,0.15)'
                  : '0 8px 40px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src={project.image.replace('/upload/', `/upload/w_${dimensions.isMobile ? 400 : 800}/`)}
                alt={project.title}
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position:      'absolute',
        bottom:        20,
        left:          40,
        color:         '#e8d5b0',
        fontFamily:    'sans-serif',
        pointerEvents: 'none',
      }}>
        <div style={{ fontSize: 11, color: 'white', opacity: 0.5, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {hovered ? hovered.subtitle : 'Drag or scroll to explore'}
        </div>
        <div style={{ fontSize: 20, color: 'white', fontFamily: 'cursive', fontWeight: 700, lineHeight: 1 }}>
          {hovered?.title ?? ''}
        </div>
      </div>
    </div>
  )
}