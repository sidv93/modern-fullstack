import React, { Children } from 'react'
import { Box } from '@chakra-ui/core';

interface wrapperProps {
    variant?: 'small' | 'regular'
}

const Wrapper: React.FC<wrapperProps> = ({ children, variant = 'regular' }) => {
    return (
        <Box mt={8} maxW={variant === 'regular' ? "800px" : '400px'} w="100%" mx="auto">
            {children}
        </Box>
    );
}

export default Wrapper;
