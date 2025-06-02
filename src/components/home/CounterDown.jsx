import { useCountdown } from '../../hooks/useCounterDown.js'

export function CounterDown({ dias, horas, minutos, segundos }) {
  const { days, hours, minutes, seconds } = useCountdown('11 nov 2025 09:00:00')
  return (
    <div className='text-white bg-transparent bg-opacity-50 backdrop-blur-xl flex text-center md:grid md:grid-cols-2 md:text-left lg:flex lg:text-center justify-center gap-6 text-md md:text-3xl font-semibold py-5 px-0 sm:px-5 md:px-8 lg:px-2 xl:px-8 border rounded-lg'>
      <div>
        <span className='font-extrabold  text-4xl lg:text-8xl'>{days}</span>{' '}
        {dias}
      </div>
      <div>
        <span className='font-extrabold text-4xl lg:text-8xl'>{hours}</span>{' '}
        {horas}
      </div>
      <div>
        <span className='font-extrabold text-4xl lg:text-8xl'>{minutes}</span>{' '}
        {minutos}
      </div>
      <div>
        <span className='font-extrabold text-4xl lg:text-8xl'>{seconds}</span>{' '}
        {segundos}
      </div>
    </div>
  )
}
