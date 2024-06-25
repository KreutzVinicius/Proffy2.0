import { useContext } from 'react'
import Header from '../../components/Header/Header'
import OnboardingForm from '../../components/OnboardingForm/OnboardingForm'
import { ProffyContext } from '../../context/proffyContext'

const EditProfile = () => {
    const { isTeacher } = useContext(ProffyContext)
    return (
        <div>
            <Header content={'Meu Perfil'} />

            <div className="give-classes-container">
                <OnboardingForm isEditing isTeacher={isTeacher} />
            </div>
        </div>
    )
}

export default EditProfile
