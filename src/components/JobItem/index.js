import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    employmentType,
    companyLogoUrl,
    id,
    title,
    rating,
    packagePerAnnum,
    location,
    jobDescription,
  } = jobDetails

  return (
    <li className="jobs-list-item">
      <Link to={`/jobs/${id}`} className="link-element">
        <div className="about-company-div">
          <img
            src={companyLogoUrl}
            className="companyLogoUrl"
            alt="compony logo"
          />
          <div className="company-details">
            <h1 className="company-title">{title}</h1>
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
          <h1 className="job-item-description-heading">Description</h1>
          <p className="job-item-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
