import { useState, useCallback } from 'react'

// Reusable controlled-form hook with per-field validators.
// validators = { fieldName: (value, allValues) => 'error message' | '' }
export default function useForm(initialValues, validators) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const validateField = useCallback(
    (name, value, all) => (validators[name] ? validators[name](value, all) : ''),
    [validators],
  )

  // Controlled input: update state on every keystroke; re-validate once an error is showing.
  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value, next) }))
  }

  // Validate a single field when the user leaves it.
  const handleBlur = (e) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value, values) }))
  }

  // Validate everything; returns true when the form is valid.
  const validateAll = () => {
    const next = {}
    Object.keys(validators).forEach((name) => {
      next[name] = validateField(name, values[name] ?? '', values)
    })
    setErrors(next)
    return Object.values(next).every((msg) => !msg)
  }

  const reset = () => { setValues(initialValues); setErrors({}) }

  // Spread onto <Input /> to wire value/onChange/onBlur/error in one go.
  const field = (name) => ({
    name, value: values[name] ?? '', onChange: handleChange, onBlur: handleBlur, error: errors[name],
  })

  return { values, errors, field, validateAll, reset, setValues }
}
