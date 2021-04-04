// users.test.js
import StudentModel from '@models/student-model';
import axios from 'axios';
import { getStudents, StudentRequest } from './student-service';
import { of, Subject } from "rxjs";

jest.mock('axios');

describe('Student Service Test Cases', () => {

    const studentsResponse = [{
        _id: '39dc45fd-41fd-4a5c-ab8f-7a09e2963cf5',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '2021-04-05T14:00:00.000Z',
        country: 'country',
        skills: ['Java', '.NET'],
        checked: false
    }];

    let mockedAxios;
    let mockedGetStudentsSubject;

    beforeAll(() => {
        
        mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedGetStudentsSubject = Subject as jest.Mocked<typeof Subject>;
    });

    it('test getStudents', async () => {
        const request: StudentRequest = {
            name: 'John',
            skills: []
        };

        const response = {"data": studentsResponse};
        mockedAxios.post.mockResolvedValueOnce(response);
        await getStudents(request);
        expect(mockedAxios.post).toHaveBeenCalled();
    });
});
