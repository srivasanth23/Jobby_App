import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterSection = props => {
  const {activateEmployementType, selectSalaryRange, activeSalaryRange} = props

  return (
    <div className="filter-view-container">
      <hr className="horizontal-line" />
      <h1 className="filter-heading"> Type of Employement </h1>
      <ul className="filter-unordered-list">
        {employmentTypesList.map(each => (
          <li className="filter-list-element" key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              onClick={activateEmployementType}
            />
            <label
              htmlFor={each.employmentTypeId}
              className="filter-label-element"
            >
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="horizontal-line" />
      <h1 className="filter-heading"> Salary Range </h1>
      <ul className="filter-unordered-list">
        {salaryRangesList.map(each => (
          <li className="filter-list-element" key={each.salaryRangeId}>
            <input
              type="radio"
              id={each.salaryRangeId}
              checked={activeSalaryRange === each.salaryRangeId}
              value={each.salaryRangeId}
              onChange={selectSalaryRange}
            />
            <label
              htmlFor={each.salaryRangeId}
              className="filter-label-element"
            >
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="mobile-view-horizontal" />
    </div>
  )
}

export default FilterSection
