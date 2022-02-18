import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import SubMenu from './SubMenu'

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
      <div className="xl:container xl:mx-auto">
    <div className="navbar bg-base-100 sticky top-0">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" to="/">Shopping Liste</Link>
        </div>
        <div className="flex-none">
          <div className="dropdown">
            <button onClick={toggleIsOpen} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   className="inline-block w-5 h-5 stroke-current">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
            <SubMenu/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header