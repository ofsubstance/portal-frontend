import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { RiUserAddLine, RiLoginBoxLine } from 'react-icons/ri';

interface SharedVideoLayoutProps {
  children: React.ReactNode;
}

export default function SharedVideoLayout({
  children,
}: SharedVideoLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'white',
        color: 'text.primary',
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          bgcolor: 'black',
          width: '100%',
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
              Of Substance
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/signin"
              startIcon={<RiLoginBoxLine />}
              size="small"
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
              startIcon={<RiUserAddLine />}
              size="small"
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{ py: 4, borderTop: '1px solid rgba(0,0,0,0.1)', bgcolor: 'white' }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Of Substance. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 1 }}
          >
            This is a shared film. Sign up to access our full collection.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
