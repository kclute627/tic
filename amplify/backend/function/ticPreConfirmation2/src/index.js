/* Amplify Params - DO NOT EDIT
	API_NEWESTTIC_GRAPHQLAPIENDPOINTOUTPUT
	API_NEWESTTIC_GRAPHQLAPIIDOUTPUT
	API_NEWESTTIC_GRAPHQLAPIKEYOUTPUT
	AUTH_TICNEWNEW_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
var aws = require("aws-sdk");
var docClient = new aws.DynamoDB();

exports.handler = async (event, context, callback) => {
    // insert code to be executed by your lambda trigger
    console.log("event", event);
      let date = new Date();

    let params = {
        AttributesToGet: ["id"],
        Key: {
            id: { S: event.request.userAttributes.sub },
        },

        TableName: process.env.USERTABLE,
    };
    let params2 = {
        Item: {
            id: { S: event.request.userAttributes.sub },
            cognitoId: { S: event.request.userAttributes.sub },
            _typeName: { S: "User" },
            username: { S: event.userName },
            email: { S: event.request.userAttributes.email },
            name: { S: event.request.userAttributes.name },
            createdAt: { S: date.toISOString() },
            updatedAt: { S: date.toISOString() },
        },
        TableName: process.env.USERTABLE,
    };
    try {
        const res = await docClient.getItem(params).promise();
        console.log("Res", res);
       

        if (res.Item) { 
            console.log("Res.Item.id", res.Item.id.S);
            return event;
        } else {
            try {
                //there is no user in the database but there is a cognetio user so we need to add the user to the database

                await docClient.putItem(params2).promise();
                console.log("finally we did it ");
            } catch (error) {
                console.log("Error!!", error);
            }
        }
    } catch (error) {
        console.log("Error!!", error);
    }

    return event;
};
