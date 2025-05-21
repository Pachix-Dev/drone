import { useState, useRef, useEffect } from 'react'
import { useRegisterForm } from '../../store/register-form'
import { ProgramVip } from './ProgramVip'

export function Upgrade() {
    const { email, setEmail } = useRegisterForm()

    const [message, setMessage] = useState('')
    const [user, setUser] = useState(false)

    const urlbase = 'https://industrialtransformation.mx/server/'
    //const urlbase = 'http://localhost:3010/'

    const verifyUser = async () => {
        const response = await fetch(urlbase + 'get-user-by-email?email=' + email)
        const json = await response.json()
        if (response.status === 200) {
            setUser(true)
            setEmail(json.email)
            setMessage('')
        } else {
            setUser(false)
            setEmail('')
            setMessage(json.message)
        }
    }

    const handleEmail = (e) => {
        setUser(false)
        setEmail(e)
    }

    return (
        <>
            <div className='flex flex-col gap-1 md:block md:relative lg:mx-auto lg:w-2/3 xl:w-1/2 mt-5 md:mt-20'>
                <label
                    htmlFor='email'
                    className='md:text-left w-fit md:absolute bg-[#111827] md:-top-6 md:left-2 md:px-3 py-2'
                >
                    Ingresa el correo con el que te registraste
                </label>
                <input
                    className={`bg-transparent w-full ring-1 rounded-lg ${user ? 'ring-emerald-700' : 'ring-[#E42128]'
                        } ring-offset-2 ring-offset-transparent px-4 py-3 md:py-5 md:text-xl focus:outline-none`}
                    type='email'
                    name='email'
                    placeholder='tucorreo@hola.com'
                    onChange={(e) => handleEmail(e.target.value)}
                />
                <button
                    className={`md:absolute md:right-3 ${user ? 'bg-emerald-700' : 'bg-[#E42128]'
                        } px-4 py-2 mt-3 md:mb-3 rounded-md disabled:cursor-not-allowed w-full md:w-auto`}
                    onClick={verifyUser}
                    disabled={user}
                >
                    Verificar
                </button>
                {user && <div className='mt-10'>{/*<ProgramVip />*/}</div>}
                {message && (
                    <p className='text-red-600 font-bold text-center pt-5 text-xl'>
                        {message}
                    </p>
                )}
            </div>

            <p className='mt-5 text-center'>
                Si aun no te haz registrado ingresa aqui{' -> '}
                <a
                    href='/registro'
                    className='px-3 py-2 bg-[#E42128] hover:bg-red-700 font-bold rounded-2xl text-white  mt-5  gap-2'
                >
                    Registrate gratis
                </a>
            </p>
        </>
    )
}
