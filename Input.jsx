import { useId } from 'react'

// Reusable controlled input. Works for <input> and <textarea>.
// Props: label, error, required, full (span both grid columns), textarea, ...native props.
export default function Input({ label, error, required, full, textarea, ...props }) {
  const id = useId()
  const Field = textarea ? 'textarea' : 'input'
  return (
    <div className={`form-field${full ? ' full' : ''}`}>
      <label htmlFor={id}>
        {label} {required && <span className="req">*</span>}
      </label>
      <Field id={id} aria-invalid={!!error} {...props} />
      <span className="field-error">{error}</span>
    </div>
  )
}
