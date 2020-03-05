"use strict";
exports.__esModule = true;
var fs = require('fs');
var args = process.argv.slice(2);
//npm run create:func -- Render component/Render
var CreateReactFuncTS = /** @class */ (function () {
    function CreateReactFuncTS(funcName, dir) {
        this.mainDir = './client/src/';
        this.funcName = '';
        this.funcFileName = '';
        this.dir = '';
        if (funcName && dir) {
            var funcFirstLetter = funcName[0];
            var funcOtherLetters = funcName.substr(1);
            //this.funcName = funcFirstLetter.toLowerCase() + funcOtherLetters;
            this.funcName = funcFirstLetter.toUpperCase() + funcOtherLetters;
            this.funcFileName = funcFirstLetter.toUpperCase() + funcOtherLetters;
            //TODO check if first char in dir equal "/"
            //TODO check if last char in dir equal "/"
            this.dir = this.mainDir + dir;
        }
        else {
            throw new Error("Empty funcName or dir...");
        }
    }
    CreateReactFuncTS.prototype.create = function () {
        //create class name dir
        this.createDir();
        //create class file
        this.createClassFile();
        //create scss file
        this.createScssFile();
        //create .test file
        this.createTestFile();
    };
    ;
    CreateReactFuncTS.prototype.createDir = function () {
        if (!fs.existsSync(this.dir)) {
            fs.mkdirSync(this.dir);
        }
    };
    ;
    CreateReactFuncTS.prototype.createClassFile = function () {
        var content = "import React from 'react';\nimport classes from './" + this.funcFileName + ".module.scss';\n        \ninterface " + this.funcFileName + "Props  {\n    \n}\nconst " + this.funcName + " = ({}: " + this.funcFileName + "Props) => {\n    return (\n        \n        <div className={classes." + this.funcFileName + "}></div>\n            \n    );\n};\nexport default " + this.funcName + ";\n        ";
        var fileName = this.dir + '/' + this.funcFileName + '.tsx';
        //console.log(fileName);
        //console.log(content);
        fs.writeFile(fileName, content, function (error) {
            if (error)
                throw error; // если возникла ошибка
            console.log("Асинхронная запись main файла завершена. Содержимое файла:");
        });
    };
    ;
    CreateReactFuncTS.prototype.createScssFile = function () {
        var content = "." + this.funcFileName + "{\n            \n}";
        var fileName = this.dir + '/' + this.funcFileName + '.module.scss';
        //console.log(fileName);
        //console.log(content);
        fs.writeFile(fileName, content, function (error) {
            if (error)
                throw error; // если возникла ошибка
            console.log("Асинхронная запись css файла завершена. Содержимое файла:");
        });
    };
    ;
    CreateReactFuncTS.prototype.createTestFile = function () {
        var content = "\nimport React from 'react';\nimport {\n    render,\n    fireEvent,\n    cleanup,\n    waitForElement,\n    } from '@testing-library/react';\nimport { configure } from '@testing-library/dom';\nimport '@testing-library/jest-dom/extend-expect';\nimport " + this.funcFileName + " from \"./" + this.funcFileName + "\";\nimport classes from './" + this.funcFileName + ".module.scss';\ndescribe(\"" + this.funcFileName + "\", () => {\n    let _render = null;\n    \n    describe(\"Render and props test\", () => {\n    \n        beforeEach(() => {\n        \n            _render = render(<" + this.funcFileName + " />);\n        \n        });\n        afterEach(cleanup)\n    \n        describe(\"\", () => {\n    \n            test(\"\", () => {\n            \n                \n            \n            });\n    \n        });\n    \n    });\n});\n        ";
        var fileName = this.dir + '/' + this.funcFileName + '.test.js';
        //console.log(fileName);
        //console.log(content);
        fs.writeFile(fileName, content, function (error) {
            if (error)
                throw error; // если возникла ошибка
            console.log("Асинхронная запись тестогого файла завершена.");
        });
    };
    ;
    return CreateReactFuncTS;
}());
var creater = new CreateReactFuncTS(args[0], args[1]);
creater.create();
exports["default"] = CreateReactFuncTS;
