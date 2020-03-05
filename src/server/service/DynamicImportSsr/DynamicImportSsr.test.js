import DynamicImportSsr, {mtest} from "./DynamicImportSsr";
import FileSystemHelper from "../../utils/FileSystem/FileSystemHelper";
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import {routes} from "../../../routes/routes";
import path from 'path';

/* MOCK IMPORTS */
jest.mock("../../utils/FileSystem/FileSystemHelper");

jest.mock('@loadable/server', () => ({
    __esModule: true, // this property makes it work
    default: null,
    ChunkExtractor: jest
                    .fn()
                    .mockImplementation(() => {
                        return {
                            getScriptTags: jest.fn().mockReturnValue("scriptTags"),
                            getStyleTags: jest.fn().mockReturnValue("styleTags"),
                        }
                    }),
  }));

FileSystemHelper.mockImplementation(
    () => { 
        return { 
            readFile: jest.fn(() => {
                return new Promise((resolve, reject) => {
                    resolve("!!!meta-description-content!!! !!!title!!! !!!css!!! !!!js!!! !!!content!!!");
                })
            })
    } 
});

describe("DynamicImportSsr", () => {

    /* let fs = {
        readFile: jest.fn(() => {
            return new Promise((resolve, reject) => {
                resolve("!!!meta-description-content!!! !!!title!!! !!!css!!! !!!js!!! !!!content!!!");
            })
        })
    }; */

    const fs = new FileSystemHelper();

    let diSsr = null;


    beforeEach(() => {

        //fs.mockClear();

        diSsr = new DynamicImportSsr(
            null,
            routes,
            fs,
            path.join(__dirname, "..", "..", "..", "dist", "client", "loadable-stats.json"),
            path.join(__dirname, "..", "..", "..", "config", "htmlTemplates", "base.di.template.html"),
            __dirname
        );

        diSsr.renderRootElement = jest.fn().mockReturnValue("html");
    })

    describe("renderHtmlPage - it return html page with render content and links", () => {

        test("It get base.di.template and fill with values", async () => {

            const page = await diSsr.renderHtmlPage(routes.get("/"));

            //create ChunkExtractor instance with option path to webpack stat file
            expect(ChunkExtractor).toHaveBeenNthCalledWith(1, { statsFile: path.join(__dirname, "..", "..", "..", "dist", "client", "loadable-stats.json") });

            //call to extractor to getScriptTags and getScriptTags 
            expect(diSsr.extractor.getScriptTags).toHaveBeenCalledTimes(1);
            expect(diSsr.extractor.getStyleTags).toHaveBeenCalledTimes(1);

            //read file with base di html template
            expect(diSsr.fs.readFile).toHaveBeenNthCalledWith(1, path.join(__dirname, "..", "..", "..", "config", "htmlTemplates", "base.di.template.html"));

            //return base template with replaced marks
            expect(page).toEqual("photos, others Super puper homepage styleTags scriptTags html");

            //const hello = await diSsr.fs.readFile("dirname");

            //expect(hello).toEqual("Hello");
            //expect(fs.readFile).toHaveBeenNthCalledWith(1, "dirname");

        })

    })

    describe("renderRootElement - it return react to string result", () => {



    })

}); 

