
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import BackDrop from "./BackDrop";

configure({adapter: new Adapter()});

describe("BackDrop", () => {

    let wrapper = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<BackDrop />);
        
        });
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

        