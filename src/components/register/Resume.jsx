import { useRegisterForm } from '../../store/register-form'

export function Resume({ currentLanguage }) {
  const { items } = useRegisterForm()

  function formatAmountMXN(amount) {
    const formattedAmount = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount)

    return formattedAmount
  }

  return (
    <div className='mt-5 grid gap-6 '>
      {items.map((item, index) => (
        <div key={index} className='p-4 relative'>
          <div className='flex justify-between gap-5'>
            <h3 className='text-xl font-bold'>
              {currentLanguage === 'es' ? item.name : item.name_en}
            </h3>
            <p className='text-2xl text-end'>
              {item?.isDiscount ? '-' : ''}
              {formatAmountMXN(item.price)}
            </p>
          </div>

          <ul role='list' className='mt-5 space-y-5 my-2'>
            {currentLanguage === 'es'
              ? item?.included?.map((list, index) => (
                  <li key={index} className='flex items-center'>
                    <svg
                      className='flex-shrink-0 w-4 h-4 text-blue-600 '
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                    </svg>
                    <span className='text-base font-normal leading-tight text-gray-500  ms-3'>
                      {list}
                    </span>
                  </li>
                ))
              : item?.included_en?.map((list, index) => (
                  <li key={index} className='flex items-center'>
                    <svg
                      className='flex-shrink-0 w-4 h-4 text-blue-600 '
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                    </svg>
                    <span className='text-base font-normal leading-tight text-gray-500  ms-3'>
                      {list}
                    </span>
                  </li>
                ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
