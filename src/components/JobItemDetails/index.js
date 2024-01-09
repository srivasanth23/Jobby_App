import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Cookies from 'js-cookie'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobDetails: [],
    activeApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    this.setState({activeApiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const struturedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const struturedSimilarData = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        activeApiStatus: apiStatusConstants.success,
        jobItemDetails: struturedData,
        similarJobDetails: struturedSimilarData,
      })
    } else {
      this.setState({activeApiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccesView = () => {
    const {jobItemDetails, similarJobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItemDetails

    return (
      <div className="aligner">
        <div className="job-item-details-container">
          <div className="about-company-div">
            <img
              src={companyLogoUrl}
              className="companyLogoUrl"
              alt="job details company logo"
            />
            <div className="company-details">
              <h1 className="company-title-i">{title}</h1>
              <div className="company-rating">
                <AiFillStar className="star" />
                <p className="rating"> {rating}</p>
              </div>
            </div>
          </div>
          <div className="other-details-div">
            <div>
              <div className="company-icon-container">
                <MdLocationOn className="icons" />
                <p className="icon-label"> {location}</p>
              </div>
              <div className="company-icon-container">
                <BsBriefcaseFill className="icons" />
                <p className="icon-label"> {employmentType}</p>
              </div>
            </div>
            <p className="package"> {packagePerAnnum}</p>
          </div>
          <hr className="horizontal-item" />
          <div className="description-container">
            <div className="description-link-div">
              <h1 className="job-item-heading">Description</h1>
              <a href={companyWebsiteUrl} className="visit-link">
                Visit <BiLinkExternal />
              </a>
            </div>
            <p className="job-item-description">{jobDescription}</p>
          </div>
          <div className="job-details-skills-container">
            <h1 className="job-item-heading">Skills</h1>
            <ul className="job-details-skills-items-container">
              {skills.map(eachSkill => (
                <li key={eachSkill.name} className="skill-item">
                  <img
                    className="skill-img"
                    src={eachSkill.image_url}
                    alt={eachSkill.name}
                  />
                  <p className="skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="job-item-heading">Life at Company</h1>
          <div className="job-details-life-at-company-container">
            <p className="job-item-description">{lifeAtCompany.description}</p>
            <img
              width="100%"
              height="230px"
              src={lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading"> Similar Jobs </h1>
        <div className="similar-jobs-container">
          <ul className="unordered-list-similar-jobs-container">
            {similarJobDetails.map(each => (
              <SimilarJobItem key={each.id} jobDetails={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  onRetry = () => this.getJobItemDetails()

  renderFailureView = () => (
    <div className="job-item-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading"> Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.onRetry}
      >
        Retry
      </button>
    </div>
  )

  renderItemDetailView = () => {
    const {activeApiStatus} = this.state

    switch (activeApiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccesView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="detail-item-view-container">
          {this.renderItemDetailView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
