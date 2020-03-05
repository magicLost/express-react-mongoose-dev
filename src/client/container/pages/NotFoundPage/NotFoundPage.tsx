import React from 'react';
import classes from './NotFoundPage.module.scss';
import Anchor from '../../../component/UI/Anchor/Anchor';
//import { hostName } from '../../../data/main_data';
        
interface NotFoundPageProps  {
}

const NotFoundPage = ({}: NotFoundPageProps) => {
    return (
        
        <div className={classes.NotFoundPage}>

            <h4>Страница не найдена...</h4>

            <p>К сожалению, страницы по такому адресу не существует.</p>

            <p>
                <Anchor
                    href={"/"}
                    label={"Вернуться на главную страницу."}
                    type={"OUTLINED"}
                    ariaLabel={"Вернуться на главную страницу."}
                />
            </p>
        </div>
            
    );
};

export default NotFoundPage;
        