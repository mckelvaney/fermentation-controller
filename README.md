# fermentation-controller
A simple Node.js app to control [@mhazley](https://github.com/mhazley) & [@mckelvaney](https://github.com/mckelvaney)'s brewery fermentation chamber, based on a Particle Photon.

# Getting started
You will need to provide the app with your Particle access token via an environment variable using the name `ACCESS_TOKEN`
You can also set the port for the app via the `PORT` environment variable, the default is `9102`

# Running the app
- Install the required node version, which can be found in (.node-version)[./.node-version], using the method of your choice—I recommend [ndenv](https://github.com/riywo/ndenv).

- Run `npm install`

- Once finished, run `npm start`, which will start the app.

- If running locally navigate to [http://localhost:9102](http://localhost:9102). Otherwise navigate to your servers IP or hostname on port `9102`, or the port you've defined.

# Deployment
This app uses [dokku](https://github.com/dokku/dokku) in production, a herokuish type infrastructure. It is trivial to use heroku or your own server, just remember, YMMV.
