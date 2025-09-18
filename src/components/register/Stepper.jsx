import { useRegisterForm } from '../../store/register-form'

export function Stepper({ translates }) {
  const { step } = useRegisterForm()
  return (
    <div className='p-4 text-white font-bold'>
      <ol className='flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base'>
        <li
          className={`${step >= 0 ? 'text-[#6d73e2]' : ''} 
            flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 ">
            <svg
              className='w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
            </svg>
            <span className='hidden sm:inline-flex sm:ms-2'>
              {translates.info_personal}
            </span>
          </span>
        </li>
        <li
          className={`${step >= 1 ? 'text-[#6d73e2]' : ''} 
          flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
            {step >= 1 ? (
              <svg
                className='w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
              </svg>
            ) : (
              <span className='me-2'>2</span>
            )}{' '}
            <span className='hidden sm:inline-flex sm:ms-2'>
              {translates.info_company}
            </span>
          </span>
        </li>

        <li
          className={`${step >= 2 ? 'text-[#6d73e2]' : ''} 
          flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
            {step >= 1 ? (
              <svg
                className='w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
              </svg>
            ) : (
              <span className='me-2'>3</span>
            )}{' '}
            <span className='hidden sm:inline-flex sm:ms-2'>
              {translates.survey}
            </span>
          </span>
        </li>
        {/* <li className={`${step >= 3 ? 'text-[#6d73e2]' : ''} `}>
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                    {step >= 1 ? (
                        <svg
                            className='w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                        >
                            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                        </svg>
                    ) : (
                        <span className='me-2'>3</span>
                    )}{' '}
                    <span className='hidden sm:inline-flex sm:ms-2'>
                        {translates.buy_ticket}
                    </span>
                </span>
            </li>
        */}
      </ol>
    </div>
  )
}
