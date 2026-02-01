import { useState } from 'react'
import { useAuthHook } from '../../context/Contextdata'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SearchBar from '../SearchBar';

const Navbar = () => {
  const { user, Logout } = useAuthHook()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const handleSession = () => {
    if (!user) {
      toast.error('Please Login first!')
      return
    }
    navigate(`/addidea/${id}`)
  }

  const handleProfile = () => {
    if (!user) {
      toast.error('Please Login first!')
      return
    }
    navigate(`/profile/${id}`)
  }

  return (
    <header className='header-container'>
      <h1 className='nav-heading'>
        <span style={{ color: '#3AB0A6' }}>O</span>rigin
      </h1>

      <nav className='nav-container'>
        <ul>
          <li onClick={handleSession}><Link to='/addidea'>Create</Link></li>
          {user ? (
            <li onClick={Logout}>Logout</li>
          ) : (
            <li><Link to='/login'>Login</Link></li>
          )}
        </ul>
      </nav>

      <div className="feed-header">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div>
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            onClick={handleProfile}
            className="profile-img"
          />
        ) : (
          <div className="profile-placeholder" onClick={handleProfile}>
            No Image
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
