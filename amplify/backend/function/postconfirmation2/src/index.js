/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["value2"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	API_TICTAC_GRAPHQLAPIENDPOINTOUTPUT
	API_TICTAC_GRAPHQLAPIIDOUTPUT
	API_TICTAC_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */


    // TODO implement
  const appsync = require("aws-appsync");
const gql = require("graphql-tag");
require("cross-fetch/polyfill");

exports.handler = async (event, context, callback) => {
    const graphqlClient = new appsync.AWSAppSyncClient({
        url: process.env.API_TICTAC_GRAPHQLAPIENDPOINTOUTPUT,
        region: process.env.REGION,
        auth: {
            type: "AWS_IAM",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                sessionToken: process.env.AWS_SESSION_TOKEN,
            },
        },
        disableOffline: true,
    });

    const mutation = gql`
        mutation createPlayer(
            $name: String!
            $cognitoID: String!
            $username: String!
            $email: AWSEmail!
        ) {
            createPlayer(
                input: { cognitoID: $cognitoID, email: $email, name: $name, username: $username }
            ) {
                id
            }
        }
    `;

    try {
        await graphqlClient.mutate({
            mutation,
            
            variables: {
                name: event.request.userAttributes.name,
                username: event.userName,
                cognitoID: event.request.userAttributes.sub,
                email: event.request.userAttributes.email
            }
        });
        callback(null, event);
    } catch (error) {
        callback(error);
    }
};