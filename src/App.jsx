import './App.css';
import ResponsiveAppBar from './components/Appbar'
import { autoLogIn, readRegistrationData } from './Firebase';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RegistrationForm from './components/RegistrationForm';
import ConventionWidget from './components/ConventionWidget'

const data = {
  name: "1st Pukekohe"
}


await autoLogIn()
const hello = await readRegistrationData();

function App() {
  console.log(hello);


  return true ? (
  <div>
    <ResponsiveAppBar />
    <h1>Convention form</h1>
    <ConventionWidget data={data}/>
    <RegistrationForm />
  </div>
  ) : (
    <SignUp />
  )
}

export default App
