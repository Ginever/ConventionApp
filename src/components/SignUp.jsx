import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Backdrop, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectFirstName, selectLastName, setUid, updateFirstName, updateLastName } from '../features/userData/userDataSlice';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Zac Ginever
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const dispatch = useDispatch();
  const auth = getAuth();

  const [formError, setFormError] = React.useState({firstName: null, lastName: null, email: null, password: null});

  const [open, setOpen] = React.useState(false);

  const updateError = (firstName, lastName, email, password) => {
    setFormError({firstName: firstName, lastName: lastName, email: email, password: password});
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpen(true);
    createUserWithEmailAndPassword(auth, data.get('email'), data.get('password')).then((value) => {
      setUid(value.user.uid);
      navigate('/ConventionApp');
    }).catch((err) => {
      console.log(err.code);
      setOpen(false);
      switch (err.code) {
        case 'auth/invalid-email':
          updateError(null, null, "Invalid email", null);
          break;
        case 'auth/weak-password':
          updateError(null, null, null, "Password is too weak");
          break;
        case 'auth/email-already-in-use':
          updateError(null, null, "Email already in use", null);
          break;
        default:
          updateError(null, null, err.message, err.message);
      }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} width="100%">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={formError.firstName != null}
                  helperText={formError.firstName != null && formError.firstName != "" ? formError.firstName : null}
                  value={firstName ?? ""}
                  onChange={(e) => dispatch(updateFirstName(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={formError.lastName != null}
                  helperText={formError.lastName != null && formError.lastName != "" ? formError.lastName : null}
                  value={lastName ?? ""} 
                  onChange={(e) => dispatch(updateLastName(e.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={formError.email != null}
                  helperText={formError.email != null && formError.email != "" ? formError.email : null}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={formError.password != null}
                  helperText={formError.password != null && formError.password != "" ? formError.password : null}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/ConventionApp/signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          
        </Box>
        <Copyright sx={{ mt: 5 }} />

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </ThemeProvider>
  );
}