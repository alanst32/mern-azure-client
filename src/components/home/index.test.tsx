import React, { useState } from "react";
import {shallow} from 'enzyme';
import Home from ".";

describe('Home', () => {
    let wrapper;
    const setState = jest.fn();
 
    beforeEach(() => {
        wrapper = shallow(<Home></Home>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Render Home properly', () => {
        expect(wrapper).toMatchSnapshot();
    });
})