import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <Box className="home-component">
            <Box className="hero">
                <Container maxWidth="xl" sx={{
                    position: 'relative',
                    height: 'inherit'
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translate(0%, -50%)'
                    }}>
                        <Typography sx={{color: '#fff', textShadow: '0px 2px 3px black'}} variant="h1" component="h1">
                            Indian Oil Corp. Ltd.
                        </Typography>
                        <Typography variant="h4" sx={{
                            color: 'white',
                            margin: '2rem 0'
                        }}>
                            What do we do? What don't we do
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            gap: 4
                        }}>
                            <Button size="large" color='neutral' variant="contained" LinkComponent={NavLink} to='/login'>
                                Login
                            </Button>
                            <Button size="large" color='neutral' variant="outlined" LinkComponent={NavLink} to='/signup'>
                                Sign up
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default Home