import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSignin, startLoginWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.trim().length > 0, 'El password no puede quedar vacio'],
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { 
      formState, email, password, onInputChange,
      isFormValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;

    dispatch( startLoginWithEmailPassword(formState) );
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignin() );
  }

  return (
  <AuthLayout title='Login'>
    <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
      <Grid container>
        <Grid item xs={ 12 } sx={{ mt: 2 }}>
          <TextField 
            label="Correo" 
            type="email" 
            placeholder="correo@google.com"
            fullWidth
            name='email'
            value={ email }
            onChange={ onInputChange }
            error={ !!emailValid && formSubmitted }
            helperText={ (!!emailValid && formSubmitted) ? emailValid : '' }
          />
        </Grid>
        
        <Grid item xs={ 12 } sx={{ mt: 2 }}>
          <TextField 
            label="Contrase??a" 
            type="password" 
            placeholder="Contrase??a"
            fullWidth
            name='password'
            value={ password }
            onChange={ onInputChange }
            error={ !!passwordValid && formSubmitted }
            helperText={ (!!passwordValid && formSubmitted) ? passwordValid : '' }
          />
        </Grid>
      <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
        <Grid 
          item 
          xs={ 12 }
          display={ !!errorMessage ? '' : 'none' }
        >
          <Alert severity='error'>{ errorMessage }</Alert>
        </Grid>

        <Grid item xs={ 12 } sm={ 6 }>
          <Button 
            type="submit" 
            variant='contained' 
            fullWidth
            disabled={ isAuthenticating }
          >
            Login
          </Button>
        </Grid>
        
        <Grid item xs={ 12 } sm={ 6 }>
          <Button 
            onClick={ onGoogleSignIn } 
            variant='contained' 
            fullWidth
            disabled={ isAuthenticating }
          >
            <Google />
            <Typography sx={{ ml: 1 }}>Google</Typography>
          </Button>
        </Grid>
      </Grid>


      <Grid container direction='row' justifyContent='end'>
        <Link component={ RouterLink } color='inherit' to="/auth/register">
          Crear una cuenta
        </Link>

      </Grid>

      </Grid>
    </form>
  </AuthLayout>
  )
}
