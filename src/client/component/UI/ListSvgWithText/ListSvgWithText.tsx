import React from 'react';
import classes from './ListSvgWithText.module.scss';
import iconsHref from "./../../../static/icons/ICONS.svg";
       
export type ListSvgWithTextItem = {
    title: string,
    xlinkHref: string,
    href?: string,
}

interface ListSvgWithTextProps  {
    title: string,
    items: ListSvgWithTextItem[]
}

const listSvgWithText = ({title, items}: ListSvgWithTextProps) => {

    console.log("render ListSvgWithText");

    const icons = items.map((value, index) => {

        let title = null;

        if(value.href){

           title = (

               <a href={value.href}>
                   {value.title}
               </a>

           );

        }else{

            title = (

                <p >
                    {value.title}
                </p>

            );

        }

        return (

            <li key={classes.Item + index} className={classes.Item}>
                <svg className={classes.Svg} width={"10"} height={"10"} viewBox={"0 0 1024 1024"}>
                    <use xlinkHref={iconsHref + value.xlinkHref} />
                </svg>
                { title }
            </li>

        )


    });


    return (
        
        <div className={classes.ListSvgWithText}>

            <h3 className={classes.Title}>{ title }</h3>

            <ul className={classes.List}>

                { icons }

            </ul>

        </div>
            
    );
};

export default listSvgWithText;
        