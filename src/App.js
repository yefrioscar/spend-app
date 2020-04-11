import React, { createContext, useReducer } from "react";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import { Global, css } from "@emotion/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { Provider } from "./store";

const GettingStartedContainer = React.lazy(() =>
    import("./containers/GettingStartedContainer")
);
const SignUpContainer = React.lazy(() =>
    import("./containers/auth/SignUpContainer")
);
const ConfirmAccountContainer = React.lazy(() =>
    import("./containers/auth/ConfirmAccountContainer")
);
const SignInContainer = React.lazy(() =>
    import("./containers/auth/SignInContainer")
);
const HomeContainer = React.lazy(() => import("./containers/HomeContainer"));
const NoMatchRoute = () => <div>404 Page</div>;

const routes = [
    {
        Component: GettingStartedContainer,
        path: "/getting-started",
    },
    {
        Component: SignUpContainer,
        path: "/sign-up",
    },
    {
        Component: SignInContainer,
        path: "/sign-in",
    },
    {
        Component: ConfirmAccountContainer,
        path: "/confirm",
    },
    {
        Component: HomeContainer,
        path: "/",
    },
    {
        Component: NoMatchRoute,
    },
];

// Let's say you want to add custom colors
const customTheme = {
    ...theme,
    fonts: {
        ...theme.fonts,
        heading: "'Montserrat','Helvetica Neue', sans-serif",
        body: "'Montserrat', 'Helvetica Neue', sans-serif",
    },
    colors: {
        ...theme.colors,
        primary: {
            100: "#1a365d",
            200: "#1a365d",
            300: "#1a365d",
            400: "#1a365d",
            500: "#7FDDA3", // Default
            600: "#1a365d",
            700: "#1A502F", //
            800: "#1a365d",
            900: "#153e75",
        },
    },
};

function App() {
    console.log(theme);
    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <Global styles={css``} />
            <Provider>
                <React.Suspense fallback={<span>Loading...</span>}>
                    <Router>
                        <Switch>
                            {routes.map((route, i) => {
                                return (
                                    <Route
                                        path={route.path}
                                        key={i}
                                        exact
                                        component={() => <route.Component />}
                                    />
                                );
                            })}
                        </Switch>
                    </Router>
                </React.Suspense>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
