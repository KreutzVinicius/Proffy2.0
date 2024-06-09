export type Proffy = {
    id: number
    name: string
    avatar: string
    whatsapp: string
    bio: string
    subject: string
    cost: number
    schedule: Array<{
        week_day: number
        from: string
        to: string
    }>
}
