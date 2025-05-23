import { useForm } from 'react-hook-form'
import { useRegisterForm } from '../../store/register-form'
import { useState } from 'react'
import CustomMultiSelect from './CustomMultiSelect'

export function StepThree({ translates }) {
  const {
    name,
    paternSurname,
    maternSurname,
    email,
    phone,
    typeRegister,
    genre,
    nacionality,
    code_invitation,
    company,
    industry,
    position,
    area,
    country,
    municipality,
    state,
    city,
    address,
    colonia,
    postalCode,
    webPage,
    phoneCompany,
    eventKnowledge,
    productInterest,
    levelInfluence,
    wannaBeExhibitor,
    alreadyVisited,
    setEventKnowledge,
    setProductInterest,
    setLevelInfluence,
    setWannaBeExhibitor,
    setAlreadyVisited,
    incrementStep,
    decrementStep,
    setUser_id,
  } = useRegisterForm()

  const options = [
    { label: 'Expo Manufactura', value: 'Expo Manufactura' },
    { label: 'Expomaq', value: 'Expomaq' },
    { label: 'Fabtech', value: 'Fabtech' },
    { label: 'Tecma', value: 'Tecma' },
    { label: 'The Logistics World', value: 'The Logistics World' },
    { label: 'Automate', value: 'Automate' },
    {
      label: 'Expo Logística y Transporte',
      value: 'Expo Logística y Transporte',
    },
    { label: 'Expo Pack', value: 'Expo Pack' },
    { label: 'Expo Eléctrica', value: 'Expo Eléctrica' },
    { label: 'Meximold', value: 'Meximold' },
    { label: 'Fitma', value: 'Fitma' },
    { label: 'ITMS', value: 'ITMS' },
    { label: 'Hannover Messe (Alemania)', value: 'Hannover Messe (Alemania)' },
  ]

  const [message, setMessage] = useState('')
  const [processing, setProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://drone.igeco.mx/server/'

  async function saveUser() {
    setProcessing(true)
    const response = await fetch(urlbase + 'free-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        paternSurname,
        maternSurname,
        email,
        phone,
        typeRegister,
        genre,
        nacionality,
        code_invitation,
        company,
        industry,
        position,
        area,
        country,
        municipality,
        state,
        city,
        address,
        colonia,
        postalCode,
        webPage,
        phoneCompany,
        eventKnowledge,
        productInterest,
        levelInfluence,
        wannaBeExhibitor,
        alreadyVisited: alreadyVisited.map((item) => item.value).join(),
      }),
    })
    const json = await response.json()
    if (json.status) {
      setProcessing(false)
      setUser_id(json.insertId)
      incrementStep()
    } else {
      setProcessing(false)
      setMessage(json.message)
    }
  }

  return (
    <>
      <div className='grid md:grid-cols-2 gap-6 mt-5'>
        <div>
          <p className='font-semibold text-white'>
            {translates.how_find} <span className='text-red-600'>*</span>
          </p>
          <select
            {...register('eventKnowledge', {
              required: `${translates.requiered}`,
              onChange: (e) => setEventKnowledge(e.target.value),
            })}
            defaultValue={eventKnowledge}
            className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm text-white *:text-black uppercase'
          >
            <option value=''>{translates.select_option}</option>
            <option value='ESPECTACULAR'>{translates.spectacular}</option>
            <option value='PAGINA WEB'>{translates.website}</option>
            <option value='CORREO ELÉCTRONICO/MAILING'>MAILING</option>
            <option value='FACEBOOK'>FACEBOOK</option>
            <option value='TWITTER'>TWITTER</option>
            <option value='LINKEDIN'>LINKEDIN</option>
            <option value='INSTAGRAM'>INSTAGRAM</option>
            <option value='CORREO ELECTRÓNICO'>{translates.email}</option>
            <option value='INVITADO POR EXPOSITOR'>
              {translates.guest_by_exhibitor}
            </option>
            <option value='RADIO'>RADIO</option>
            <option value='TELEVISIÓN'>{translates.television}</option>
            <option value='PRENSA'>{translates.press}</option>
            <option value='ANUNCIO EN REVISTA'>{translates.magazine_ad}</option>
            <option value='TELEMARKETING'>TELEMARKETING</option>
          </select>
          {errors.eventKnowledge && (
            <p className='text-[#ffe200] font-light'>
              {errors.eventKnowledge.message}
            </p>
          )}
        </div>
        <div>
          <p className='font-semibold text-white'>
            {translates.product_interest}{' '}
            <span className='text-red-600'>*</span>
          </p>
          <select
            {...register('productInterest', {
              required: `${translates.requiered}`,
              onChange: (e) => setProductInterest(e.target.value),
            })}
            defaultValue={productInterest}
            className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm text-white *:text-black uppercase'
          >
            <option value=''>{translates.select_option}</option>
            <option value='DRONES'>{translates.interest_product_1}</option>
            <option value='SENSORES REMOTOS'>
              {translates.interest_product_2}
            </option>
            <option value='CARTOGRAFÍA'>{translates.interest_product_3}</option>
            <option value='GEOPROCESAMIENTO'>
              {translates.interest_product_4}
            </option>
            <option value='TOPOGRAFÍA 3D'>
              {translates.interest_product_5}
            </option>
            <option value='INTELIGENCIA ARTIFICIAL'>
              {translates.interest_product_6}
            </option>
            <option value='MONITOREO E INSPECCIONES'>
              {translates.interest_product_7}
            </option>
            <option value='NAVEGACIÓN Y POSICIONAMIENTO'>
              {translates.interest_product_8}
            </option>
            <option value='ESCANEO LASER Y LIDIAR'>
              {translates.interest_product_9}
            </option>
            <option value='CATASTRO MULTIPROPÓSITO'>
              {translates.interest_product_10}
            </option>
          </select>
          {errors.productInterest && (
            <p className='text-[#ffe200] font-light'>
              {errors.productInterest.message}
            </p>
          )}
        </div>
      </div>
      <div className='grid md:grid-cols-2 gap-6 mt-5'>
        <div>
          <p className='font-semibold text-white'>
            {translates.level_influence} <span className='text-red-600'>*</span>
          </p>
          <select
            {...register('levelInfluence', {
              required: `${translates.requiered}`,
              onChange: (e) => setLevelInfluence(e.target.value),
            })}
            defaultValue={levelInfluence}
            className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm text-white *:text-black uppercase'
          >
            <option value=''>{translates.select_option}</option>
            <option value='APRUEBO COMPRAS'>
              {translates.approve_purchases}
            </option>
            <option value='EVALUO O RECOMIENDO PROVEEDOR'>
              {translates.test_recomend}
            </option>
            <option value='NO TENGO DECISIÓN EN COMPRAS'>
              {translates.not_decide}
            </option>
          </select>
          {errors.levelInfluence && (
            <p className='text-[#ffe200] font-light'>
              {errors.levelInfluence.message}
            </p>
          )}
        </div>
        <div>
          <p className='font-semibold text-white'>
            {translates.already_visited}
          </p>
          <CustomMultiSelect
            translates={translates}
            options={options}
            value={alreadyVisited}
            onChange={setAlreadyVisited}
            label=''
            className='mt-2 w-full text-sm text-white *:text-black uppercase'
            hasSelectAll={false}
          />
        </div>
      </div>
      <div className='grid md:grid-cols-2 gap-6 mt-5'>
        <div>
          <p className='font-semibold text-white'>
            {translates.wanna_be_exhibitor}{' '}
            <span className='text-red-600'>*</span>
          </p>
          <select
            {...register('wannaBeExhibitor', {
              required: `${translates.requiered}`,
              onChange: (e) => setWannaBeExhibitor(e.target.value),
            })}
            defaultValue={wannaBeExhibitor}
            className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm text-white *:text-black uppercase'
          >
            <option value=''>{translates.select_option}</option>
            <option value='SI'>{translates.yes}</option>
            <option value='NO'>{translates.no}</option>
          </select>
          {errors.wannaBeExhibitor && (
            <p className='text-[#ffe200] font-light'>
              {errors.wannaBeExhibitor.message}
            </p>
          )}
        </div>
      </div>
      <div className='flex justify-between'>
        <button
          className='px-3 py-2 bg-[#7c5cf2] hover:bg-blue-600 rounded-2xl font-bold text-white  mt-5 flex gap-2'
          onClick={decrementStep}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
            />
          </svg>{' '}
          {translates.back}
        </button>
        <button
          className='px-3 py-2 bg-[#7c5cf2] hover:bg-blue-600 rounded-2xl text-white font-bold mt-5 flex gap-2'
          onClick={handleSubmit(saveUser)}
        >
          {translates.continue}
        </button>
      </div>
      {message && (
        <p className='mt-5 text-red-600 font-bold text-center'>{message}</p>
      )}
      {processing && (
        <div className='absolute top-0 left-0 bg-gray-400 bg-opacity-85 z-[999] w-full h-full px-4'>
          <div role='status' className='grid place-items-center w-full h-full'>
            <p className='text-center flex gap-2'>
              <svg
                aria-hidden='true'
                className='w-8 h-8 text-gray-200 animate-spin fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='font-bold text-white text-2xl'>
                Estamos procesando la información por favor espere...
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
