import { useState } from 'react'

function MyButton(){
  return (
    <button>
      I'm a button
    </button>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
<>
  <h1>Welcome to my App</h1>
  <MyButton />
</>
  )
}



export default App
