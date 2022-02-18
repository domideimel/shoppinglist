import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FC, lazy, Suspense, useEffect } from 'react'
import Loading from './components/Loading'
import supabase from './lib/api'
import { AuthSession, User } from '@supabase/supabase-js'
import { useAuth } from './store/auth'
import { useDarkMode } from 'usehooks-ts'
import { ToastContainer } from 'react-toastify'

import Header from './components/Header'

const Register = lazy(() => import('./pages/Register'))
const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home'))
const PasswordReset = lazy(() => import('./pages/PasswordReset'))

const App: FC = () => {
  const { isDarkMode } = useDarkMode()

  const user = useAuth(state => state.user)
  const setUser = useAuth(state => state.setUser)

  useEffect(() => {
    const element: HTMLElement = document.querySelector('html')!

    if (isDarkMode) {
      element.dataset.theme = 'dark'
    } else {
      element.dataset.theme = 'light'
    }
  }, [])

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
        <Header/>
        <div className="xl:container xl:mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/reset-password" element={<PasswordReset/>}/>
          </Routes>
        </div>
        <ToastContainer/>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
