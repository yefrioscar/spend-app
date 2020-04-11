import React from "react";
import { useGlobalState } from "../../store";
import { Redirect } from "react-router-dom";

const HomeContainer = () => {
    const user = useGlobalState("user");

    if (!user) return <Redirect to="/sign-up" />;

    return <>{JSON.stringify(user)}</>;
};

export default HomeContainer;
