/* Amplify Params - DO NOT EDIT
	API_TICTAC_GRAPHQLAPIENDPOINTOUTPUT
	API_TICTAC_GRAPHQLAPIIDOUTPUT
	API_TICTAC_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const appsync = require("aws-appsync");
const gql = require("graphql-tag");
require("cross-fetch/polyfill");

exports.handler = async (event, context, callback) => {
    const graphqlClient = new appsync.AWSAppSyncClient({
        url: process.env.API_TICTAC_GRAPHQLAPIENDPOINTOUTPUT,
        region: process.env.REGION,
        auth: {
            type: appsync.AUTH_TYPE.AWS_IAM,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                sessionToken: process.env.AWS_SESSION_TOKEN
            }
        },
        disableOffline: true
    });

    const mutation = gql`
        mutation createPlayer(
            $name: String!
            $cognitoID: String!
            $username: String!
            $email: String
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
        console.log("EVENTTTTTTTTT", event)
        callback(null, event);
    } catch (error) {
        callback(error);
    }
};