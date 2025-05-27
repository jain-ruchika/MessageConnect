import { Link } from "wouter";
import { Box, Typography, Button, Container } from "@mui/material";
import { Home, Error } from "@mui/icons-material";

export default function NotFound() {
  return (
    <Container>
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Box>
          <Error sx={{ fontSize: '4rem', color: 'error.main', mb: 2 }} />
          <Typography variant="h4" color="text.primary" gutterBottom>
            404 Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Did you forget to add the page to the router?
          </Typography>
          <Link href="/">
            <Button 
              variant="contained" 
              startIcon={<Home />}
              size="large"
            >
              Go back home
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
