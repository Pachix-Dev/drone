import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from '@paypal/react-paypal-js'

import { useState } from 'react'
import { useRegisterForm } from '../../store/register-form'

export function Checkout({ currentLanguage }) {
    const { item, email, setCompleteRegister, setInvoiceDownToLoad, clear } =
        useRegisterForm()
    const [message, setMessage] = useState('')
    const [processing, setProcessing] = useState(false)
    const style = { layout: 'vertical' }

    const initialOptions = {
        clientId:
            'AZFPcXoEcNQyoYLYV-jTqEi3_ufNa3cPvWkEg741EYryPSimjaBL45KMgWHjVWd90Qn_QHT1lFI0sZUn',
        currency: 'MXN',
        intent: 'capture',
    }

    //const urlbase = 'https://industrialtransformation.mx/server/'
    const urlbase = 'http://localhost:3010/'

    async function createOrder() {
        const response = await fetch(urlbase + 'create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                total: item.price.toFixed(2),
            }),
        })
        const order = await response.json()
        return order.id
    }

    async function onApprove(data) {
        setProcessing(true)
        const response = await fetch(urlbase + 'upgrade-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderID: data.orderID,
                total: item.price.toFixed(2),
                item,
                email,
                currentLanguage,
            }),
        })
        const orderData = await response.json()
        if (orderData.status) {
            clear()
            setCompleteRegister(true)
            setInvoiceDownToLoad(orderData?.invoice)
            window.location.href = '/gracias-por-tu-compra'
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
            <div className='grid place-items-center w-full bg-white rounded-xl shadow-xl'>
                {message && (
                    <p className='mt-5 text-red-600 font-bold text-center'>{message}</p>
                )}
                <div className='mx-auto w-full p-5'>
                    <PayPalScriptProvider options={initialOptions}>
                        <ButtonWrapper showSpinner={false} />
                    </PayPalScriptProvider>
                </div>
            </div>

            {processing && (
                <div className='fixed top-0 left-0 bg-gray-400 bg-opacity-85 z-[999] w-full h-screen'>
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
