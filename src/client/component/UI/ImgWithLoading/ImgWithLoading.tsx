import React, {useState, useEffect, useRef} from 'react';
import classes from './ImgWithLoading.module.scss';
import Image, {SrcSet, ImageProps} from "../Image/Image";
import Spinner from '../Spinner/Spinner';


const ImgWithLoading = ({alt, isActive, src, onImageClick, index = 0, srcSets = []}: ImageProps) => {

    const [isLoad, setIsLoad] = useState(true);
    const [error, setError] = useState("");

    const init = useRef(false);

    if(init.current === false){
        //check if DOM elements already exists(if we use SSR)

        //const imageRef : HTMLImageElement | null = document.querySelector(`div.${classes.ImgWithLoading} img`);
        //if(imageRef && index )
        //imageRef.getAttribute
        //console.log("imageRef", imageRef);

        init.current = true;
    }

    //let image = null;
    //let spinner = null;

    const onLoad = () => {

        console.log("Load Image");
        setIsLoad(false);

    };

    const onError = () => {

        console.log("Error Image");

        /* TODO: WHEN WE USE BLANK SRC WE TRIGGER ERROR EVENT AND WE DO NOT HAVE MECANIZM TO DELETE THIS ERROR WHEN WE USE NORMAL SRC */

        setError("Упс! Фотка не хочет загружаться... Попробуйте перезагрузить страницу.");

    };

    const getSpinner = () => {

        return (
            <div className={classes.Spinner}>
                <Spinner />
            </div>
        )

    };

    const getImage = () => {
        const imageClass = isLoad ? classes.Hidden : undefined;

        return (
            <div className={imageClass}>
                <Image 
                    alt={alt}
                    isActive={isActive}
                    src={src}
                    srcSets={srcSets}
                    onImageClick={onImageClick}
                    onError={onError}
                    onLoad={onLoad}
                    index={index}
                />
            </div>
        );
    }

    /* RENDER */

    const image = getImage();

    const spinner = isLoad && isActive ? getSpinner() : null;
    const errorElement = error ? <div className={classes.Error}><p>{error}</p></div> : null;

    console.log("[Render ImgWithLoading]", isLoad, error);

    return (
        
        <div className={classes.ImgWithLoading}>

            { image }
            { spinner }
            { errorElement }

        </div>
            
    );
};

export default ImgWithLoading;
        