## Sitemap Generator

Node.js Express application to generate sitemap JSON from given URL.

( Note: It doesn't write to file instead it returns the result in response body )

### Production

Make sure you have a recent version of Docker installed. Then you can build and run your own image from the projects directory:

```
$ docker build -t sitemap-generator .
$ docker run -d -p 8888:50010 --name my-sitemap-generator sitemap-generator
```

The default port (50010) for application is hard coded inside config folder and Dockerfile.
You should be able to make request via Postman or browser from http://{$HOST}:8888/ address.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/093b3be58b644f19b8a4)

### Development

In order to run from source you'll need Node.js v12.16+ installed. Supported runtime version is also mentioned in .nvmrc file.
Then you can either run with nodemon or compile TS and run from JS output.

```
$ npm run watch # runs TS code with hot-reload feature
$ npm run build && npm run start:js
```

When running from generated JS code make sure "public" folder and contents inside ./src are also present in ./dist folder.
Other available options are listed below scripts tag in package.json.

If everything goes well you should be able to browse http://localhost:50010 and reach the web page where you can request sitemap generation for a site.
