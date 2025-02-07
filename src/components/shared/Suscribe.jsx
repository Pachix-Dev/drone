import { useState } from 'react'

export function Suscribe() {
  const [response, setResponse] = useState('')
  const [sendStatus, setSendStatus] = useState(false)

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://drone.igeco.mx/server/'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSendStatus(true)
    const formData = Object.fromEntries(new window.FormData(event.target))
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    }
    try {
      setSendStatus(true)
      const res = await fetch(urlbase + 'suscribe', requestOptions)
      const data = await res.json()
      if (data?.status) {
        setSendStatus(false)
        setResponse(
          '¡Gracias! Tu información ha sido enviada con éxito. Nos pondremos en contacto contigo lo antes posible.'
        )
      }
    } catch (error) {
      setSendStatus(false)
      setResponse('Ya estas suscrito...')
    } finally {
      setSendStatus(false)
      document.getElementById('form-suscribe').reset()
    }
  }

  return (
    <div id='suscribe' className='px-4'>
      <form id='form-suscribe' className='grid gap-3' onSubmit={handleSubmit}>
        <div className='grid'>
          <strong>Nombre</strong>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Nombre'
            required
            autoComplete='name'
            className='border-2 rounded-lg p-2'
          />
        </div>
        <div className='grid'>
          <strong>Correo electrónico</strong>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Correo'
            required
            className='border-2 rounded-lg p-2'
          />
        </div>
        {sendStatus ? (
          <span className='text-dark text-lg font-bold flex'>
            <svg
              className='animate-spin -ml-1 mr-3 h-5 w-5 text-dark'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>{' '}
            Enviando ...
          </span>
        ) : (
          <>
            {response === '' ? (
              <button
                type='submit'
                className='bg-[#0c3138] text-white rounded-lg p-2'
              >
                SUSCRIBIRSE AL BOLETIN
              </button>
            ) : (
              <span className='text-black font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-10 text-center'>
                {response}
              </span>
            )}
          </>
        )}
      </form>
    </div>
  )
}
