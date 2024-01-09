import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Profile extends Component {
  state = {
    profileDetails: {},
    activeApiStatus: apiStatusList.initial,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    this.setState({activeApiStatus: apiStatusList.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        activeApiStatus: apiStatusList.success,
      })
    } else {
      this.setState({activeApiStatus: apiStatusList.failure})
    }
  }

  renderSuccesView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profilepic" />
        <h1 className="profile-name"> {name}</h1>
        <p className="profile-bio"> {shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="profile-failure-view">
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.getUserDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderProfileView = () => {
    const {activeApiStatus} = this.state

    switch (activeApiStatus) {
      case apiStatusList.success:
        return this.renderSuccesView()
      case apiStatusList.failure:
        return this.renderFailureView()
      case apiStatusList.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-section"> {this.renderProfileView()}</div>
  }
}

export default Profile
