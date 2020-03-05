
export interface IRoute {
    path: string,
    title: string,
    metaDescriptionContent: string,
    metaKeywords: string
} 


const routes: Map<string, IRoute> = new Map();

routes.set("/", {
    path: "/",
    title: "Super puper homepage",
    metaDescriptionContent: "photos, others",
    metaKeywords: "keywords"
});

routes.set("/photos", {
    path: "/photos",
    title: "Hey, look for our photos.",
    metaDescriptionContent: "photos, super, interesting",
    metaKeywords: "keywords"
});

export default routes;