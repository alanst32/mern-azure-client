import { RestoreTwoTone } from "@material-ui/icons";
import StudentModel from "@models/student-model";
import axios, { AxiosResponse } from "axios";
import { Subject } from "rxjs";

export interface StudentRequest {
    name: string,
    skills: string[]
}

// AXIOS
const baseUrl = 'http://localhost:3000';
const headers = { 
    'Content-Type': 'application/json',
    mode: 'cors',
    credentials: 'include'
};

const axiosClient = axios;
axiosClient.defaults.baseURL = baseUrl;
axiosClient.defaults.headers = headers;

// GET Clients
const getStudentsSubject = new Subject<StudentModel[]>();
const getStudentsObservable = () => getStudentsSubject.asObservable();

const getStudents = async (body: StudentRequest) => {
    axiosClient.post<StudentModel[]>(
        '/student/list', 
        body
    )
    .then((res) => {
        console.log(`res.data: ${JSON.stringify(res)}`);
        res.data.forEach((res) => res.dateOfBirth = formatDate(res.dateOfBirth));
        getStudentsSubject.next(res.data);
    })
    .catch(ex => console.error(ex));
}

function formatDate(dob: string): string {
    const obj = new Date(dob);
    const aux = (obj.getMonth()+1);
    const month =  (aux < 10) ? `0${aux}` : aux;
    return `${obj.getDate()}/${month}/${obj.getFullYear()}`;
}

// INSERT STUDENT
const insertStudents = async (body: StudentModel) => {
    axiosClient.post(
        '/student',
        body
    )
    .catch(ex => console.error(ex));
}

const updateStudent = async (body: StudentModel) => {
    axiosClient.put(
        '/student',
        body
    )
    .catch(ex => console.error(ex));
}

const deleteStudents = async (ids: string[]) => {
    axiosClient.post(
        '/student/inactive',
        {ids}
    )
    .then((res) => {
        return;
    })
    .catch(ex => console.error(ex));
}

export {
    getStudents,
    getStudentsObservable,
    insertStudents,
    updateStudent,
    deleteStudents
}