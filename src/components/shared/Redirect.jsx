import { useRegisterForm } from '../../store/register-form.js'
import { useEffect } from 'react'

export function Redirect() {
  const { complete_register } = useRegisterForm()

  useEffect(() => {
    if (complete_register !== true) {
      window.location.href = '/'
    }
  }, [complete_register])

  return <></>
}
