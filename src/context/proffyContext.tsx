import React, { createContext, useEffect, useState } from 'react'
import { Proffy } from '../types'
import dataService from '../service/dataservice'
interface ProffyContextData {
    user: Proffy | null
    proffys: Proffy[]
    isTeacher: boolean
    isLogged: boolean
    searchProffys: Proffy[]
    loginHandler: (email: string, password: string) => Promise<boolean>
    createProffy: (proffy: Proffy) => void
    updateProffy: (proffy: Proffy) => void
    filterProffys: (subject?: string, weekday?: string) => void
    resetFilter: () => void
}

const proffyInitialValues: ProffyContextData = {
    user: null,
    proffys: [],
    isTeacher: false,
    isLogged: false,
    searchProffys: [],
    loginHandler: async () => false,
    createProffy: () => {},
    updateProffy: () => {},
    filterProffys: () => [],
    resetFilter: () => {},
}

export const ProffyContext =
    createContext<ProffyContextData>(proffyInitialValues)

export const ProffyProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<Proffy | null>(null)
    const [proffys, setProffys] = useState<Proffy[]>([])
    const [searchProffys, setSearchProffys] = useState<any>([])
    const [isTeacher, setIsTeacher] = useState<boolean>(false)

    const [isLogged, setIsLogged] = useState<boolean>(false)

    useEffect(() => {
        setSearchProffys(proffys)
    }, [proffys])

    useEffect(() => {
        if (proffys.length === 0) {
            getProfessors()
        }
    }, [proffys])

    useEffect(() => {
        if (user) {
            setIsTeacher(user.type === 'professor')
            setIsLogged(true)
        }
    }, [user])

    const getProffy = async (id: string) => {
        console.log(`🚀 ~ getProffy ~ id:`, id)
        const response = await dataService.getById('user', id)
        console.log(`🚀 ~ getProffy ~ response:`, response)
        if (response) {
            console.log(`🚀 ~ getProffy ~ response:`, response)
            setUser(response)
        }
    }

    const createProffy = async (proffy: Proffy) => {
        const response = await dataService.create('user', proffy)
        console.log(`🚀 ~ createProffy ~ response:`, response)
    }

    const updateProffy = async (proffy: Proffy) => {
        await dataService.update('user', proffy._id, proffy).then(() => {
            getProffy(proffy?._id ?? '')
        })
    }

    const loginHandler = async (email: string, password: string) => {
        const response = await dataService.login(email, password)
        console.log(`🚀 ~ loginHandler ~ response:`, response)
        if (response) {
            setIsLogged(true)
            setUser(response)
            return true
        } else {
            setIsLogged(false)
            console.log('Login failed')
            return false
        }
    }

    const getProfessors = async () => {
        const response = await dataService.get('user')
        console.log(`🚀 ~ getProfessors ~ response:`, response)
        if (response) {
            const professors = response.filter(
                (user: Proffy) => user.type === 'professor'
            )
            console.log(`🚀 ~ getProfessors ~ professors:`, professors)
            setProffys(professors)
        }
    }

    const filterProffys = (subject?: string, weekday?: string) => {
        console.log(`🚀 ~ filterProffys ~ filterProffys:`, subject, weekday)

        const filteredProffys = proffys
            .map((proffy) => {
                let filteredClasses = proffy.classes || []
                let filteredAvailableTime = proffy.availableTime || []

                // Filtrando as aulas pelo assunto se `subject` for fornecido
                if (subject) {
                    filteredClasses = filteredClasses.filter(
                        (cls) => cls.subject === subject
                    )
                }

                // Filtrando os horários pelo dia da semana se `weekday` for fornecido
                if (weekday) {
                    filteredAvailableTime = filteredAvailableTime.filter(
                        (time) => time.week_day === weekday
                    )
                }

                // Se não há nenhuma aula ou horário disponível após o filtro, retornar null para remover este proffy
                if (
                    filteredClasses.length === 0 &&
                    filteredAvailableTime.length === 0
                ) {
                    return null
                }

                return {
                    ...proffy,
                    classes: filteredClasses,
                    availableTime: filteredAvailableTime,
                }
            })
            .filter((proffy) => proffy !== null) // Remove os `proffys` que são `null`

        console.log(`🚀 ~ filterProffys ~ filteredProffys:`, filteredProffys)
        setSearchProffys(filteredProffys)
    }

    const resetFilter = () => {
        setProffys([])
    }

    return (
        <ProffyContext.Provider
            value={{
                user,
                proffys,
                isTeacher,
                isLogged,
                searchProffys,
                loginHandler,
                createProffy,
                updateProffy,
                filterProffys,
                resetFilter,
            }}
        >
            {children}
        </ProffyContext.Provider>
    )
}
