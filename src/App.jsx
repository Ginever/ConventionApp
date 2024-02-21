import * as React from 'react';
import './App.css';
import ResponsiveAppBar from './components/Appbar'
import { autoLogIn, readRegistrationData } from './utils/Firebase';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ConventionWidget from './components/ConventionWidget'
import FullWidthAdd from './components/FullWidthAdd';
import Grid from "@mui/material/Grid";
import { readData } from './utils/data';


function App() {
  const [state, setState] = React.useState({
    conventions: [],
    people: []
  });

  React.useEffect(() => {
    readData().then(data => setState(data));
  }, [])


  return true ? (
    <div>
      <ResponsiveAppBar />
      <h1>Convention form</h1>
      <Grid container spacing={2} padding="0px 2.5%">
        {state["conventions"].map((convention) => (
          <Grid key={convention} item xs={12}>
            <ConventionWidget index={state["conventions"].indexOf(convention)}/>
          </Grid>
              ))}
        <Grid item xs={12}>
          <FullWidthAdd onClick={function() {state}} />
        </Grid>
      </Grid>
    </div>
    ) : (
      <SignUp />
    )
}

export default App
