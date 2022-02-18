import { FC, lazy } from 'react'
import { useAuth } from '../store/auth'

const Login = lazy(() => import('../components/Login'))

const Home: FC = () => {
  const user = useAuth(state => state.user)
  return (
    <>
      {!user ? <Login /> : <>
        <h1>Home</h1>

      </>}


    </>
  )
}

export default Home