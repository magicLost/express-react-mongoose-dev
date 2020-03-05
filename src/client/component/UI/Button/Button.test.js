
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import Button from "./Button";


//label, type, disabled, onClick, isLoading = false, style = {}, index = 0
describe("Button", () => {

    let _render = null;
    const onClick = jest.fn();
    
    describe("Render and props test", () => {
    
    
        describe("Init props", () => {
    
            test("Render button with label Hello", () => {
            
                _render = render(<Button
                    label={"Hello"}
                    type={"CONTAINED"}
                    disabled={false}
                    onClick={onClick}
                    isLoading={false}
                />);

                const button = _render.getByText("Hello").parentElement;

                fireEvent.click(button);

                expect(onClick).toHaveBeenCalledTimes(1);
                expect(button.disabled).toEqual(false);
            
            });
    
        });

        describe("Changed props", () => {
    
            test("Render button with label Hello", () => {
            
                _render = render(<Button
                    label={"Hello"}
                    type={"CONTAINED"}
                    disabled={true}
                    onClick={onClick}
                    isLoading={true}
                />);

                const button = _render.getByText("...Подождите").parentElement;

                expect(button.disabled).toEqual(true);
            
            });
    
        });
    
    
    });

});

        