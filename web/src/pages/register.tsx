import React from 'react';
import { Formik, Form } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/core';
import Wrapper from '../components/wrapper';
import Inputfield from '../components/inputfield';
import { useMutation } from 'urql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

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
    const router = useRouter();
    const [, register] = useMutation(REGISTER_MUTATION); // useRegisterMutation from generated
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ username: '', password: '' }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register(values);
                    if(response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if(response.data.register.user) {
                        router.push('/');
                    }
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