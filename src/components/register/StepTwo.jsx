import { useForm } from 'react-hook-form'
import { useRegisterForm } from '../../store/register-form.js'
import { countries } from '../../data/list_countries'
import { useEffect, useState } from 'react'

export function StepTwo({ translates }) {
  const {
    company,
    industry,
    position,
    area,
    address,
    country,
    state,
    municipality,
    city,
    colonia,
    colonias,
    postalCode,
    webPage,
    phoneCompany,
    setCompany,
    setCountry,
    setPostalCode,
    setMunicipality,
    setState,
    setCity,
    setColonia,
    setColonias,
    setIndustry,
    setPosition,
    setArea,
    setAddress,
    setWebPage,
    setPhoneCompany,
    incrementStep,
    decrementStep,
  } = useRegisterForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      state,
      municipality,
      city,
      colonia,
    },
  })

  useEffect(() => {
    setValue('state', state)
    setValue('municipality', municipality)
    setValue('city', city)
    setValue('colonia', colonia)
  }, [state, municipality, city, colonia, setValue])
  const [messagePostalCode, setMessagePostalCode] = useState('')
  const urlbase = 'https://industrialtransformation.mx/server/'
  //const urlbase = 'http://localhost:3010/'
  const handlePostalCode = async (e) => {
    setPostalCode(e)
    if (e.length === 5 && country === 'Mexico') {
      const res = await fetch(urlbase + `get-postalcode/${e}`)
      const data = await res.json()
      if (data.status) {
        setMessagePostalCode('')
        setPostalCode(e)
        setMunicipality(data.records[0].D_mnpio)
        setState(data.records[0].d_estado)
        setCity(
          data.records[0].d_ciudad === ''
            ? data.records[0].d_estado
            : data.records[0].d_ciudad
        )
        setColonias(data.records.map((record) => record.d_asenta))
        setColonia('')
      } else {
        setMessagePostalCode(translates.no_postal_code_valid)
        setMunicipality('')
        setState('')
        setCity('')
        setColonias([])
        setColonia('')
      }
    }
    if (e.length > 5 && country === 'Mexico') {
      setMessagePostalCode(translates.no_postal_code_valid)
      setMunicipality('')
      setState('')
      setCity('')
      setColonias([])
      setColonia('')
    }
  }

  const isDisabled =
    country === 'Mexico'
      ? 'w-full rounded-lg bg-gray-600 border border-gray-200 p-4 pe-12 text-sm shadow-sm'
      : 'w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm shadow-sm'

  return (
    <>
      <div className='grid md:grid-cols-2 gap-6 mt-10'>
        <div>
          <p className='text-white'>
            {translates.company_name} <span className='text-red-600'>*</span>
          </p>
          <div className='relative mt-2'>
            <input
              type='text'
              {...register('company', {
                required: `${translates.requiered}`,
                onChange: (e) => setCompany(e.target.value),
              })}
              name='company'
              id='company'
              className='w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder={translates.placeholder_company_name}
              autoComplete='company'
              defaultValue={company}
            />
            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4 text-gray-400'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21'
                />
              </svg>
            </span>
          </div>
          {errors.company && (
            <p className='text-[#ffe200] font-light'>
              {errors.company.message}
            </p>
          )}
        </div>
        <div>
          <p className='font-semibold text-white'>
            {translates.industry} <span className='text-red-600'>*</span>
          </p>
          <select
            {...register('industry', {
              required: `${translates.requiered}`,
              onChange: (e) => setIndustry(e.target.value),
            })}
            defaultValue={industry}
            className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm *:text-black'
          >
            <option value=''>{translates.select_option}</option>
            <option value='AGRICULTURA'>{translates.industry_option_1}</option>
            <option value='MEDIO AMBIENTE'>
              {translates.industry_option_2}
            </option>
            <option value='CONSTRUCCIÓN'>{translates.industry_option_3}</option>
            <option value='ENERGÍA'>{translates.industry_option_4}</option>
            <option value='FORESTAL'>{translates.industry_option_5}</option>
            <option value='MOVILIDAD'>{translates.industry_option_6}</option>
            <option value='GOBIERNOS DE CIUDADES'>
              {translates.industry_option_7}
            </option>
            <option value='SEGURIDAD'>{translates.industry_option_8}</option>
            <option value='TELECOMUNICACIONES'>
              {translates.industry_option_9}
            </option>
            <option value='DEFENSA'>{translates.industry_option_10}</option>
            <option value='GAS Y PETRÓLEO'>
              {translates.industry_option_11}
            </option>
            <option value='INFRAESTUCTURA'>
              {translates.industry_option_12}
            </option>
            <option value='MINERÍA'>{translates.industry_option_13}</option>
            <option value='SANEAMIENTO Y OBRA PUBLICA'>
              {translates.industry_option_14}
            </option>
            <option value='SECTOR EDUCATIVO'>
              {translates.industry_option_15}
            </option>
          </select>
          {errors.industry && (
            <p className='text-[#ffe200] font-light'>
              {errors.industry.message}
            </p>
          )}
        </div>
      </div>
      <div className='grid md:grid-cols-2 gap-6 mt-5'>
        <div>
          <p className='font-semibold text-white'>
            {translates.position} <span className='text-red-600'>*</span>
          </p>
          <select
            {...register('position', {
              required: `${translates.requiered}`,
              onChange: (e) => setPosition(e.target.value),
            })}
            defaultValue={position}
            className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm text-white *:text-black'
          >
            <option value=''>{translates.select_option}</option>
            {industry === 'SECTOR EDUCATIVO' ? (
              <>
                <option value={translates.position_5}>
                  {translates.position_5}
                </option>
                <option value={translates.position_6}>
                  {translates.position_6}
                </option>
                <option value={translates.position_7}>
                  {translates.position_7}
                </option>
              </>
            ) : (
              <>
                <option value={translates.position_1}>
                  {translates.position_1}
                </option>
                <option value={translates.position_2}>
                  {translates.position_2}
                </option>
                <option value={translates.position_3}>
                  {translates.position_3}
                </option>
                <option value={translates.position_4}>
                  {translates.position_4}
                </option>
              </>
            )}
          </select>
          {errors.position && (
            <p className='text-[#ffe200] font-light'>
              {errors.position.message}
            </p>
          )}
        </div>
        <div>
          <p className='font-semibold text-white'>
            {translates.area} <span className='text-red-600'>*</span>
          </p>
          <select
            {...register('area', {
              required: `${translates.requiered}`,
              onChange: (e) => setArea(e.target.value),
            })}
            defaultValue={area}
            className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm text-white *:text-black uppercase'
          >
            <option value=''>{translates.select_option}</option>
            {industry === 'SECTOR EDUCATIVO' ? (
              <>
                <option value={translates.area_1}>{translates.area_1}</option>
                <option value={translates.area_2}>{translates.area_2}</option>
                <option value={translates.area_3}>{translates.area_3}</option>
                <option value={translates.area_4}>{translates.area_4}</option>
              </>
            ) : (
              <>
                {translates.list_area.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </>
            )}
          </select>
          {errors.area && (
            <p className='text-[#ffe200] font-light'>{errors.area.message}</p>
          )}
        </div>
      </div>
      <div className='mt-3'>
        <p className='text-white'>
          {translates.adrdress} <span className='text-red-600'>*</span>
        </p>
        <div className='relative mt-2'>
          <input
            type='text'
            {...register('address', {
              required: `${translates.requiered}`,
              onChange: (e) => setAddress(e.target.value),
            })}
            name='address'
            id='address'
            className='w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm shadow-sm'
            placeholder={translates.placeholder_address}
            autoComplete='address'
            defaultValue={address}
          />
          <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 text-gray-400'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
              />
            </svg>
          </span>
        </div>
        {errors.address && (
          <p className='text-[#ffe200] font-light'>{errors.address.message}</p>
        )}
      </div>
      <div className='grid md:grid-cols-2 gap-6 mt-5'>
        <div>
          <p className='font-semibold text-white'>
            {translates.country} <span className='text-red-600'>*</span>
          </p>
          <select
            {...register('country', {
              required: `${translates.requiered}`,
              onChange: (e) => setCountry(e.target.value),
            })}
            defaultValue={country}
            className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm text-white *:text-black'
          >
            <option value=''>{translates.select_option}</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className='text-[#ffe200] font-light'>
              {errors.country.message}
            </p>
          )}
        </div>
        <div>
          <p className='text-white'>
            {translates.postal_code} <span className='text-red-600'>*</span>
          </p>
          <div className='relative mt-2'>
            <input
              type='text'
              {...register('postalCode', {
                required: `${translates.requiered}`,
                onChange: (e) => handlePostalCode(e.target.value),
              })}
              name='postalCode'
              id='postalCode'
              className='w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder={translates.placeholder_postal_code}
              autoComplete='postalCode'
              defaultValue={postalCode}
            />
            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4 text-gray-400'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                />
              </svg>
            </span>
          </div>

          <p className='text-[#ffe200] font-light'>{messagePostalCode}</p>

          {errors.postalCode && (
            <p className='text-[#ffe200] font-light'>
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-6 mt-5'>
        <div>
          <p className='text-white'>
            {translates.state} <span className='text-red-600'>*</span>
          </p>
          <div className='relative mt-2'>
            <input
              type='text'
              {...register('state', {
                required: `${translates.requiered}`,
                onChange: (e) => setState(e.target.value),
                value: state,
              })}
              className={isDisabled}
              placeholder={translates.placeholder_state}
              disabled={country === 'Mexico'}
            />
            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4 text-gray-400'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z'
                />
              </svg>
            </span>
          </div>
          {errors.state && (
            <p className='text-[#ffe200] font-light'>{errors.state.message}</p>
          )}
        </div>
        <div>
          <p className='text-white'>
            {translates.municipality} <span className='text-red-600'>*</span>
          </p>
          <div className='relative mt-2'>
            <input
              type='text'
              {...register('municipality', {
                required: `${translates.requiered}`,
                onChange: (e) => setMunicipality(e.target.value),
              })}
              name='municipality'
              id='municipality'
              className={isDisabled}
              placeholder={translates.placeholder_municipality}
              autoComplete='municipality'
              disabled={country === 'Mexico'}
            />
            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4 text-gray-400'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z'
                />
              </svg>
            </span>
          </div>
          {errors.municipality && (
            <p className='text-[#ffe200] font-light'>
              {errors.municipality.message}
            </p>
          )}
        </div>
      </div>
      <div className='grid md:grid-cols-2 gap-6 mt-5'>
        <div>
          <p className='text-white'>
            {translates.colony}
            {country === 'Mexico' ? (
              <span className='text-red-600'>*</span>
            ) : (
              ''
            )}
          </p>
          <div className='relative mt-2'>
            {country === 'Mexico' ? (
              <select
                {...register('colonia', {
                  required: `${translates.requiered}`,
                  onChange: (e) => setColonia(e.target.value),
                })}
                className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm text-white *:text-black'
              >
                <option value=''>{translates.select_option}</option>
                {colonias.length > 0 &&
                  colonias.map((colonia) => (
                    <option key={colonia} value={colonia}>
                      {colonia}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                type='text'
                {...register('colonia', {
                  onChange: (e) => setColonia(e.target.value),
                })}
                name='colonia'
                id='colonia'
                className='w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm shadow-sm'
                placeholder={translates.placeholder_colony}
                autoComplete='colonia'
                defaultValue={colonia}
              />
            )}
            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4 text-gray-400'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z'
                />
              </svg>
            </span>
          </div>
          {errors.colonia && (
            <p className='text-[#ffe200] font-light'>
              {errors.colonia.message}
            </p>
          )}
        </div>
        <div>
          <p className='text-white'>
            {translates.city} <span className='text-red-600'>*</span>
          </p>
          <div className='relative mt-2'>
            <input
              type='text'
              {...register('city', {
                required: `${translates.requiered}`,
                onChange: (e) => setCity(e.target.value),
              })}
              name='city'
              id='city'
              className={isDisabled}
              placeholder={translates.placeholder_city}
              autoComplete='city'
              {...(city && { defaultValue: city })}
              disabled={country === 'Mexico'}
            />
            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4 text-gray-400'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z'
                />
              </svg>
            </span>
          </div>
          {errors.city && (
            <p className='text-[#ffe200] font-light'>{errors.city.message}</p>
          )}
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-6 mt-5'>
        <div>
          <p className='text-white'>{translates.website}</p>
          <div className='relative mt-2'>
            <input
              type='text'
              onChange={(e) => setWebPage(e.target.value)}
              name='webPage'
              id='webPage'
              className='w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder={translates.placeholder_website}
              autoComplete='webPage'
              defaultValue={webPage}
            />
            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4 text-gray-400'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
                />
              </svg>
            </span>
          </div>
        </div>
        <div>
          <p className='text-white'>{translates.company_phone} </p>
          <div className='relative mt-2'>
            <input
              type='tel'
              {...register('phoneCompany', {
                pattern: {
                  value: /^[0-9+]+$/,
                  message: `${translates.no_phone_valid}`,
                },
                onChange: (e) => setPhoneCompany(e.target.value),
              })}
              name='phoneCompany'
              id='phoneCompany'
              className='w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm shadow-sm'
              placeholder={translates.placeholder_company_phone}
              autoComplete='phoneCompany'
              defaultValue={phoneCompany}
            />
            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4 text-gray-400'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                />
              </svg>
            </span>
          </div>
          {errors.phoneCompany && (
            <p className='text-[#ffe200] font-light'>
              {errors.phoneCompany.message}
            </p>
          )}
        </div>
      </div>

      <div className='flex justify-between'>
        <button
          className='px-3 py-2 bg-[#7c5cf2] hover:bg-blue-600 rounded-2xl text-white font-bold mt-5 flex gap-2'
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
          </svg>
          {translates.back}
        </button>
        <button
          className='px-3 py-2 bg-[#7c5cf2] hover:bg-blue-600 rounded-2xl text-white font-bold mt-5 flex gap-2'
          onClick={handleSubmit(incrementStep)}
        >
          {translates.continue}
        </button>
      </div>
    </>
  )
}
