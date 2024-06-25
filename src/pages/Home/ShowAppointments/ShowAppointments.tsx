import React, { useContext } from 'react'
import { ProffyContext } from '../../../context/proffyContext'
import './styles.css'

const ShowAppointments: React.FC = () => {
    const { classes, isTeacher } = useContext(ProffyContext)

    return (
        <div className="appointments-table-container">
            <span className="appointments-title"> Suas aulas</span>
            {classes.length !== 0 ? (
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Matéria</th>
                            <th>{isTeacher ? 'Alunos' : 'Professor'}</th>
                            <th>Horario</th>
                            <th>Whatsapp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classItem) => (
                            <tr key={classItem._id}>
                                <td>{classItem.subject}</td>
                                <td>{classItem.teacherName}</td>
                                <td>{classItem.date}</td>
                                <td>
                                    <img
                                        src="/images/icons/whatsapp.svg"
                                        alt="WhatsApp"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-appointments-message">
                    Atualmente você não tem aulas marcadas, que tal agendar com
                    um dos nossos proffys ?
                </div>
            )}
        </div>
    )
}

export default ShowAppointments
