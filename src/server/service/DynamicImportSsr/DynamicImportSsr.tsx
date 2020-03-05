import { IRoute } from "../../../routes/routes";
import FileSystemHelper, {IFileSystemHelper} from "../../utils/FileSystem/FileSystemHelper";
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import path from "path";
import App from "./../../../client/App";


class DynamicImportSsr {

    routes: Map<string, IRoute>;

    extractor: any;

    app: JSX.Element;

    fs: IFileSystemHelper;

    pathToWebpackStatsFile: string;

    pathToHtmlPageTemplate: string;

    pathToRenderedPages: string;


    constructor(
        app: JSX.Element,
        routes: Map<string, IRoute>,
        fs: IFileSystemHelper,
        pathToWebpackStatsFile: string,
        pathToHtmlPageTemplate: string,
        pathToRenderedPages: string
      ) {
        this.app = app;
        this.routes = routes;
        this.fs = fs;

        console.log("CREATE DynamicImportSsr");
    
        //this.extractor = new ChunkExtractor({ statsFile });

        this.pathToHtmlPageTemplate = pathToHtmlPageTemplate;
        this.pathToRenderedPages = pathToRenderedPages;
        this.pathToWebpackStatsFile = pathToWebpackStatsFile;
    }

    renderHtmlPage = async (
      route: IRoute,
      metaContentMark: string = "!!!meta-description-content!!!",
      titleMark: string = "!!!title!!!",
      cssMark: string = "!!!css!!!",
      jsMark: string = "!!!js!!!",
      contentMark: string = "!!!content!!!"
    ): Promise<string> => {

        //const statsFile = path.resolve(this.pathToWebpackStatsFile);
        if(!this.fs.isFileExists(this.pathToWebpackStatsFile))
          throw new Error(`No webpack stats file by address - ${this.pathToWebpackStatsFile}`);

        this.extractor = new ChunkExtractor({ statsFile: this.pathToWebpackStatsFile });   

        //get js without main js
        const pageJsTags = this.extractor.getScriptTags();
        
        //get css without main css
        const pageCssLinkTags = this.extractor.getStyleTags();
    
        let finalTemplate = "";

        //console.log("HELLLLL");

        if(!this.fs.isFileExists(this.pathToHtmlPageTemplate))
          throw new Error(`No base html file by address - ${this.pathToHtmlPageTemplate}`);

        const baseTemplate: string = await this.fs.readFile(this.pathToHtmlPageTemplate);

        const content = this.renderRootElement(route.path);

        finalTemplate = baseTemplate.replace(metaContentMark, route.metaDescriptionContent);

        finalTemplate = finalTemplate.replace(titleMark, route.title);

        finalTemplate = finalTemplate.replace(jsMark, pageJsTags);

        finalTemplate = finalTemplate.replace(cssMark, pageCssLinkTags);

        finalTemplate = finalTemplate.replace(contentMark, content);

        return finalTemplate;
        //console.log("TITLE", route.metaDescriptionContent);
        //console.log(route.title);
        
    }

    renderHtmlPagesForRoutes = (routes: IRoute[]) => {

    }

    renderRootElement = (reqPath: string) => {

      return renderToString(
        <ChunkExtractorManager extractor={this.extractor}>
            <StaticRouter location={reqPath} context={{}}>
                {this.app}
            </StaticRouter>
        </ChunkExtractorManager>
      );

    }
}

export default DynamicImportSsr;