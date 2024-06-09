import Header from "../../components/Header/Header";
import OnboardingForm from "../../components/OnboardingForm/OnboardingForm";

const EditProfile = () => {

  return (
    <div>
       <Header content={"Meu Perfil"}/>

       <div className="give-classes-container">
        <OnboardingForm isEditing />
    </div>
    </div>
  );
}

export default EditProfile;