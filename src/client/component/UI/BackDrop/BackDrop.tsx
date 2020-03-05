import React from 'react';
import classes from './BackDrop.module.scss';

interface BackDropProps  {
    show: boolean;
    backdropClickHandler: (event: any) => void | undefined;
}

const backDrop = ({show, backdropClickHandler}: BackDropProps) => (

    show ? (<div className={classes.BackDrop} onClick={backdropClickHandler}></div>) : null

);

export default backDrop; 
        