# A currency exchange app using angular 4 and NodeJs.

#
## Features
- **Technologies used**
  - Angular 4 seed 
  - Webpack + npm scripts in order to bundle the assets and create tasks to install dependencies and build the apps
  - Typescript
  - Jade
  - Stylus
  - n158 it is a NodeJs framework in backend
  - MongoDB
- **App**
  - The user inputs a value, the custom pipe "CurrencyPipe" translate to the desied format
  - All the logic of the app is in the file: "settings.yaml"
  - So the api format is in the following way:
  ```
    -   name: 'api'
                    description: 'API Router'
                    path: '/api'
                    routes:

                        # Retrieve rates from the current currency
                        -   method: 'GET'
                            path: '/latest/:base/:symbols'
                            pipeline:
                                -   handler: '$modelMongoTransactionHandler'
                                    skipWhenErrors: true
                                    params:
                                        db: '$mongoDb'
                                        model: '$core-db-models/Currency'
                                        transaction: 'getCurrencyRate'
                                        transactionParams:
                                            - '&params.base'
                                            - '&params.symbols'
  ```                                            
  - Cache service using localStorage
 - **Run the App**
 - First we need to install dependencies, the global dependencies can be installed by use ```npm install``` in the root folder.
 - We have to install dependecies of each webapp by running: ```npm run install-webapp:access``` and ```npm run install-webapp:exchange```, or just ```npm run install-all``` to install all webapps dependecies.
 - The same way to compile the webapp, we can run ```npm run build-all``` to compile all the webapps, if we want to compile each webapp we can use ```npm run build-webapp:access``` and ```npm run build-webapp:exchange```
 - Finally run ```npm start```
  
#

## License

>Copyright © 2018 Anthony Alfredo Ccapira Avendaño

>Licensed under the Apache License, Version 2.0 (the "License");
>you may not use this file except in compliance with the License.
>You may obtain a copy of the License at

>   http://www.apache.org/licenses/LICENSE-2.0

>Unless required by applicable law or agreed to in writing, software
>distributed under the License is distributed on an "AS IS" BASIS,
>WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
>See the License for the specific language governing permissions and
>limitations under the License.
