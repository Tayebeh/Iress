## About the app
The app is developed using Typescript languauge. 
Jest testing framework is used for testing.
ESLint and Prettier are used to keep coding style consistent.
No code spliting or bundle optimisations have been implemented for this application as it is only a code challenge.
I have not used any boiler plate code for bootstraping this application. All code in the app was developed from scratch.

## Prerequisites
You need to have node version 10+ installed. 
You will also need to have yarn installed.

## Tests
All tests are located under the src/tests folder. To run the tests run the following command:

```
yarn test
```
## Running the application
You need to checkout the project and run `yarn install` for the dependencies. Then to run the application run the following conmmand:
```
yarn start
```
To quit the application just type quit in the console.

## Building the application
To build the application run the following:
```
yarn build
```

## Error handling 
I have defined custom errors for handling different error scenarios. All error files are located under the src/errors folder. For simplicity, I have just used the standard console.error and console.warn functions to log the errors to the console but in a real world application you would probably use a logger to be able to log the errors to different channels and also easily switch the errors on/off for different environments.

## Assumptions
For now, I have assumed that there is only one robot on the table but the code can be easily extended to support more than one.
By default, the table will have 5x5 dimensions if no dimension is specified when you instantiate the Board. 
The table dimensions cannot be negative.
The origin (0,0) is considered to be the SOUTH WEST corner.
The command can only be in the form of "command name" then a space followed by 3 comma seperated arguments, or only have a command name with no arguments. Any other form of input command will be considered invalid. If the command name is not in the list of available command names, it will be considered invalid.

