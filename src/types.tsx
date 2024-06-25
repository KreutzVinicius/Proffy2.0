export type Proffy = {
    _id?: string
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
    _id?: string
    subject: string
    cost: number
    teacherId: string
    teacherName: string
    studentId: string
    studentName: string
    date: string
}
