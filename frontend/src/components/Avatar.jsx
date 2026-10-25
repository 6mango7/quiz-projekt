// Kółko z pierwszą literą nazwy użytkownika
export function Avatar({ user, size = 40 }) {
  const letter = (user?.username ?? '?').charAt(0).toUpperCase()

  return (
    <span
      className="avatar"
      style={{ '--avatar-color': user?.color ?? '#7d8086', '--avatar-size': `${size}px` }}
      aria-hidden="true"
    >
      {letter}
    </span>
  )
}
