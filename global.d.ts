
declare module "*.module.scss" {
    interface IModalClasses {
      [ClassName: string]: string;
    }
    const classes: IModalClasses;
    //const classes: any;
    export default classes;
}
  
declare module "*.jpg" {
  const path: string;
  //const classes: any;
  export default path;
}
