export type Proffy = {
    id: number
    name: string
    email?: string
    password?: string
    avatar?: string
    whatsapp: string
    bio?: string
    classes?: Classes[]
    availableTime?: AvailableTime[]
    type: `student` | `professor` | ''
}

export type Classes = {
    subject: string
    cost: number
}

export type AvailableTime = {
    week_day: string
    from: string
    to: string
}

export type ScheduledClasses = {
    id: number
    subject: string
    cost: number
    teacherId: number
    teacherName: string
    studentId: number
    studentName: string
    date: string
}
