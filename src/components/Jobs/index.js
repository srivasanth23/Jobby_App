import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'
import FilterSection from '../FilterSection'
import JobItem from '../JobItem'

import './index.css'

const apiStatuslist = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    activeApiStatus: apiStatuslist.initial,
    jobsList: [],
    activeTypeOfEmployement: [],
    activeSalaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getAlljobsData()
  }

  getAlljobsData = async () => {
    this.setState({activeApiStatus: apiStatuslist.inProgress})
    const {searchInput, activeTypeOfEmployement, activeSalaryRange} = this.state
    const joinEmployementTypes = activeTypeOfEmployement.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${joinEmployementTypes}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      console.log(url)
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(updatedData)
      this.setState({
        activeApiStatus: apiStatuslist.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({activeApiStatus: apiStatuslist.failure})
    }
  }

  activateEmployementType = event => {
    const {activeTypeOfEmployement} = this.state
    const appendElement = event.target.id
    if (event.target.checked) {
      activeTypeOfEmployement.push(appendElement)
    } else {
      activeTypeOfEmployement.pop(appendElement)
    }

    this.setState({activeTypeOfEmployement}, this.getAlljobsData)
    console.log(activeTypeOfEmployement)
    console.log(event.target.checked)
  }

  selectSalaryRange = event => {
    this.setState({activeSalaryRange: event.target.value}, this.getAlljobsData)
  }

  SearchChangeElement = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.getAlljobsData()
    }
  }

  onClickSearchInput = () => this.getAlljobsData()

  renderSearchElement = () => {
    const {searchInput} = this.state

    return (
      <div className="search-container">
        <input
          type="search"
          onChange={this.SearchChangeElement}
          onKeyDown={this.onKeyDownSearchInput}
          className="search-element"
          value={searchInput}
          placeholder="Search"
        />
        <button
          type="button"
          onClick={this.onClickSearchInput}
          data-testid="searchButton"
          className="search-btn"
        >
          <BsSearch className="search-icon" />{' '}
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    const jobsListLen = jobsList.length > 0

    return jobsListLen ? (
      <div className="jobs-list-container">
        <ul className="unordered-job-item-list">
          {jobsList.map(each => (
            <JobItem key={each.id} jobDetails={each} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="jobs-list-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-img"
        />
        <h1 className="failure-heading"> No Jobs Found </h1>
        <p className="failure-para">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading"> Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.getAlljobsData}
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

  renderJobView = () => {
    const {activeApiStatus} = this.state

    switch (activeApiStatus) {
      case apiStatuslist.success:
        return this.renderSuccessView()
      case apiStatuslist.failure:
        return this.renderFailureView()
      case apiStatuslist.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {activeSalaryRange} = this.state

    return (
      <>
        <Header />
        <div className="job-container">
          <div className="filters-container">
            <div className="mobile-view-search">
              {this.renderSearchElement()}
            </div>
            <Profile />
            <FilterSection
              activeSalaryRange={activeSalaryRange}
              activateEmployementType={this.activateEmployementType}
              selectSalaryRange={this.selectSalaryRange}
            />
          </div>
          <div className="jobs-view-container">
            <div className="desktop-view-search">
              {this.renderSearchElement()}
            </div>
            {this.renderJobView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
