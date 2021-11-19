var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();

exports.handler = async (event, context, callback) => {
    // insert code to be executed by your lambda trigger
    let date = new Date();
    if (event.request.userAttributes.sub) {
        console.log("event", event);
        let params = {
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
            await ddb.putItem(params).promise();
            console.log("finally we did it ");
        } catch (error) {
            console.log("Error!!", error);
        }

        return null;
    } else {
        console.log("Nothing written in table Error!");
        context.done(null, event);
    }
};
