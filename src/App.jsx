import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${baseUrl}/users`)
      .then(res => res.json())
      .then(setUsers);
  }, []);
  console.log(users)

  return (
    <div>
      <h1>User List</h1>
      <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  )
}

export default App
