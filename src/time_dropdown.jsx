import React from 'react'
import PropTypes from 'prop-types'
import TimeDropdownOptions from './time_dropdown_options'
import onClickOutside from 'react-onclickoutside'
import moment from 'moment'

const WrappedTimeDropdownOptions = onClickOutside(TimeDropdownOptions)

function getValues(isHour, filter) {
  let i = 0;
  let j = isHour ? 24:60;
  let a = [];
  for (;i<j;i++)
    a[i] = i;
  if (filter)
    a = filter(a);
  return a;
}

export default class TimeDropdown extends React.Component {
  static propTypes = {
    dropdownMode: PropTypes.oneOf(['scroll', 'select']).isRequired,
    locale: PropTypes.string,
    dateFormat: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    isHour: PropTypes.bool,
    scrollableTimeDropdown: PropTypes.bool,
    timeValueFilter: PropTypes.func
  }

  state = {
    dropdownVisible: false
  }

  renderSelectOptions = values => {
    let key = this.props.isHour ? "hour_":"minute_"
    return values.map((M, i) => (
      <option key={`${key}` + `${i}`} value={i}>{M}</option>
    ))
  }

  renderSelectMode = values => (
    <select value={this.props.month} className="react-datepicker__time-select" onChange={e => this.onChange(e.target.value)}>
      {this.renderSelectOptions(values)}
    </select>
  )

  renderReadView = (visible, values) => (
    <div key={"read" + `${this.props.isHour ? "_hour":"_minute"}`} style={{visibility: visible ? 'visible' : 'hidden'}} className="react-datepicker__time-read-view" onClick={this.toggleDropdown}>
      <span className="react-datepicker__time-read-view--selected-month">{this.props.value}</span>
      <span className="react-datepicker__time-read-view--down-arrow" />
    </div>
  )

  renderDropdown = values => (
    <WrappedTimeDropdownOptions
        isHour={this.props.isHour}
        key="dropdown"
        ref="options"
        value={this.props.value}
        values={values}
        onChange={this.onChange}
        scrollableTimeDropdown={this.props.scrollableTimeDropdown}
        onCancel={this.toggleDropdown} />
  )

  renderScrollMode = (monthNames) => {
    const { dropdownVisible } = this.state
    let result = [this.renderReadView(!dropdownVisible, monthNames)]
    if (dropdownVisible) {
      result.unshift(this.renderDropdown(monthNames))
    }
    return result
  }

  onChange = (value) => {
    this.toggleDropdown()
    if (value !== this.props.value) {
      this.props.onChange(value)
    }
  }

  toggleDropdown = () => this.setState({
    dropdownVisible: !this.state.dropdownVisible
  })

  render () {
    const localeData = moment.localeData(this.props.locale)
    const values = getValues(this.props.isHour, this.props.timeValueFilter);

    let renderedDropdown
    switch (this.props.dropdownMode) {
      case 'scroll':
        renderedDropdown = this.renderScrollMode(values)
        break
      case 'select':
        renderedDropdown = this.renderSelectMode(values)
        break
    }

    return (
      <div
          className={`react-datepicker__time-dropdown-container react-datepicker__time-dropdown-container--${this.props.dropdownMode}`}>
        {renderedDropdown}
      </div>
    )
  }
}
