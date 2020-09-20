import React from 'react';
import { Formik, Form } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/core';
import Wrapper from '../components/wrapper';
import Inputfield from '../components/inputfield';
import { useMutation } from 'urql';

interface registerProps {

}

const REGISTER_MUTATION = `
    mutation Register($username: String!, $password: String!) {
        register(options: { username: $username, password: $password }) {
            errors {
                field
                message
            }
            user {
                id
                username
            }
        }
    }
`

const Register: React.FC<registerProps> = ({ }) => {
    const [, register] = useMutation(REGISTER_MUTATION);
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ username: '', password: '' }}
                onSubmit={(values) => {
                    return register(values);
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <Inputfield name="username" placeholder="username" label="Username" />
                        <Box mt={4}><Inputfield name="password" placeholder="password" label="Password" type="password" /></Box>
                        <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">Register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper >
    );
}

export default Register;