import { FC } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../lib/api'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'

const SubMenu: FC = () => {
  const user = useAuth(state => state.user)

  const handleLogout = async (e: any) => {
    e.preventDefault()
    try {
      await supabase.auth.signOut()
      toast('Sie wurden erfolgreich ausgeloggt.', { type: 'success' })
    } catch (error: any) {
      toast(error.message, { type: 'error' })
    }
  }

  return (
    <>
      <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 right-0">
        {user ? <li><a onClick={handleLogout} href="#">Logout</a></li> : <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Registrieren</Link></li>
        </>}
      </ul>
    </>
  )
}

export default SubMenu