import React from 'react';
import classes from './ErrorBoundary.module.scss';
import Button from '../UI/Button/Button';
        
/* interface ErrorBoundaryProps  {
    
} */

class ErrorBoundary extends React.Component {

    state: {hasError: boolean} = {hasError: false};
  
    static getDerivedStateFromError(error: Error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: any) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
            <div className={classes.ErrorBoundary}>
                <h4>Сервер не отвечает...</h4>
                <ul>
                    <li>Проверьте интернет соединение.</li>
                    <li>
                      Попробуйте 
                      <Button 
                        label={"еще раз."} 
                        type={"CONTAINED"}
                        onClick={() => this.setState({hasError: false})}
                        ariaLabel={"Перезагрузить страницу."}
                      />
                    </li>
                    <li>Попробуйте перезагрузить страницу.</li>
                </ul>
            </div>
        );
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;
        