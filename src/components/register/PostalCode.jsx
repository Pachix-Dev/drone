import { useForm } from 'react-hook-form'
import { useRegisterForm } from '../../store/register-form'
import { countries } from '../../data/list_countries'

export function PostalCode() {
    const {
        country,
        municipality,
        state,
        city,
        colonia,
        colonias,
        postalCode,
        setCountry,
        setMunicipality,
        setState,
        setCity,
        setColonia,
        setPostalCode,
        setColonias,
    } = useRegisterForm()
    const {
        register,
        formState: { errors },
    } = useForm({})

    const handlePostalCode = async (e) => {
        setPostalCode(e)
        if (e.length === 5 && country === 'Mexico') {
            const res = await fetch(
                `https://industrialtransformation.mx/server/get-postalcode/${e}`
            )
            const data = await res.json()
            if (data.status) {
                setPostalCode(e)
                setMunicipality(data.records[0].D_mnpio)
                setState(data.records[0].d_estado)
                setCity(
                    data.records[0].d_ciudad === ''
                        ? data.records[0].d_estado
                        : data.records[0].d_ciudad
                )
                setColonias(data.records.map((record) => record.d_asenta))
            } else {
                setMunicipality('')
                setState('')
                setCity('')
                setColonias([])
            }
        }
    }

    const isDisabled =
        country === 'Mexico'
            ? 'w-full rounded-lg bg-grey600 border border-gray-200 p-4 pe-12 text-sm shadow-sm'
            : 'w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm shadow-sm'

    return (
        <>
            <div className='grid md:grid-cols-2 gap-6 mt-5'>
                <div>
                    <p className='font-semibold text-gray-900 dark:text-white'>
                        País <span className='text-red-600'>*</span>
                    </p>
                    <select
                        {...register('country', {
                            required: 'País es requerido',
                            onChange: (e) => setCountry(e.target.value),
                        })}
                        defaultValue={country}
                        className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm text-white *:text-black'
                    >
                        <option value=''>Selecciona una opción</option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                    {errors.country && (
                        <p className='text-[#D70205] font-light'>
                            {errors.country.message}
                        </p>
                    )}
                </div>
                <div>
                    <p>
                        Código postal <span className='text-red-600'>*</span>
                    </p>
                    <div className='relative mt-2'>
                        <input
                            type='text'
                            {...register('postalCode', {
                                required: 'Codigo postal es requerido',
                                onChange: (e) => handlePostalCode(e.target.value),
                            })}
                            name='postalCode'
                            id='postalCode'
                            className='w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm shadow-sm'
                            placeholder='Ingresa código postal'
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
                    {errors.postalCode && (
                        <p className='text-[#D70205] font-light'>
                            {errors.postalCode.message}
                        </p>
                    )}
                </div>
            </div>
            <div className='grid md:grid-cols-2 gap-6 mt-5'>
                <div>
                    <p>
                        Estado <span className='text-red-600'>*</span>
                    </p>
                    <div className='relative mt-2'>
                        <input
                            type='text'
                            {...register('state', {
                                required: 'Estado es requerido',
                                onChange: (e) => setCity(e.target.value),
                            })}
                            name='state'
                            id='state'
                            className={isDisabled}
                            placeholder='Ingresa el nombre de la ciudad'
                            autoComplete='state'
                            defaultValue={state}
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
                        <p className='text-[#D70205] font-light'>{errors.state.message}</p>
                    )}
                </div>
                <div>
                    <p>
                        Municipio <span className='text-red-600'>*</span>
                    </p>
                    <div className='relative mt-2'>
                        <input
                            type='text'
                            {...register('municipality', {
                                required: 'Ciudad es requerido',
                                onChange: (e) => setCity(e.target.value),
                            })}
                            name='municipality'
                            id='municipality'
                            className={isDisabled}
                            placeholder='Ingresa el nombre de la ciudad'
                            autoComplete='municipality'
                            defaultValue={municipality}
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
                        <p className='text-[#D70205] font-light'>
                            {errors.municipality.message}
                        </p>
                    )}
                </div>
            </div>
            <div className='grid md:grid-cols-2 gap-6 mt-5'>
                <div>
                    <p>
                        Colonia <span className='text-red-600'>*</span>
                    </p>
                    <div className='relative mt-2'>
                        {country === 'Mexico' ? (
                            <select
                                {...register('colonia', {
                                    required: 'Colonia es requerido',
                                    onChange: (e) => setColonia(e.target.value),
                                })}
                                defaultValue={colonia}
                                className='mt-2 w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm text-white *:text-black'
                            >
                                <option value=''>Selecciona una opción</option>
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
                                    required: 'Colonia es requerido',

                                    onChange: (e) => setColonia(e.target.value),
                                })}
                                name='colonia'
                                id='colonia'
                                className='w-full rounded-lg bg-transparent border border-gray-200 p-4 pe-12 text-sm shadow-sm'
                                placeholder='Ingresa el nombre de la colonia'
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
                        <p className='text-[#D70205] font-light'>
                            {errors.colonia.message}
                        </p>
                    )}
                </div>
                <div>
                    <p>
                        Ciudad <span className='text-red-600'>*</span>
                    </p>
                    <div className='relative mt-2'>
                        <input
                            type='text'
                            {...register('city', {
                                required: 'Ciudad es requerido',
                                onChange: (e) => setCity(e.target.value),
                            })}
                            name='city'
                            id='city'
                            className={isDisabled}
                            placeholder='Ingresa el nombre de la ciudad'
                            autoComplete='city'
                            defaultValue={city}
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
                        <p className='text-[#D70205] font-light'>{errors.city.message}</p>
                    )}
                </div>
            </div>
        </>
    )
}
