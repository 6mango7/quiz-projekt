import { useEffect, useEffectEvent } from 'react'

// Zamyka menu / okienko po kliknięciu obok albo klawiszem Escape.
//
// Użycie:
//   const ref = useRef(null)
//   useDismiss(ref, open, () => setOpen(false))
export function useDismiss(ref, active, onDismiss) {
  const dismiss = useEffectEvent(onDismiss)

  useEffect(() => {
    if (!active) return

    function handlePointer(e) {
      if (!ref.current?.contains(e.target)) dismiss()
    }
    function handleKey(e) {
      if (e.key === 'Escape') dismiss()
    }

    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [active, ref])
}
