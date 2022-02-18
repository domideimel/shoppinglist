import { FC, LegacyRef, MutableRefObject, useRef } from 'react'
import supabase from '../lib/api'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'

interface helperText {
  error: boolean | null;
  text: string | null;
}

interface Form {
  isRegister?: boolean | undefined;
}

const SignUp: FC<Form> = ({ isRegister = false }) => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const setUser = useAuth(state => state.setUser)
  const navigate = useNavigate()

  const handleClick = async () => {
    const email: string | undefined = emailRef.current?.value
    const password: string | undefined = passwordRef.current?.value

    let resposne: any = null

    if (isRegister) {
      resposne = await supabase.auth.signUp({ email, password })
    } else {
      resposne = await supabase.auth.signIn({ email, password })
    }

    const { user, error } = resposne

    if (error) {
      toast(error.message, { type: 'error' })
    } else if (user && !error) {
      const message = isRegister ? 'Eine Mail zum Verifizieren wurde versand' : 'Sie wurden erfolgreich eingeloggt'
      toast(message, { type: 'success' })
      setUser(user)
      navigate('/')
    }
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="m-0">
        <img className="m-0" src="https://api.lorem.space/image/album?w=400&h=400" alt="Album" loading="lazy"/>
      </figure>
      <div className="card-body justify-around">
        <div>
          <input
            type={'email'}
            name={'email'}
            placeholder="max@mustermann.de"
            ref={emailRef}
            required
            className="input input-bordered input-error w-full max-w-xs mb-3"
          />
          <input
            type={'password'}
            name={'password'}
            ref={passwordRef}
            placeholder="SuperSecretPassword"
            required
            className="input input-bordered input-error w-full max-w-xs mb-3"
          />
          <Link to="/reset-password">Passwort vergessen</Link>
        </div>

        <div className="justify-between card-actions mt-4 items-center">
          {!isRegister ? <Link to='/register'>Registrieren</Link> : <Link to='/login'>Login</Link>}
          <button onClick={handleClick} className="btn btn-primary">{isRegister ? 'Registrieren' : 'Login'}</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp