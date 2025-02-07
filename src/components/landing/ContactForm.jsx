import { useState } from 'react'
import { countrycodes } from '../../lib/countrycodes.js'

export function ContactForm({ currentLanguage }) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [response, setResponse] = useState('')
  const [sendStatus, setSendStatus] = useState(false)

  const handleCountryCodeChange = (event) => {
    setSelectedCountryCode(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://re-plus-mexico.com.mx/server/'

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
      const res = await fetch(urlbase + 'exhibitor-lead', requestOptions)
      const data = await res.json()
      if (data?.status) {
        setResponse(
          '¡Gracias! Tu información ha sido enviada con éxito. Nos pondremos en contacto contigo lo antes posible.'
        )
        currentLanguage === 'es'
          ? (window.location.href = '/gracias-por-registrarte')
          : (window.location.href = '/en/gracias-por-registrarte')
      }
    } catch (error) {
      console.log(error)
      setSendStatus(false)
      setResponse(
        'Lo sentimos en este momento no es posible enviar tu información...'
      )
    } finally {
      setSendStatus(false)
      document.getElementById('form-contact').reset()
    }
  }

  return (
    <div id='contactar' className='px-4'>
      <p className='mt-10 font-bold text-center text-3xl'>
        ¡Aprovecha esta gran oportunidad para convertirte en expositor!
      </p>
      <form
        id='form-contact'
        className='mt-10 space-y-10 w-8/12 mx-auto'
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor='category'
            className='block mb-2 text-sm font-medium text-black'
          >
            Category
          </label>
          <select
            id='category'
            name='category'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            required
          >
            <option value='' defaultValue>
              Elige una opción
            </option>
            <option value='Drones'>Drones</option>
            <option value='Navegación y posicionamiento'>
              Navegación y posicionamiento
            </option>
            <option value='Cartografía'>Cartografía</option>
            <option value='Geoprocesamiento'>Geoprocesamiento</option>
            <option value='Inteligencia Artificial'>
              Inteligencia Artificial
            </option>
            <option value='Topografía'>Topografía</option>
            <option value='Sensores remotos'>Sensores remotos</option>
            <option value='Monitoreo e inspecciones'>
              Monitoreo e inspecciones
            </option>
            <option value='Escaneo Láser y Lidar'>Escaneo Láser y Lidar</option>
            <option value='Escaneo Láser y Lidar'>
              Soluciones de uso recreativo
            </option>
            <option value='Escaneo Láser y Lidar'>
              Catastro multipropósito
            </option>
          </select>
        </div>
        <div>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-black'
          >
            Nombre
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
            placeholder='John Doe'
            required
            autoComplete='name'
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-black'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 '
            placeholder='name@example.com'
            required
            autoComplete='email'
          />
        </div>
        <div>
          <label
            htmlFor='countrycodes'
            className='block mb-2 text-sm font-medium text-black'
          >
            Codigo de país + número de teléfono
          </label>
          <div className='w-full  rounded-md shadow-md flex'>
            <div className='w-52'>
              <select
                className='block w-full mt-1 p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500'
                value={selectedCountryCode}
                onChange={handleCountryCodeChange}
                required
                id='countrycodes'
                name='countrycodes'
              >
                <option value='52' defaultValue={52}>
                  MX 52
                </option>
                {countrycodes.map((country, index) => (
                  <option key={index} value={country.code}>
                    {`${country.iso} (${country.code})`}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-full'>
              <input
                className='block w-full mt-1 p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500'
                type='number'
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder='Enter phone number'
                required
                id='phone'
                name='phone'
                autoComplete='phone'
              />
            </div>
          </div>
        </div>
        <div className='sm:col-span-2'>
          <label
            htmlFor='message'
            className='block mb-2 text-sm font-medium text-black'
          >
            Mensaje
          </label>
          <textarea
            id='message'
            rows='6'
            name='message'
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500'
            placeholder='Dejanos saber como podemos ayudarte...'
            required
          ></textarea>
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
                className='text-white bg-gray-900 hover:bg-blue-700 focus:ring-4 focus:outline-none 
                            focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              >
                Enviar
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
