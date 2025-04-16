import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

const REGION = process.env.REACT_APP_AWS_REGION; // e.g., "eu-north-1"
const IDENTITY_POOL_ID = process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID; // Cognito Identity Pool ID
const TABLE_NAME = "GasLeakageData"; // DynamoDB Table Name

// Create a DynamoDB Client with Cognito-based authentication
const dynamoDBClient = new DynamoDBClient({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

// Function to fetch gas leakage data from DynamoDB
export const fetchDynamoDBData = async () => {
  try {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const response = await dynamoDBClient.send(command);
    
    console.log("Fetched DynamoDB Data:", response.Items);
    return response.Items;
  } catch (error) {
    console.error("❌ Error fetching data from DynamoDB:", error);
    throw error;
  }
};
