import AWS from "aws-sdk";
import mqtt from "mqtt";

// Fetching the values from the .env file
const AWS_REGION = process.env.REACT_APP_AWS_REGION; // AWS region
const IOT_ENDPOINT = process.env.REACT_APP_IOT_ENDPOINT; // AWS IoT WebSocket endpoint from .env
const COGNITO_IDENTITY_POOL_ID = process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID; // Cognito Identity Pool ID from .env

// Function to get AWS IoT credentials (via Cognito Identity)
const getAWSCredentials = async () => {
  AWS.config.region = AWS_REGION;

  const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: COGNITO_IDENTITY_POOL_ID, // Cognito Identity Pool ID from .env
  });

  // Fetch temporary credentials
  await credentials.getPromise();
  return credentials;
};

export const connectToMQTT = async () => {
  try {
    const credentials = await getAWSCredentials(); // Fetch AWS credentials using Cognito

    // Now use the temporary credentials to connect to MQTT
    const client = mqtt.connect(IOT_ENDPOINT, {
      clientId: `esp8266_${Math.random().toString(16).slice(3)}`, // Unique client ID
      protocol: "wss", // WebSocket protocol
      accessKeyId: credentials.accessKeyId, // Use temporary credentials
      secretKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken, // Use temporary session token
    });

    client.on("connect", () => {
      console.log("✅ Connected to AWS IoT Core");

      client.subscribe("gas/leakage", (err) => {
        if (err) {
          console.error("❌ Subscription error:", err);
        } else {
          console.log("📡 Subscribed to topic: gas/leakage");
        }
      });
    });

    client.on("message", (topic, message) => {
      console.log(`📨 Message received on topic ${topic}:`, message.toString());
    });

    client.on("error", (error) => {
      console.error("❌ MQTT Connection Error:", error);
    });

    client.on("close", () => {
      console.log("🔌 Disconnected from MQTT");
    });

    return client;
  } catch (error) {
    console.error("❌ AWS Credentials Error:", error);
  }
};
