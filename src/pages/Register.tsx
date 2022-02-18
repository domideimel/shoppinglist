import { FC } from 'react'
import SignUp from '../components/SignUp'

const Register: FC = () => {
  return <div className='prose mx-auto'>
    <h1>Registrieren</h1>
    <p>
      Hier können Sie sich registrieren um die Shoppinglist nutzen zu können.
    </p>

    <SignUp isRegister />
  </div>
}

export default Register