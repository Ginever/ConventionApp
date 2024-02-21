import * as React from 'react';
import './App.css';
import ResponsiveAppBar from './components/Appbar'
import { autoLogIn, readRegistrationData } from './utils/Firebase';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ConventionWidget from './components/ConventionWidget'
import FullWidthAdd from './components/FullWidthAdd';
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { updateDataAsync, selectConventionData } from './features/userData/userDataSlice'


function App() {
  const conventionData = useSelector(selectConventionData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(updateDataAsync());
  }, []);

  return true ? (
    <div>
      <ResponsiveAppBar />
      <h1>Convention form</h1>
      <Grid container spacing={2} padding="0px 2.5%">
        {conventionData.map((convention) => (
          <Grid key={convention} item xs={12}>
            <ConventionWidget index={conventionData.indexOf(convention)}/>
          </Grid>
              ))}
        <Grid item xs={12}>
          <FullWidthAdd onClick={function() {console.log(conventionData)}} />
        </Grid>
      </Grid>
    </div>
    ) : (
      <SignUp />
    )
}

export default App
