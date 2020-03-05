const presets = [
    [
        "@babel/env",
        /* {
        targets: "last 2 Chrome versions" 
        } */
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
];

const plugins = [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    "@loadable/babel-plugin"
];

module.exports = { presets, plugins };

  //"> 0.25%, not dead",
        /*  targets:     {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1", 
        }, 
        modules: "auto" */