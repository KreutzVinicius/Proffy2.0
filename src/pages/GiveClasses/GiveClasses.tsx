import { useState } from "react"
import "./styles.css"

const GiveClasses = () => {

const [subjects, setSubjects] = useState<string[]>([])
const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

    return (
    <div id="container">
        <form action="/save-classes" id="create-class" method="POST">

            <fieldset>
                <legend>Seus dados</legend>

                <div className="input-block">
                    <label>Nome completo</label>
                    <input name="name" id="name" required/>
                </div>

                <div className="input-block">
                    <label >Link da sua foto <small>(comece com https://)</small></label>
                    <input name="avatar" id="avatar" type="url" required/>
                </div>

                <div className="input-block">
                    <label>WhatsApp <small>(somente números)</small></label>
                    <input name="whatsapp" id="whatsapp" type="number" required/>
                </div>

                <div className="textarea-block">
                    <label>Biografia</label>
                    <textarea name="bio" id="bio" required></textarea>
                </div>
            </fieldset>


            <fieldset>
            <legend>Sobre a aula</legend>
                <div className="select-block">
                    <label>Matéria</label>
                    <select name="subject" id="subject" required>
                        <option value="">Selecione uma opção</option>
                        {subjects.map((subject) => {
                            return <option key={subject}>{subject}</option>;
                        })}
                    </select>
                </div>

                <div className="input-block">
                    <label>Custo da sua hora/aula 
                    <small>(R$)</small>
                    </label>
                    <input name="cost" id="cost" type="number"/>
                </div>
            </fieldset>


            <fieldset id="schedule-items">
                <legend>Horários disponíveis
                    <button type="button" id="add-time">+ Novo Horário</button>
                </legend>

                <div className="schedule-item">

                    <div className="select-block">
                    <label>Dia da semana</label>
                    <select name="weekday[]" required>
                        {weekdays.map((weekday:any, index: number) => (
                            <option key={index} value={index}>{weekday}</option>
                        ))}
                    </select>
                    </div>

                    <div className="input-block">
                    <label>Das</label>
                    <input type="time" name="time_from[]" required/>
                    </div>

                    <div className="input-block">
                    <label>Até</label>
                    <input type="time" name="time_to[]" required/>
                    </div>

                </div>

            </fieldset>

        </form>

        <div>
            <p>
            <img src="/images/icons/warning.svg" alt="Aviso importante"/>
            Importante! <br/> Preencha todos os dados
            </p>
            <button type="submit" form="create-className">Salvar cadastro</button>
        </div>
    </div>
    )
}

export default GiveClasses