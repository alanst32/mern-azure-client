

export default interface StudentModel {
    _id?: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    country: string,
    skills: string[],
    checked?: boolean
}