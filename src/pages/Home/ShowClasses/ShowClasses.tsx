import { useState } from "react";
import { Proffy } from "../../../types";
import "./styles.css"

const ShowClasses = () => {

    const [proffys, setProffys] = useState<Proffy[]>([])

    return (
    <div className="show-classes-container">
        {proffys.length === 0 && <p className="no-results">Nenhum professor encontrado com a sua pesquisa</p>}
        {proffys.map(proffy => (
                    <div className="teacher-item">
            
                      <div>
                        <img src={proffy.avatar} alt={proffy.name} />
                        <div>
                          <strong>{proffy.name}</strong>
                          <span>{proffy.subject}</span>
                        </div>
                      </div>
              
                      <p>{proffy.bio}</p>
              
                      <div>
                        <p>Preço/hora<strong>R$ {proffy.cost}</strong></p>
                        <a href={`https://api.whatsapp.com/send?l=pt_BR&phone=55${proffy.whatsapp}&text=Tenho interesse na sua aula de ${proffy.subject} ${proffy.name}`} className="button">
                          <img src="/images/icons/whatsapp.svg" alt="WhatsApp" />
                          Entrar em contato
                        </a>
                      </div>
                    </div>
        ))}
    
    
    </div>
      )
}

export default ShowClasses;