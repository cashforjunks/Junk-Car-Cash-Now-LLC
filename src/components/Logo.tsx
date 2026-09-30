interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src="/logo-transparent.png"
      alt="Junk Car Cash Now LLC"
      className={className}
      width={180}
      height={60}
    />
  )
}
