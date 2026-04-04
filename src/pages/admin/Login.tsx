import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try{
      const { token } = await login(email, password);
      localStorage.setItem('token', token);
      navigate('/admin')
    } catch {
      setError('Email o contraseña incorrectos')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p>{error}</p>}

      <button type="submit">Ingresar</button>
    </form>
  )
}
