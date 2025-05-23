import { useRegisterForm } from '../../store/register-form'

export function Total() {
    const { total } = useRegisterForm()

    function formatAmountMXN(amount) {
        const formattedAmount = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2,
        }).format(amount)

        return formattedAmount
    }

    return (
        <div className='mt-5 grid gap-6 items-center  p-4'>
            <div className='flex justify-between'>
                <p className='text-xl'>Subtotal</p>
                <p className='text-xl'>{formatAmountMXN(total)}</p>
            </div>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-bold'>Total</h2>
                <p className='text-4xl font-bold'>{formatAmountMXN(total)}</p>
            </div>
        </div>
    )
}
