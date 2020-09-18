# Storm Glass Sea Level Chainlink Adapter
[![Build Status](https://travis-ci.org/chainlink-hackathon2020-insurance/stormglass-sealevel-adapter.svg?branch=master)](https://travis-ci.org/chainlink-hackathon2020-insurance/stormglass-sealevel-adapter)

Chainlink external adapter for the Storm Glass (https://stormglass.io/) sea level point API.

Based on the Chainlink Adapter Template: https://github.com/thodges-gh/CL-EA-NodeJS-Template.git

## Input Params

- `lat`, or `latitude`: The point's latitude.
- `lng`, or `longitude`: The point's longitude.

## Output

```json
{
   "jobRunID":1,
   "data":{
      "data":[
         {
            "sg":0.72,
            "time":"2020-09-15T00:00:00+00:00"
         }
      ],
      "meta":{
         "cost":1,
         "dailyQuota":50,
         "datum":"MSL",
         "end":"2020-09-15 00:00",
         "lat":43.38,
         "lng":-3.01,
         "requestCount":1,
         "start":"2020-09-14 00:00",
         "station":{
            "distance":4,
            "lat":43.36,
            "lng":-3.05,
            "name":"bilbao",
            "source":"sg"
         }
      },
      "result":0.72
   },
   "result":0.72,
   "statusCode":200
}
```

## API Key

To test and run the application locally, you need to get an API key from Storm Glass. The API key should be provided in an `.env` file at the root of the project.

Example:

```
API_KEY=Your_StormGlass_API_key
```

## Install Locally

Install dependencies:

```bash
yarn
```

### Test

Run the local tests:

```bash
yarn test
```

Natively run the application (defaults to port 8080):

### Run

```bash
yarn start
```

## Call the external adapter/API server

```bash
curl -X POST -H "content-type:application/json" "http://localhost:8080/" --data '{ "id": 0, "data": { "lat": 43.38, "lng": -3.01 } }'
```

## Docker

If you wish to use Docker to run the adapter, you can build the image by running the following command:

```bash
docker build . -t external-adapter
```

Then run it with:

```bash
docker run -p 8080:8080 -it external-adapter:latest
```

## Serverless hosts

After [installing locally](#install-locally):

### Create the zip

```bash
zip -r external-adapter.zip .
```

### Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 12.x for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `external-adapter.zip` file
- Handler:
    - index.handler for REST API Gateways
    - index.handlerv2 for HTTP API Gateways
- Add the environment variable (repeat for all environment variables):
  - Key: API_KEY
  - Value: Your_API_key
- Save

#### To Set Up an API Gateway (HTTP API)

If using a HTTP API Gateway, Lambda's built-in Test will fail, but you will be able to externally call the function successfully.

- Click Add Trigger
- Select API Gateway in Trigger configuration
- Under API, click Create an API
- Choose HTTP API
- Select the security for the API
- Click Add

#### To Set Up an API Gateway (REST API)

If using a REST API Gateway, you will need to disable the Lambda proxy integration for Lambda-based adapter to function.

- Click Add Trigger
- Select API Gateway in Trigger configuration
- Under API, click Create an API
- Choose REST API
- Select the security for the API
- Click Add
- Click the API Gateway trigger
- Click the name of the trigger (this is a link, a new window opens)
- Click Integration Request
- Uncheck Use Lamba Proxy integration
- Click OK on the two dialogs
- Return to your function
- Remove the API Gateway and Save
- Click Add Trigger and use the same API Gateway
- Select the deployment stage and security
- Click Add

### Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `external-adapter.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable (repeat for all environment variables)
  - NAME: API_KEY
  - VALUE: Your_StormGlass_API_key
  
### Install to Azure Functions

- Create an Azure Function
- Use Visual Studio Code Azure Function Plugin and deploy directly in the IDE to you Azure Function service
- In the Application Settings add the following
  - NAME: API_KEY
  - VALUE: Your_StormGlass_API_key
