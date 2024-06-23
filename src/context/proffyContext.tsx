import React, { createContext, useEffect, useState } from 'react'
import { ScheduledClasses, Proffy } from '../types'

interface ProffyContextData {
    proffys: Proffy[]
    classes: ScheduledClasses[]
    isTeacher?: boolean
    isLogged?: boolean
}

const proffyInitialValues: ProffyContextData = {
    proffys: [],
    classes: [],
    isTeacher: false,
    isLogged: false,
}

export const ProffyContext =
    createContext<ProffyContextData>(proffyInitialValues)

export const ProffyProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [proffys, setProffys] = useState<Proffy[]>([])
    const [classes, setClasses] = useState<ScheduledClasses[]>([])
    const [isTeacher, setIsTeacher] = useState<boolean>(false)

    const [isLogged, setIsLogged] = useState<boolean>(false)

    useEffect(() => {
        if (proffys.length === 0) {
            getProffys()
        }
    }, [proffys])

    useEffect(() => {
        if (classes.length === 0) {
            getClasses()
        }
    }, [classes])

    const getProffys = async () => {
        // const response = await fetch('http://localhost:3333/proffys');
        // const data = await response.json();
        const data: Proffy[] = [
            {
                id: 1,
                name: 'Beatriz Santos',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs0fPDq-uqe_n_vVW8_zbprY04aU33LebzDA&s',
                whatsapp: '',
                bio: 'A Dra. Beatriz Santos é uma cientista vibrante e curiosa, com um amor profundo pela química. Ela completou seu doutorado em Química Orgânica na Universidade Estadual de Campinas, onde se especializou em síntese de compostos bioativos. Em suas aulas, a Dra. Beatriz transforma o laboratório em um palco de descobertas, onde cada experimento é uma oportunidade de ver a química em ação. Sua abordagem dinâmica e prática ajuda os alunos a compreenderem como as reações químicas são fundamentais para a vida cotidiana e a inovação tecnológica. A Dra. Beatriz é conhecida por sua capacidade de inspirar seus alunos a perseguirem suas próprias paixões científicas e a verem a química como uma chave para resolver problemas globais.',
                classes: [
                    {
                        subject: 'Química',
                        cost: 50,
                    },
                ],
                availableTime: [],
            },
            {
                id: 2,
                name: 'Lucas Mendes',
                avatar: 'https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg',
                whatsapp: '',
                bio: 'Dr. Lucas Mendes é um explorador apaixonado dos mistérios da vida. Com doutorado em Biologia Molecular pela Universidade de São Paulo, ele passou anos desvendando os segredos do DNA em laboratórios de ponta. Agora, ele traz todo esse conhecimento para a sala de aula, onde transforma conceitos complexos em aventuras fascinantes. Dr. Lucas é conhecido por suas saídas de campo emocionantes, onde os alunos podem observar a vida selvagem e realizar experimentos práticos. Sua energia contagiante e seu amor pela natureza fazem com que cada aula seja uma jornada inesquecível pelo mundo vivo.',
                classes: [{ subject: 'Biologia', cost: 100 }],
                availableTime: [],
            },
            {
                id: 3,
                name: 'Rafael Oliveira',
                avatar: 'https://www.shutterstock.com/image-photo/close-headshot-portrait-smiling-young-260nw-1916406272.jpg',
                whatsapp: '',
                bio: 'O Prof. Rafael Oliveira é um mestre da matemática que acredita que os números contam histórias incríveis. Formado pela Universidade Federal do Rio de Janeiro e com mestrado em Educação Matemática, ele tem um talento especial para tornar o abstrato concreto. Com sua abordagem criativa e interativa, ele usa enigmas, jogos e projetos reais para mostrar como a matemática está presente em tudo ao nosso redor. Suas aulas são repletas de desafios estimulantes que desenvolvem o pensamento crítico e a lógica dos alunos. Com o Prof. Rafael, você vai descobrir que a matemática não é apenas números, mas uma ferramenta poderosa para entender e transformar o mundo.',
                classes: [{ subject: 'Matemática', cost: 150 }],
                availableTime: [],
            },
        ]
        setProffys(data)
    }

    const getClasses = async () => {
        // const response = await fetch('http://localhost:3333/classes');
        // const data = await response.json();
        const data: ScheduledClasses[] = [
            {
                id: 1,
                subject: 'Química',
                teacherName: 'Beatriz Santos',
                date: '14/06/2024 16:30',
                cost: 50,
                teacherId: 0,
                studentId: 0,
                studentName: 'Maicon Douglas',
            },
            {
                id: 2,
                subject: 'Biologia',
                teacherName: 'Lucas Mendes',
                date: '15/06/2024 16:00',
                cost: 50,
                teacherId: 0,
                studentId: 0,
                studentName: 'João Pedro',
            },
            {
                id: 3,
                subject: 'Matemática',
                teacherName: 'Rafael Oliveira',
                date: '14/06/2024 16:00',
                cost: 50,
                teacherId: 0,
                studentId: 0,
                studentName: 'Will Smith',
            },
        ]
        setClasses(data)
    }

    return (
        <ProffyContext.Provider
            value={{
                proffys,
                classes,
                isTeacher,
                isLogged,
            }}
        >
            {children}
        </ProffyContext.Provider>
    )
}
