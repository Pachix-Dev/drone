import { useRegisterForm } from '../../store/register-form.js'

import { StepOne } from './StepOne.jsx'
import { StepTwo } from './StepTwo.jsx'
import { StepThree } from './StepThree.jsx'
import { StepFour } from './SetpFour.jsx'
import { Stepper } from './Stepper.jsx'

export function RegisterForm({ translates, currentLanguage }) {
    const { step } = useRegisterForm()

    return (
        <section className='py-5 bg-slate-900/95 p-10 rounded-lg'>
            <Stepper translates={translates} />
            <form className='mx-auto relative min-h-[300px] overflow-hidden'>
                <div className={`step-content ${step === 0 ? 'active' : ''}`}>
                    <StepOne translates={translates} />
                </div>
                <div className={`step-content ${step === 1 ? 'active' : ''}`}>
                    <StepTwo translates={translates} />
                </div>
                <div className={`step-content ${step === 2 ? 'active' : ''}`}>
                    <StepThree translates={translates} />
                </div>
                <div className={`step-content ${step === 3 ? 'active' : ''}`}>
                    <StepFour translates={translates} currentLanguage={currentLanguage} />
                </div>
            </form>
        </section>
    )
}
