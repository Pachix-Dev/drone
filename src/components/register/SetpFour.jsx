import { useRegisterForm } from '@/store/register-form'
import { useState } from 'react'

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { Resume } from './Resume.jsx'
import { Total } from './Total.jsx'

export function StepFour({ translates, currentLanguage }) {
  const {
    user_id,
    name,
    paternSurname,
    maternSurname,
    phone,
    email,
    position,
    company,
    total,
    typeRegister,
    setCompleteRegister,
    setInvoiceDownToLoad,
    decrementStep,
    items,
    clear,
  } = useRegisterForm()

  const [message, setMessage] = useState('')
  const [processing, setProcessing] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('')

  const urlbase = import.meta.env.DEV
    ? 'http://localhost:3010/'
    : 'https://drone.igeco.mx/server/'

  const [copied, setCopied] = useState(false)
  const textToCopy = '030225900038110671'

  const handleCopy = async (event) => {
    event.preventDefault()
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Oculta mensaje después de 2 segundos
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  const clien_id = import.meta.env.DEV
    ? 'AZ4hFSk_NoYY2zTeTvsFqPwsik-VE9OlcSedt4jh2RD77iPcvjeKEd1GtXA9qdo_5E4Kw_nYXxmkh6gH'
    : 'AVhhqptSlv4ttbc6ih1u59_PvECLJoNQWBktqSAwD60JPnWN_XiwPLS0QP9Bth_bWuAJ44SQaHIBEMxB'

  const style = { layout: 'vertical' }
  const initialOptions = {
    clientId: clien_id,
    currency: 'MXN',
    intent: 'capture',
  }

  async function createOrder() {
    const response = await fetch(urlbase + 'create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        total: total,
      }),
    })
    const order = await response.json()
    return order.id
  }

  async function onApprove(data) {
    setProcessing(true)
    const response = await fetch(urlbase + 'complete-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
        user_id,
        total,
        items,
        name,
        paternSurname,
        maternSurname,
        phone,
        email,
        position,
        company,
        typeRegister,
        currentLanguage,
      }),
    })
    const orderData = await response.json()
    if (orderData.status) {
      clear()
      setCompleteRegister(true)
      setInvoiceDownToLoad(orderData?.invoice)
      currentLanguage === 'es'
        ? (window.location.href = '/gracias-por-tu-compra')
        : (window.location.href = '/en/gracias-por-tu-compra')
    } else {
      setProcessing(false)
      setMessage(orderData?.message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer()

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          className='py-5 text-white'
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </>
    )
  }

  return (
    <>
      <div className='grid md:flex gap-10 '>
        <div className='w-full'>
          <div className='rounded-xl border-2 p-4 bg-white text-black'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <input
                  type='radio'
                  name='payment'
                  id='credit_card'
                  value='credit_card'
                  checked={selectedPayment === 'credit_card'}
                  onChange={() => setSelectedPayment('credit_card')}
                />
                <label htmlFor='credit_card'>Credit or Debit Card</label>
              </div>
              <div className='grid grid-flow-col place-items-center gap-2'>
                <img src='/img/visa.webp' alt='Visa' width={50} />
                <img src='/img/mastercard.webp' alt='Mastercard' />
              </div>
            </div>
            {selectedPayment === 'credit_card' && (
              <>
                <div className='mt-3 text-sm text-gray-600'>
                  <PayPalScriptProvider options={initialOptions}>
                    <ButtonWrapper showSpinner={false} />
                  </PayPalScriptProvider>
                </div>
              </>
            )}
          </div>
          {/* Bank Transfer Option */}
          <div className='rounded-xl border-2 p-4 mt-5 bg-white text-black'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <input
                  type='radio'
                  name='payment'
                  id='bank_transfer'
                  value='bank_transfer'
                  checked={selectedPayment === 'bank_transfer'}
                  onChange={() => setSelectedPayment('bank_transfer')}
                />
                <label htmlFor='bank_transfer'>
                  {translates.spei_transfer}
                </label>
              </div>
              <img src='/img/spei.webp' alt='SPEI' width={90} />
            </div>
            {selectedPayment === 'bank_transfer' && (
              <div className='mt-5 text-sm text-black'>
                <div className='p-4 w-full'>
                  <div className='flex justify-between items-center gap-3'>
                    <div className='flex gap-2 items-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                        />
                      </svg>
                      <p className='font-bold'>
                        {translates.account} CLABE <br />
                        <span className='font-mono text-lg'>{textToCopy}</span>
                      </p>
                    </div>
                    <button
                      onClick={handleCopy}
                      className='text-black px-3 py-1 rounded  transition'
                    >
                      {copied ? (
                        translates.copy_success + ' ✅'
                      ) : (
                        <div className='flex gap-2 text-'>
                          {translates.copy}
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='size-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z'
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
                <p className='font-bold'>{translates.instructions}</p>
                <p className='mt-2'>{translates.instructions_text}</p>
                <p
                  className='mt-2'
                  dangerouslySetInnerHTML={{
                    __html: translates.instructions_text_2,
                  }}
                />
                <p
                  className='mt-2'
                  dangerouslySetInnerHTML={{
                    __html: translates.instructions_text_3,
                  }}
                />
                <p
                  className='mt-2'
                  dangerouslySetInnerHTML={{
                    __html: translates.instructions_text_4,
                  }}
                />

                <p
                  className='mt-2'
                  dangerouslySetInnerHTML={{
                    __html: translates.instructions_text_5,
                  }}
                />
                <div
                  className='border-2 border-green-700 text-green-700 rounded-lg p-3 mt-5'
                  dangerouslySetInnerHTML={{
                    __html: translates.instructions_text_6,
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className='border-2 rounded-xl flex flex-col justify-between bg-white text-black'>
          <Resume currentLanguage={currentLanguage} />
          <Total />
        </div>
      </div>
      <div className='flex justify-between'>
        <button
          className='px-3 py-2  bg-[#7c5cf2] hover:bg-blue-600 rounded-2xl font-bold text-white  mt-5 flex gap-2'
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
