import './App.css';
import ResponsiveAppBar from './components/Appbar'
import { isUserAuthed } from './Firebase';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RegistrationForm from './components/RegistrationForm';


function App() {
  return true ? (
  <div>
    <ResponsiveAppBar />
    <h1>Convention form</h1>
    <RegistrationForm />
  </div>
  ) : (
    <SignUp />
  )
}

export default App
