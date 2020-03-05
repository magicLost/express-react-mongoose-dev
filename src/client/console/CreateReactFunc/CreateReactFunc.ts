const fs = require('fs');

const args: string[] = process.argv.slice(2);

//npm run create:func -- Render component/Render
class CreateReactFuncTS
{

    mainDir: string = './client/src/';
    funcName: string = '';
    funcFileName: string = '';
    dir: string = '';


    constructor(funcName: string, dir: string){

        if ( funcName && dir ) {

            let funcFirstLetter = funcName[0];
            let funcOtherLetters = funcName.substr(1);

            //this.funcName = funcFirstLetter.toLowerCase() + funcOtherLetters;
            this.funcName = funcFirstLetter.toUpperCase() + funcOtherLetters;
            this.funcFileName = funcFirstLetter.toUpperCase() + funcOtherLetters;


            //TODO check if first char in dir equal "/"
            //TODO check if last char in dir equal "/"
            this.dir = this.mainDir + dir;

        }else{

            throw new Error("Empty funcName or dir...");

        }

    }

    create(): void{

        //create class name dir
        this.createDir();
        //create class file
        this.createClassFile();
        //create scss file
        this.createScssFile();
        //create .test file
        this.createTestFile();

    };

    createDir(): void{

        if (!fs.existsSync(this.dir)){
            fs.mkdirSync(this.dir);
        }

    };

    createClassFile(): void{

        const content = `import React from 'react';
import classes from './${this.funcFileName}.module.scss';
        
interface ${this.funcFileName}Props  {
    
}
const ${this.funcName} = ({}: ${this.funcFileName}Props) => {
    return (
        
        <div className={classes.${this.funcFileName}}></div>
            
    );
};
export default ${this.funcName};
        `;

        const fileName = this.dir + '/' + this.funcFileName + '.tsx';

        //console.log(fileName);
        //console.log(content);

        fs.writeFile(fileName, content, (error: any) => {

            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись main файла завершена. Содержимое файла:");

        });

    };

    createScssFile(): void{

        const content = `.${this.funcFileName}{
            
}`;

        const fileName = this.dir + '/' + this.funcFileName + '.module.scss';

        //console.log(fileName);
        //console.log(content);

        fs.writeFile(fileName, content, (error: any) => {

            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись css файла завершена. Содержимое файла:");

        });

    };

    createTestFile(): void{

        const content = `
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import ${this.funcFileName} from "./${this.funcFileName}";
import classes from './${this.funcFileName}.module.scss';
describe("${this.funcFileName}", () => {
    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<${this.funcFileName} />);
        
        });
        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });
});
        `;

        const fileName = this.dir + '/' + this.funcFileName + '.test.js';

        //console.log(fileName);
        //console.log(content);

        fs.writeFile(fileName, content, (error: any) => {

            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись тестогого файла завершена.");

        });

    };


}

const creater = new CreateReactFuncTS(args[0], args[1]);
creater.create();

export default CreateReactFuncTS;