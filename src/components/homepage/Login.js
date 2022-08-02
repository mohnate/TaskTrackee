import styles from "../../styles/homepage/homepage.module.scss";
import stylesInput from "../../styles/input.module.scss";

import { useReducer, useRef } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { config as AWSconfig, CognitoIdentityCredentials } from "aws-sdk";
import { cookieStorage, UserPool } from "../../lib/awsCognito";

import EmailInput from "../input/EmailInput";
import PasswordInput from "../input/PasswordInput";

export default function Login() {
  const reducer = (state, action) => {
    return { ...state, [action.type]: action.txt };
  };
  const initialState = {
    email: null,
    password: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(emailPattern)) {
      dispatch({ type: "email", txt: "This is not a valid email!" });
    } else dispatch({ type: "email", txt: null });

    if (password.length < 8) {
      dispatch({
        type: "password",
        txt: "Your password needs to contain at least 8 character",
      });
    } else if (password.length >= 30) {
      dispatch({
        type: "password",
        txt: "Your password is too long!",
      });
    } else dispatch({ type: "password", txt: null });

    // aws cognito authentication
    // create a cognito userto hold user details and the pools
    // that user is located at
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
      Storage: cookieStorage,
    });

    // set user details for authentication
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    // authenticate user using authDetails
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const apiDestination = `cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;
        AWSconfig.credentials = new CognitoIdentityCredentials({
          IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
          Logins: {
            [apiDestination]: result.getIdToken().getJwtToken(),
          },
        });

        console.log(result.getIdToken().getJwtToken());

        AWSconfig.credentials.refresh((error) => {
          if (error) {
            console.error(error);
          } else {
            console.info("success");
            cognitoUser.getUserData((err, userData) => {
              if (err) {
                console.info(err.message || JSON.stringify(err));
                return;
              }
              console.log(userData);
            });
          }
        });
      },
      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <>
      <form
        autoComplete="on"
        onSubmit={handleSubmit}
        className={styles.formControl}
      >
        <EmailInput id="loginEmail" emailRef={emailRef} state={state.email} />
        <PasswordInput
          id="loginPassword"
          passwordRef={passwordRef}
          state={state.password}
        />
        <button type="submit" className={stylesInput.submitBtn}>
          Log In
        </button>
      </form>
    </>
  );
}
