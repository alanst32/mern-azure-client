import React, { useState } from "react";
import {shallow} from 'enzyme';
import StudentTable from '.';
import setupMockStates from 'jest-react-hooks-mock';

describe('StudentTable', () => {
    let wrapper;
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    const studentsSnaphot = [{
        _id: '_id',
        firstName: 'firstName',
        lastName: 'lastName',
        dateOfBirth: 'dateOfBirth',
        country: 'country',
        skills: [],
        checked: false
    }];

    beforeEach(() => {
        wrapper = shallow(<StudentTable students={studentsSnaphot}></StudentTable>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Render StudentTable properly', () => {
        expect(wrapper).toMatchSnapshot();
    });
})