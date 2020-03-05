Webpack:
    - server express for ssr
    - client dev with own dev server
    - client prod

Jest:
    - test express
    - test client

Express:
  OnRuntime:
    - check for cache page
    - if not render content with React and add it to template and response

  OnBuild:
    - compile our client scripts to public folder 
    - compile our server scripts
    - make html templates with css and js links to public folder

    TODO: make pages files(Homepage, Otehrpage) in server.js included by require, when it needed(see externals property in webpack config)
    
