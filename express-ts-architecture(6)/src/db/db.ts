export type CourseType = {
    id: number,
    title: string,
    studentsCount: number,
    passcode: number
}

export const db: { courses: CourseType[] } = {
    courses: [
        {id: 1, title: 'front-end', studentsCount: 10, passcode: 12345},
        {id: 2, title: 'back-end', studentsCount: 10, passcode: 12345},
        {id: 3, title: 'devops', studentsCount: 10, passcode: 12345},
        {id: 4, title: 'automation qa', studentsCount: 10, passcode: 12345}
    ]
}

export type DBType = {
    courses: CourseType[]
}