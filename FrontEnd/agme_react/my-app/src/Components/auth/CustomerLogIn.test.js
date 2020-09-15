import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerLogIn from './CustomerLogIn';
import { findByTestAtrr } from './../../../Utils';

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<CustomerLogIn {...props} />);
    return component;
};

describe('CustomerLogIn', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    // testing class renders
    it('should find card class', () => {
        const wrapper = findByTestAtrr(component, 'card');
        expect(wrapper.length).toBe(1);
    });

    // testing header renders
    it('should render the header', () => {
        const header = findByTestAtrr(component, 'header');
        expect(header.length).toBe(1);
    });
})