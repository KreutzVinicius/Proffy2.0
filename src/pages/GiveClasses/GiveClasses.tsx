import './styles.css'
import Header from '../../components/Header/Header'
import OnboardingForm from '../../components/OnboardingForm/OnboardingForm'

const GiveClasses = () => {
    return (
        <>
            <Header
                content={'Que incrível que você quer dar aulas.'}
                subcontent={
                    'O primeiro passo, é preencher esse formulário de inscrição'
                }
            />
            <div className="give-classes-container">
                <OnboardingForm isTeacher />
            </div>
        </>
    )
}

export default GiveClasses
