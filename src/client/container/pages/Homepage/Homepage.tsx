import React from 'react';
import classes from './Homepage.module.scss';
import Anchor from '../../../component/UI/Anchor/Anchor';
        
interface HomepageProps  {
    
}
const Homepage = ({}: HomepageProps) => {
    return (
        
        <div className={classes.Homepage}>

            <h3>This is Homepage.</h3>

            <Anchor ariaLabel={"Посмотреть фотки."} label={"Посмотреть фотки."} href={"/photos"} type={"CONTAINED"}/>

            <br />
            <br />

            <Anchor ariaLabel={"Test not found page."} label={"Not found page."} href={"/no"} type={"OUTLINED"}/>

        </div>
            
    );
};
export default Homepage;
        