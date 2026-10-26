import useReveal from '../hooks/useReveal'

// Wrapper that fades its children in on scroll (uses the useReveal custom hook).
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
