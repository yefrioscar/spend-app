import React, { useEffect, useRef, useContext } from "react";
import {
    Grid,
    Heading,
    Button,
    Text,
    Input,
    FormControl,
    FormErrorMessage,
} from "@chakra-ui/core";
import { useHistory, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field } from "formik";

import { WrapperContainer } from "../../../components/layout";
import styled from "@emotion/styled";
import { Auth } from "aws-amplify";
import { useGlobalState, useDispatch } from "../../../store";

const ContentContainer = styled.div`
    position: absolute;
    bottom: ${(props) => (props.position === "bottom" ? 0 : "auto")};
    top: ${(props) => (props.position === "top" ? 0 : "auto")};
    width: 100%;
`;

const ConfirmAccountContainer = () => {
    const userAuthFlow = useGlobalState("userAuthFlow");
    const dispatch = useDispatch();
    const history = useHistory();

    if (!userAuthFlow) return <Redirect to="/sign-up" />;

    const validator = Yup.object({
        code: Yup.string()
            .matches(/^\d+$/, "Its a code of 6 digits.")
            .min(6, "Just 6 numbers.")
            .required("One Time Password required."),
    });

    const CONFIG_INPUTS = {
        variant: "filled",
        focusBorderColor: "primary.500",
    };

    return (
        <>
            <WrapperContainer>
                <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                    <Heading as="h1" size="xl" color="#383838">
                        Verify your account
                    </Heading>
                    <Text>
                        Enter the code we just send yo your phone via SMS.
                    </Text>
                </Grid>
            </WrapperContainer>
            <ContentContainer position="bottom">
                <WrapperContainer>
                    <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                        <Formik
                            initialValues={{ code: "" }}
                            validationSchema={validator}
                            onSubmit={async ({ code }, { setSubmitting }) => {
                                console.log(code);
                                console.log(userAuthFlow);
                                const result = await Auth.sendCustomChallengeAnswer(
                                    userAuthFlow,
                                    code
                                );

                                setSubmitting(false);

                                let user = await Auth.currentUserInfo();
                                dispatch({ type: "SET_USER", payload: user });
                                history.push("/");
                            }}
                        >
                            {({
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Grid
                                        templateColumns="repeat(1, 1fr)"
                                        gap={4}
                                    >
                                        <Field name="code">
                                            {({
                                                field,
                                                form: {
                                                    errors: { code: error },
                                                    touched: { code: touched },
                                                },
                                            }) => (
                                                <FormControl
                                                    isInvalid={error && touched}
                                                >
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                        {...CONFIG_INPUTS}
                                                        placeholder="Introduce el codigo"
                                                    />
                                                    <FormErrorMessage>
                                                        {error}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Button
                                            boxShadow="0px 3px 6px #00000014"
                                            variantColor="primary"
                                            color="primary.700"
                                            isLoading={isSubmitting}
                                            type="submit"
                                        >
                                            Verify account
                                        </Button>
                                    </Grid>
                                </form>
                            )}
                        </Formik>
                    </Grid>
                </WrapperContainer>
            </ContentContainer>
        </>
    );
};

export default ConfirmAccountContainer;
