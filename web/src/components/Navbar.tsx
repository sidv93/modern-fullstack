import React from 'react'
import { Box, Flex, Link, Button } from '@chakra-ui/core';
import NextLink from 'next/link';

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = ({ }) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery();
    let body;

    if (fetching) {
        body = null;
    } else if (!data.me) {
        body = (
            <>
                <NextLink href='/login'>
                    <Link color="white" mr={2}>login</Link>
                </NextLink>
                <NextLink href='/register'>
                    <Link color="white" mr={2}>register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex>
                <Box ml={2}>{data.me.username}</Box>
                <Button variant="link" onClick={() => logout()} isLoading={logoutFetching}>Logout</Button>
            </Flex>
        )
    }
    return (
        <Flex bg="tomato" p={4}>
            <Box ml="auto">

            </Box>
        </Flex>
    );
}

export default Navbar;
