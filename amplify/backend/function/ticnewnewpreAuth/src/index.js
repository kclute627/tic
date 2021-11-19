/* Amplify Params - DO NOT EDIT
	API_NEWESTTIC_GRAPHQLAPIENDPOINTOUTPUT
	API_NEWESTTIC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const appsync = require("aws-appsync");
const gql = require("graphql-tag");
require("cross-fetch/polyfill");

exports.handler = async (event, context, callback) => {
    // TODO implement
    const graphqlClient = new appsync.AWSAppSyncClient({
        url: process.env.API_NEWESTTIC_GRAPHQLAPIENDPOINTOUTPUT,
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

    const query = gql`
        query getUser($username: String!) {
            getUser(username: $username) {
                id
            }
        }
    `;

    const mutation = gql`
        mutation createPlayer(
            $name: String!
            $cognitoID: String!
            $username: String!
            $email: AWSEmail!
        ) {
            createUser(
                input: {
                    cognitoID: $cognitoID
                    email: $email
                    name: $name
                    username: $username
                }
            ) {
                id
            }
        }
    `;
    try {
        const res = await graphqlClient.query({
            query,
            variables: {
                username: event.userName,
            },
        });
        console.log("res", res)

        if (res.getUser) {
            console.log("res hit line 65");
            callback(null, event);
        } else {
            try {
                await graphqlClient.mutate({
                    mutation,
                    variables: {
                        name: event.request.userAttributes.name,
                        username: event.userName,
                        cognitoID: event.request.userAttributes.sub,
                        email: event.request.userAttributes.email,
                    },
                });
                 console.log("attempting to mutate line 78");
                callback(null, event);
            } catch (error) {
                callback(error);
            }
        }
    } catch (error) {
        callback(error)
    }
};
