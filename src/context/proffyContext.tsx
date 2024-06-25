import React, { createContext, useEffect, useState } from 'react'
import { ScheduledClasses, Proffy } from '../types'
import dataService from '../service/dataservice'
import { get } from 'http'
interface ProffyContextData {
    user: Proffy | null
    proffys: Proffy[]
    classes: ScheduledClasses[]
    isTeacher: boolean
    isLogged: boolean
    loginHandler: (email: string, password: string) => Promise<boolean>
    createProffy: (proffy: Proffy) => void
    updateProffy: (proffy: Proffy) => void
}

const proffyInitialValues: ProffyContextData = {
    user: null,
    proffys: [],
    classes: [],
    isTeacher: false,
    isLogged: false,
    loginHandler: async () => false,
    createProffy: () => {},
    updateProffy: () => {},
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
        if (response._id) {
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

    const getClasses = async () => {
        const response = await dataService.get('class')
        console.log(`🚀 ~ getClasses ~ response:`, response)
        if (response?.status === 200) {
            const classes = response.data.filter(
                (scheduledClass: ScheduledClasses) =>
                    isTeacher
                        ? scheduledClass.teacherId === user?._id
                        : scheduledClass.studentId === user?._id
            )
            setClasses(classes)
        }
    }

    return (
        <ProffyContext.Provider
            value={{
                user,
                proffys,
                classes,
                isTeacher,
                isLogged,
                loginHandler,
                createProffy,
                updateProffy,
            }}
        >
            {children}
        </ProffyContext.Provider>
    )
}
