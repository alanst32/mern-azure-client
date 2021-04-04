import React, { useState } from "react";
import {shallow} from 'enzyme';
import StudentForm from '.';
import setupMockStates from 'jest-react-hooks-mock';

describe('StudentForm', () => {
    let wrapper;
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];

    beforeEach(() => {
        wrapper = shallow(<StudentForm totalStudents={5}></StudentForm>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Render StudentForm properly', () => {
        expect(wrapper).toMatchSnapshot();
    });
})