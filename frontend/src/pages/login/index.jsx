import FormLogin from "./formLogin";

const { Box, Typography, useTheme, useMediaQuery } = require("@mui/material")

const Login = () => {
    const theme = useTheme();
    const IsNonMobile = useMediaQuery("(min-width: 1000px)")
    return (
        <Box>
            <Box
                width="100"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
                >
                <Typography
                    fontWeight="bold"
                    variant="h1"
                    color="primary"
                >
                    Jobless Project
                </Typography>
            </Box>
            <Box
                width={IsNonMobile ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography mb="1rem">
                    Welcome to SocialPedia, the world media for Socialism
                </Typography>
                <FormLogin />
            </Box>
        </Box>
    )
};
export default Login;