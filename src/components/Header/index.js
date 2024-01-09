import {Link, withRouter} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="logo-image"
        />
      </Link>
      <div className="inner-container">
        <ul className="nav-elements">
          <Link to="/" className="link-property">
            <li> Home </li>
          </Link>
          <Link to="/jobs" className="link-property">
            <li> Jobs </li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogOut}>
          Logout
        </button>
        <ul className="nav-elements-mobile">
          <Link to="/" className="link-property-mobile">
            <li>
              <IoMdHome />
            </li>
          </Link>
          <Link to="/jobs" className="link-property-mobile">
            <BsFillBriefcaseFill />
          </Link>
        </ul>
        <button
          type="button"
          className="logout-btn-mobile"
          onClick={onClickLogOut}
        >
          <FiLogOut />{' '}
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
