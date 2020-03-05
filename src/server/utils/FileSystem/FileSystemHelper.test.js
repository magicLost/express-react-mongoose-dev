import FileSystemHelper from "./FileSystemHelper";
const fs = require("fs");


describe("FileSystemHelper", () => {

    let fsHelper = null;

    beforeEach(() => {
        fsHelper = new FileSystemHelper();
    });

    describe("write and read file", () => {

        const pathToFile = `${__dirname}/test.txt`;

        afterAll(async () => {
            if (fs.existsSync(pathToFile)){
                await fsHelper.deleteDir(pathToFile);
            }
        })

        test("write to file and read it", async () => {

            const data = "Some data";

            await fsHelper.writeFile(pathToFile, data);

            const our_data = await fsHelper.readFile(pathToFile);

            expect(our_data).toEqual(data);

        })

        test("How we catch error if in async mode, if dir does not exists", async () => {

            const path = `${__dirname}/hello/test.txt`;

            try{
                fsHelper.readFile(path, true);
            }catch(e){
                console.log(`[CATCH ERROR] ${e.message}`);
            }

            expect("hello").toEqual("hello");

        })

    });

    describe("makeDir", () => {

        const pathToDir = `${__dirname}/Hello`;

        beforeEach(async () => {
            if (fs.existsSync(pathToDir)){
                await fsHelper.deleteDir(pathToDir);
            }
        }) 

        afterAll(async () => {
            if (fs.existsSync(pathToDir)){
                await fsHelper.deleteDir(pathToDir);
            }
        })

        /* IT MAKE GET ERROR IF IT CREATE DIR FASTER THEN IT CHECK */
        /* test("Async", () => {
        
            fsHelper.makeDir(pathToDir);
    
            expect(fs.existsSync(pathToDir)).toEqual(false); 
        });  */

        test("Async", done => {
        
            fsHelper.makeDir(pathToDir).then(() => {
                expect(fs.existsSync(pathToDir)).toEqual(true); 
                done();
            })
    
        });
    
        test("Sync", async () => {
            
            await fsHelper.makeDir(pathToDir);
    
            expect(fs.existsSync(pathToDir)).toEqual(true); 
        });  
    })

})