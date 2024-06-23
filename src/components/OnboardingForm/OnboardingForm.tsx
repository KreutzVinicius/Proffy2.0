import { useNavigate } from 'react-router-dom'
import './styles.css'
import { subjects, weekdays } from '../../utils'
import { useEffect, useState } from 'react'
import { AvailableTime, Classes, Proffy } from '../../types'

interface OnboardingFormProps {
    isTeacher?: boolean
    isEditing?: boolean
}

const OnboardingForm = ({
    isTeacher = false,
    isEditing = false,
}: OnboardingFormProps) => {
    const navigate = useNavigate()

    const [newProfile, setNewProfile] = useState<Proffy>({
        id: 0,
        name: '',
        email: '',
        password: '',
        avatar: '',
        whatsapp: '',
        bio: '',
    })
    const [newClasses, setNewClasses] = useState<Classes[]>([])
    const [newSchedules, setNewSchedules] = useState<AvailableTime[]>([])

    useEffect(() => {
        if (newClasses.length === 0) {
            createNewClass()
        }
        if (newSchedules.length === 0) {
            createSchedule()
        }
    }, [])

    const createNewClass = () => {
        const newClass = {
            id: newClasses.length + 1,
            subject: '',
            cost: 0,
        }

        const updatedClasses = [...newClasses, newClass]

        setNewClasses(updatedClasses)
    }

    const createSchedule = () => {
        const newSchedule = {
            id: newSchedules.length + 1,
            week_day: '',
            from: '',
            to: '',
        }

        const updatedSchedule = [...newSchedules, newSchedule]

        setNewSchedules(updatedSchedule)
    }

    const saveProfile = async () => {
        const payload = {
            ...newProfile,
            classes: isTeacher ? newClasses : undefined,
            availableTime: isTeacher ? newSchedules : undefined,
        }

        console.log(payload)

        // navigate('/home')
    }

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
                        <input
                            name="name"
                            id="name"
                            required
                            onChange={(e) =>
                                setNewProfile({
                                    ...newProfile,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>

                    {!isEditing && (
                        <div className="input-block">
                            <label>Email</label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                required
                                onChange={(e) =>
                                    setNewProfile({
                                        ...newProfile,
                                        email: e.target.value,
                                    })
                                }
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
                                onChange={(e) =>
                                    setNewProfile({
                                        ...newProfile,
                                        password: e.target.value,
                                    })
                                }
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
                        <input
                            name="avatar"
                            id="avatar"
                            type="url"
                            required
                            onChange={(e) =>
                                setNewProfile({
                                    ...newProfile,
                                    avatar: e.target.value,
                                })
                            }
                        />
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
                            onChange={(e) =>
                                setNewProfile({
                                    ...newProfile,
                                    whatsapp: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="textarea-block">
                        <label>Biografia</label>
                        <textarea
                            name="bio"
                            id="bio"
                            required
                            onChange={(e) =>
                                setNewProfile({
                                    ...newProfile,
                                    bio: e.target.value,
                                })
                            }
                        />
                    </div>
                </fieldset>

                {isTeacher && (
                    <>
                        <fieldset>
                            <legend>
                                Sobre a aula
                                <button
                                    type="button"
                                    id="add-time"
                                    onClick={createNewClass}
                                >
                                    + Nova Matéria
                                </button>
                            </legend>
                            {newClasses.map((_subject, index) => {
                                return (
                                    <div className="new-classes-container">
                                        <div className="select-block">
                                            <label>Matéria</label>

                                            <select
                                                name="subject"
                                                id="subject"
                                                required
                                                onSelect={(e) => {
                                                    setNewClasses(
                                                        (prevClasses) => {
                                                            const updatedClasses =
                                                                [...prevClasses]
                                                            updatedClasses[
                                                                index
                                                            ].subject = (
                                                                e.target as HTMLSelectElement
                                                            ).value
                                                            return updatedClasses
                                                        }
                                                    )
                                                }}
                                            >
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
                                            <input
                                                name="cost"
                                                id="cost"
                                                type="number"
                                                onChange={(e) =>
                                                    setNewClasses(
                                                        (prevClasses) => {
                                                            const updatedClasses =
                                                                [...prevClasses]
                                                            updatedClasses[
                                                                index
                                                            ].cost = parseInt(
                                                                e.target.value
                                                            )
                                                            return updatedClasses
                                                        }
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </fieldset>

                        <fieldset id="schedule-items">
                            <legend>
                                Horários disponíveis
                                <button
                                    type="button"
                                    id="add-time"
                                    onClick={createSchedule}
                                >
                                    + Novo Horário
                                </button>
                            </legend>

                            {newSchedules.map((_schedule, index) => {
                                return (
                                    <div className="new-classes-container">
                                        <div className="select-block">
                                            <label>Dia da semana</label>
                                            <select
                                                name="weekday[]"
                                                required
                                                onSelect={(e) => {
                                                    setNewSchedules(
                                                        (prevSchedules) => {
                                                            const updatedSchedules =
                                                                [
                                                                    ...prevSchedules,
                                                                ]
                                                            updatedSchedules[
                                                                index
                                                            ].week_day = (
                                                                e.target as HTMLSelectElement
                                                            ).value
                                                            return updatedSchedules
                                                        }
                                                    )
                                                }}
                                            >
                                                {weekdays.map(
                                                    (
                                                        weekday: any,
                                                        index: number
                                                    ) => (
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
                                                onChange={(e) => {
                                                    setNewSchedules(
                                                        (prevSchedules) => {
                                                            const updatedSchedules =
                                                                [
                                                                    ...prevSchedules,
                                                                ]
                                                            updatedSchedules[
                                                                index
                                                            ].from = (
                                                                e.target as HTMLInputElement
                                                            ).value
                                                            return updatedSchedules
                                                        }
                                                    )
                                                }}
                                            />
                                        </div>

                                        <div className="input-block">
                                            <label>Até</label>
                                            <input
                                                type="time"
                                                name="time_to[]"
                                                required
                                                onChange={(e) => {
                                                    setNewSchedules(
                                                        (prevSchedules) => {
                                                            const updatedSchedules =
                                                                [
                                                                    ...prevSchedules,
                                                                ]
                                                            updatedSchedules[
                                                                index
                                                            ].to = (
                                                                e.target as HTMLInputElement
                                                            ).value
                                                            return updatedSchedules
                                                        }
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
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
                    onClick={saveProfile}
                >
                    Salvar cadastro
                </button>
            </div>
        </div>
    )
}

export default OnboardingForm
