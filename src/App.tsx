import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Loading from './components/Loading'
import supabase from './lib/api'
import { AuthSession, User } from '@supabase/supabase-js'
import { useAuth } from './store/auth'

import './index.css'

const Register = lazy(() => import('./pages/Register'))
const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home'))
const PasswordReset = lazy(() => import('./pages/PasswordReset'))

function App () {
  const user = useAuth(state => state.user)
  const setUser = useAuth(state => state.setUser)

  useEffect(() => {
    const session: AuthSession | null = supabase.auth.session()
    setUser(session?.user ?? null as unknown as User)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user
        setUser(currentUser ?? null)
      }
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [user])

  return (
    <Suspense fallback={<Loading/>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/reset-password" element={<PasswordReset/>}/>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
