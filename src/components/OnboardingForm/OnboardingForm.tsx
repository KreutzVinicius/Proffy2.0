import { useNavigate } from 'react-router-dom'
import './styles.css'
import { subjects, weekdays } from '../../utils'

interface OnboardingFormProps {
    isTeacher?: boolean
    isEditing?: boolean
}

const OnboardingForm = ({
    isTeacher = false,
    isEditing = false,
}: OnboardingFormProps) => {
    const navigate = useNavigate()

    return (
        <div id="container">
            {isEditing && (
                <div className="profile-pic-container">
                    <img
                        className="profile-pic"
                        src="/images/blank-picture.webp"
                        alt="profile-pic"
                    />
                    <div></div>
                </div>
            )}

            <form action="/save-classes" id="create-class" method="POST">
                <fieldset>
                    <legend>Seus dados</legend>

                    <div className="input-block">
                        <label>Nome completo</label>
                        <input name="name" id="name" required />
                    </div>

                    {!isEditing && (
                        <div className="input-block">
                            <label>Email</label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                required
                            />
                        </div>
                    )}

                    {!isEditing && (
                        <div className="input-block">
                            <label>Senha</label>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                required
                            />
                        </div>
                    )}

                    <div className="input-block">
                        <label>
                            <div>
                                Link da sua foto{' '}
                                <small>(comece com https://)</small>
                            </div>
                        </label>
                        <input name="avatar" id="avatar" type="url" required />
                    </div>

                    <div className="input-block">
                        <label>
                            <div>
                                WhatsApp <small>(somente números)</small>
                            </div>
                        </label>
                        <input
                            name="whatsapp"
                            id="whatsapp"
                            type="number"
                            required
                        />
                    </div>

                    <div className="textarea-block">
                        <label>Biografia</label>
                        <textarea name="bio" id="bio" required></textarea>
                    </div>
                </fieldset>

                {isTeacher && (
                    <>
                        <fieldset>
                            <legend>Sobre a aula</legend>
                            <div className="select-block">
                                <label>Matéria</label>
                                <select name="subject" id="subject" required>
                                    <option value="">
                                        Selecione uma opção
                                    </option>
                                    {subjects.map((subject) => {
                                        return (
                                            <option key={subject}>
                                                {subject}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="input-block">
                                <label>
                                    <div>
                                        Custo da sua hora/aula
                                        <small>(R$)</small>
                                    </div>
                                </label>
                                <input name="cost" id="cost" type="number" />
                            </div>
                        </fieldset>

                        <fieldset id="schedule-items">
                            <legend>
                                Horários disponíveis
                                <button type="button" id="add-time">
                                    + Novo Horário
                                </button>
                            </legend>

                            <div className="schedule-item">
                                <div className="select-block">
                                    <label>Dia da semana</label>
                                    <select name="weekday[]" required>
                                        {weekdays.map(
                                            (weekday: any, index: number) => (
                                                <option
                                                    key={index}
                                                    value={index}
                                                >
                                                    {weekday}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div className="input-block">
                                    <label>Das</label>
                                    <input
                                        type="time"
                                        name="time_from[]"
                                        required
                                    />
                                </div>

                                <div className="input-block">
                                    <label>Até</label>
                                    <input
                                        type="time"
                                        name="time_to[]"
                                        required
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </>
                )}
            </form>

            <div className="form-footer">
                <div className="footer-message">
                    <img
                        src="/images/icons/warning.svg"
                        alt="Aviso importante"
                    />
                    <span style={{ marginLeft: '1rem' }}>
                        {' '}
                        Importante! <br /> Preencha todos os dados{' '}
                    </span>
                </div>
                <button
                    type="submit"
                    className="form-save"
                    onClick={() => navigate('/home')}
                >
                    Salvar cadastro
                </button>
            </div>
        </div>
    )
}

export default OnboardingForm
