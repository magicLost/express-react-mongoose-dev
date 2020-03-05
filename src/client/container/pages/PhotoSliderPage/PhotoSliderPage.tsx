import React from 'react';
import classes from './PhotoSliderPage.module.scss';
import Anchor from '../../../component/UI/Anchor/Anchor';
        
interface PhotoSliderPageProps  {
    
}
const PhotoSliderPage = ({}: PhotoSliderPageProps) => {
    return (
        
        <div className={classes.PhotoSliderPage}>

            <h3>This is Photos page.</h3>

            <Anchor ariaLabel={"На главную страницу."} label={"Домой."} href={"/"} type={"CONTAINED"}/>

        </div>
            
    );
};
export default PhotoSliderPage;
        