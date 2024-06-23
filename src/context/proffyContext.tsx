import React, { createContext, useEffect, useState } from 'react'
import { ScheduledClasses, Proffy } from '../types'
import dataService from '../service/dataservice'
interface ProffyContextData {
    proffys: Proffy[]
    classes: ScheduledClasses[]
    isTeacher: boolean
    isLogged: boolean
    loginHandler: (email: string, password: string) => Promise<boolean>
    createProffy: (proffy: Proffy) => void
}

const proffyInitialValues: ProffyContextData = {
    proffys: [],
    classes: [],
    isTeacher: false,
    isLogged: false,
    loginHandler: async () => false,
    createProffy: () => {},
}

export const ProffyContext =
    createContext<ProffyContextData>(proffyInitialValues)

export const ProffyProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<Proffy | null>(null)
    const [proffys, setProffys] = useState<Proffy[]>([])
    const [classes, setClasses] = useState<ScheduledClasses[]>([])
    const [isTeacher, setIsTeacher] = useState<boolean>(false)

    const [isLogged, setIsLogged] = useState<boolean>(false)

    useEffect(() => {
        if (proffys.length === 0) {
            getProfessors()
        }
    }, [proffys])

    useEffect(() => {
        if (classes.length === 0) {
            getClasses()
        }
    }, [classes])

    const createProffy = async (proffy: Proffy) => {
        const response = await dataService.create('user', proffy)
        console.log(`🚀 ~ createProffy ~ response:`, response)
    }

    const loginHandler = async (email: string, password: string) => {
        const response = await dataService.login(email, password)
        console.log(`🚀 ~ loginHandler ~ response:`, response)
        if (response) {
            setIsLogged(response)
            setUser(response.data)
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
        if (response?.status === 200) {
            const professors = response.data.filter(
                (user: Proffy) => user.type === 'professor'
            )
            setProffys(professors)
        }
    }

    const getClasses = async () => {
        const response = await dataService.get('class')
        console.log(`🚀 ~ getClasses ~ response:`, response)
        if (response?.status === 200) {
            const classes = response.data.filter(
                (scheduledClass: ScheduledClasses) =>
                    isTeacher
                        ? scheduledClass.teacherId === user?.id
                        : scheduledClass.studentId === user?.id
            )
            setClasses(classes)
        }
    }

    return (
        <ProffyContext.Provider
            value={{
                proffys,
                classes,
                isTeacher,
                isLogged,
                loginHandler,
                createProffy,
            }}
        >
            {children}
        </ProffyContext.Provider>
    )
}
