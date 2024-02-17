import { useState } from 'react'
import './App.css';
import { writeUserData } from './Firebase'


function App() {
  return (
  <div>
    <h1>Convention form</h1>
    <TextInput />
    <TextInput />
    <button onClick={function () {writeUserData("Zac Ginever", "whynot", "happyness@happy.com")}}>This is a button to break everything</button>
  </div>
  )
}

function TextInput() {
  return (
    <>
    <label className='flex-horizontal'>Email: <input name="email" /></label>
    </>
  );
}

export default App
