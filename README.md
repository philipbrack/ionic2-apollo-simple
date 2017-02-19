# ionic2-apollo-simple
This repo is a working ionic2 application which can interface with this wonderful example [webpack-apollo-server](https://github.com/DxCx/webpack-graphql-server) apollo server using webpack and typescript.

The best way to navigate the code probably is to search for the dependencies on apollo-angular:

```javascript
    "apollo-angular": "*",
    "apollo-client": "*",
    "graphql-tag": "*",
```

The HomeComponent provides interfaces with the PeopleService provider in order to request the information from the server.

## Current Features
The sample app retrieves all of the people in the sample server and upon request will receive their detail(s) including their mathches.

## Roadmap
* Transform the current interface to somehow get the type information from the schema
* Move from my simple promise to observables
