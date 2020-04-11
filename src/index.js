import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import Amplify from "aws-amplify";

Amplify.configure({
        Auth: {
            // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
            identityPoolId: "us-east-1:ca354b78-27a2-4f8b-830a-9cba9904df67",

            // REQUIRED - Amazon Cognito Region
            region: "us-east-1",

            // OPTIONAL - Amazon Cognito User Pool ID
            userPoolId: "us-east-1_kYyAho8sN",

            // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId: "hgpnk5iqvf6feplfhmflg3m24",
        }
    });

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
