import React from 'react';
import classes from './ListSvg.module.scss';
import iconsHref from "./../../../static/icons/ICONS.svg";
      
export type ListSvgType = "SOCIAL" | "CLIENTS";

export type ListSvgItem = {
    xlinkHref: string;
    href?: string;
};

interface ListSvgProps  {
    title: string;
    items: ListSvgItem[];
    typeSvg: ListSvgType
}

const ListSvg = ({title, items, typeSvg}: ListSvgProps) => {

    let svgClass = '';

    switch(typeSvg){
        case "SOCIAL": svgClass = classes["Svg--Social"];break;
        case "CLIENTS": svgClass = classes["Svg--Clients"];break;
        default: throw new Error("Unknown svg type == " + typeSvg);
    }

    const icons = items.map((value, index) => {

        if(value.href){

            return (
                <li key={classes.Item + index}>
                    <a href={value.href} className={classes.Item} >
                        <svg className={svgClass} width={"10"} height={"10"} >
                            <use xlinkHref={iconsHref + value.xlinkHref} />
                        </svg>
                    </a>
                </li>
            );

        }else{

            return (
                <li key={classes.Item + index}>
                    <div className={classes.Item} >
                        <svg className={svgClass} width={"10"} height={"10"} >
                            <use xlinkHref={iconsHref + value.xlinkHref} />
                        </svg>
                    </div>
                </li>
            );
        }
    });

    return (
        
        <div className={classes.ListSvg}>

            <h3 className={classes.Title}>{ title }</h3>

            <ul className={classes.List}>

                { icons }

            </ul>

        </div>
            
    );
};

export default ListSvg;
        