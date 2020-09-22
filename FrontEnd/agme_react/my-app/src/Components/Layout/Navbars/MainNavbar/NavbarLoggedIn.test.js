import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavbarLoggedIn from './NavbarLoggedIn';
import { findByTestAtrr } from './../../../../../Utils';

Enzyme.configure({ adapter: new Adapter()});

// function to return shallow render
const setUp = (props={}) => {
    const component = shallow(<NavbarLoggedIn {...props} />);
    return component;
};

describe('logged in MainNavbar', () => {

    // beforeEach runs before every single test
    let component;
    beforeEach(() => {
        component = setUp();
    })

    it('should find logged in account class', () => {
        const wrapper = findByTestAtrr(component, 'logged-in-account-component');
        expect(wrapper.length).toBe(1);
    });

    it('should render dropdown content', () => {
        const wrapper = findByTestAtrr(component, 'dropdown-content');
        expect(wrapper.length).toBe(1);
    });
})