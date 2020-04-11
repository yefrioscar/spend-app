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
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, useField } from "formik";

import { WrapperContainer } from "../../../components/layout";
import styled from "@emotion/styled";
import { Auth } from "aws-amplify";
import { useGlobalState, useDispatch } from "../../../store";
import qs from "query-string";

const ContentContainer = styled.div`
    position: absolute;
    bottom: ${(props) => (props.position === "bottom" ? 0 : "auto")};
    top: ${(props) => (props.position === "top" ? 0 : "auto")};
    width: 100%;
`;

const CONFIG_INPUTS = {
    variant: "filled",
    focusBorderColor: "primary.500",
};

export const getQueryStringValue = (
    key,
    queryString = window.location.search
) => {
    const values = qs.parse(queryString);
    return values[key];
};

const SignInContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const email = getQueryStringValue('email');
    const initialValues = { email: "" }

    if(email) {
        initialValues.email = email;
    }

    const validator = Yup.object({
        /* 
        email: Yup.string()
            .email("Please enter an email.")
            .required("Email is required."), */
        email: Yup.string()
            /*             .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid.')
             */ .required("Phone number is required."),
    });

    const randomString = (length) => {
        let result = "";
        let numbers = "0123456789";
        let stringLowerCase = "abcdefghijklmnopqrstuvwxyz";
        let stringUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 1; i > 0; --i)
            result += numbers[Math.floor(Math.random() * numbers.length)];
        for (var i = 1; i > 0; --i)
            result +=
                stringLowerCase[
                    Math.floor(Math.random() * stringLowerCase.length)
                ];
        for (var i = 1; i > 0; --i)
            result +=
                stringUpperCase[
                    Math.floor(Math.random() * stringUpperCase.length)
                ];
        let unionAll = `${numbers}${stringLowerCase}${stringUpperCase}`;
        for (var i = length; i > 0; --i)
            result += unionAll[Math.floor(Math.random() * unionAll.length)];
        return result;
    };
    return (
        <>
            <WrapperContainer>
                <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                    <Heading as="h1" size="xl" color="#383838">
                        Sign In
                    </Heading>
                    <Text>
                        A code of 6 digits will be sent via SMS or email to
                        verify if it's your account.
                    </Text>
                </Grid>
            </WrapperContainer>
            <ContentContainer position="bottom">
                <WrapperContainer>
                    <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validator}
                            onSubmit={async ({ email }, { setSubmitting }) => {
                                try {
                                    const resultSignIn = await Auth.signIn(
                                        email
                                    );

                                    setSubmitting(false);

                                    dispatch({
                                        type: "SET_USER_AUTH_FLOW",
                                        payload: resultSignIn,
                                    });
                                    history.push("/confirm");
                                } catch (error) {
                                    console.log(error);
                                }
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
                                        <Field name="email">
                                            {({
                                                field,
                                                form: {
                                                    errors: { email: error },
                                                    touched: { email: touched },
                                                },
                                            }) => (
                                                <FormControl
                                                    isInvalid={error && touched}
                                                >
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                        {...CONFIG_INPUTS}
                                                        placeholder="Introduce tu email"
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
                                            Send code
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

export default SignInContainer;
