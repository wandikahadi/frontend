import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const baseUrl = import.meta.env.VITE_API_URL;

  // Ambil semua user
  useEffect(() => {
    fetch(`${baseUrl}/users`)
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error(err));
  }, []);

  // Tambah user baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Isi semua field!");

    try {
      const res = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const newUser = await res.json();
      setUsers([...users, newUser]); // update daftar user
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>User List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
