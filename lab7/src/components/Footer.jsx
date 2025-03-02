import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box 
            sx={{ 
                backgroundColor: 'limegreen', 
                color: 'white', 
                position: 'fixed', 
                bottom: 0, 
                width: '100%', 
                textAlign: 'center', 
                padding: '10px 0' 
            }}
        >
            <Typography variant="body1">&copy; {currentYear} CodeCraft Labs. All rights reserved.</Typography>
        </Box>
    );
};

export default Footer;
