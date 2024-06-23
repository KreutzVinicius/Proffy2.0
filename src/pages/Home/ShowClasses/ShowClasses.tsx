import { useContext } from 'react'
import { ProffyContext } from '../../../context/proffyContext'
import './styles.css'
import { subjects, weekdays } from '../../../utils'

const ShowClasses = () => {
    const { proffys } = useContext(ProffyContext)
    return (
        <div className="show-classes-container">
            <div className="find-content">
                <form id="search-teachers">
                    <div className="select-block">
                        <label>Matéria</label>
                        <select name="subject" id="subject">
                            <option value="">Selecione uma opção</option>
                            {subjects.map((subject) => {
                                return (
                                    <option key={subject} value={subject}>
                                        {subject}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="select-block">
                        <label>Dia da semana</label>
                        <select name="weekday" id="weekday">
                            <option value="">Selecione uma opção</option>
                            {weekdays.map((weekday, index) => {
                                return (
                                    <option key={weekday} value={weekday}>
                                        {weekday}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="input-block">
                        <label>Hora</label>
                        <input name="time" id="time" type="time" />
                    </div>
                </form>

                <button className="filter-classes-btn">Filtrar</button>
            </div>

            <div>
                {proffys.length === 0 && (
                    <p className="no-results">
                        Nenhum professor encontrado com a sua pesquisa
                    </p>
                )}
                {proffys.map((proffy) => (
                    <div className="teacher-item">
                        <div className="profile-pic-container">
                            <img
                                className="profile-pic"
                                src={proffy.avatar}
                                alt={proffy.name}
                            />
                            <div className="proffy-presentation">
                                <strong>{proffy.name}</strong>
                                <span>
                                    {proffy?.classes?.[0].subject ?? ''}
                                </span>
                            </div>
                        </div>

                        <div className="proffy-bio">{proffy.bio}</div>

                        <div className="proffy-contact">
                            <p className="proffy-price">
                                Preço/hora{' '}
                                <strong>R$ {proffy?.classes?.[0].cost}</strong>
                            </p>

                            <a
                                href={`https://api.whatsapp.com/send?l=pt_BR&phone=55${proffy.whatsapp}&text=Tenho interesse na sua aula de ${proffy?.classes?.[0].subject} ${proffy.name}`}
                                className="wpp-button"
                            >
                                <img
                                    src="/images/icons/whatsapp.svg"
                                    alt="WhatsApp"
                                />
                                Entrar em contato
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowClasses
