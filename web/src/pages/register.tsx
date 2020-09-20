import React from 'react';
import { Formik, Form } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/core';
import Wrapper from '../components/wrapper';
import Inputfield from '../components/inputfield';

interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
    return (
        <Wrapper variant="small">
            <Formik initialValues={{ username: '', password: '' }} onSubmit={(values) => (console.log(values))}>
                {({isSubmitting}) => (
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