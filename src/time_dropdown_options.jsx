import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class TimeDropdownOptions extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    values: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    scrollableTimeDropdown: PropTypes.bool,
    isHour: PropTypes.bool
  }

  renderOptions = () => {
    let key = this.props.isHour ? "hour_":"minute_";
    return this.props.values.map((value, i) =>
      <div className="react-datepicker__month-option"
          key={`${key}` + `${value}`}
          ref={value}
          onClick={this.onChange.bind(this, value)}>
        {this.props.value === i ? <span className="react-datepicker__month-option--selected">✓</span> : ''}
        {value}
      </div>
    )
  }

  onChange = (value) => this.props.onChange(value)

  handleClickOutside = () => this.props.onCancel()

  render () {
    let dropdownClass = classNames({
      'react-datepicker__time-dropdown': true,
      'react-datepicker__time-dropdown--scrollable': this.props.scrollableTimeDropdown
    })
    return (
      <div className={dropdownClass}>
        {this.renderOptions()}
      </div>
    )
  }
}