
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import PhotoSliderPage from "./PhotoSliderPage";
import classes from './PhotoSliderPage.module.scss';
describe("PhotoSliderPage", () => {
    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<PhotoSliderPage />);
        
        });
        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });
});
        