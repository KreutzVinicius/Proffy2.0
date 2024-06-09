import './styles.css'
import Header from '../../components/Header/Header'
import OnboardingForm from '../../components/OnboardingForm/OnboardingForm'

const HaveClasses = () => {
    return (
        <>
            <Header
                content={'Que incrível que você quer aprender mais !'}
                subcontent={
                    'O primeiro passo, é preencher esse formulário de inscrição'
                }
            />
            <div className="give-classes-container">
                <OnboardingForm />
            </div>
        </>
    )
}

export default HaveClasses
