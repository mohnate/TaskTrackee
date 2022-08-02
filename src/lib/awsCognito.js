import { CognitoUserPool, CookieStorage } from "amazon-cognito-identity-js";
import { CognitoIdentityCredentials, config as AWSconfig } from "aws-sdk";

AWSconfig.region = process.env.AWS_REGION;
AWSconfig.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
});

const cookieDetails = {
  domain: window.location.hostname,
  expires: 7,
  sameSite: "lax",
};
export const cookieStorage = new CookieStorage(cookieDetails);

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID,
  Storage: cookieStorage,
};
export const UserPool = new CognitoUserPool(poolData);

// The primary method for verifying/starting a CoginotID session
const verifySession = ({ props, username }) => {
  const poolUrl = `cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;

  /* Note - I'm skipping the basic auth step since I already have the accessToken and jwtToken stored locally
  thanks to Cognito Auth */

  /* You don't have to do this, but I am so I can get the user's name from the parsed JWT token so I don't have
  to call getUserAttributes after the session as been started. */
  const cognitoUser = UserPool.getCurrentUser();
  let name;

  /** Get a new session and set it in the AWS config */
  cognitoUser.getSession((err, result) => {
    console.log(err, result);
    if (result) {
      name = result.idToken.payload.given_name;
      AWSconfig.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: config.identityPool,
        Logins: {
          [poolUrl]: result.idToken.jwtToken,
        },
      });
    }
  });

  /* Refresh the temporary token */
  AWSconfig.credentials.refresh((err) => {
    if (err) {
      console.error("Failed To Login To CognitoID:", err);
      props.history.push("/", {
        error: "Failed to refresh your session. Please login again.",
      });
    } else {
      props.storeSession({
        token,
        name,
      });
    }
  });
};
