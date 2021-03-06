import React from 'react'
import PropTypes from 'prop-types'
import { Manager, Target, Popper } from 'react-popper'

export const popperPlacementPositions = [
  'auto',
  'auto-left',
  'auto-right',
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'top',
  'top-end',
  'top-start'
]

export default class PopperComponent extends React.Component {
  static propTypes = {
    hidePopper: PropTypes.bool,
    popperComponent: PropTypes.element,
    popperModifiers: PropTypes.object, // <datepicker/> props
    popperPlacement: PropTypes.oneOf(popperPlacementPositions), // <datepicker/> props
    targetComponent: PropTypes.element,
    popperClassName: PropTypes.string,
    targetClassName: PropTypes.string
  }

  static get defaultProps () {
    return {
      hidePopper: true,
      popperClassName: "react-datepicker-popper",
      targetClassName: "react-datepicker-wrapper",
      popperModifiers: {
        preventOverflow: {
          enabled: true,
          escapeWithReference: true,
          boundariesElement: 'viewport'
        }
      },
      popperPlacement: 'bottom-start'
    }
  }

  render () {
    const {
      hidePopper,
      popperComponent,
      popperClassName,
      popperModifiers,
      popperPlacement,
      targetComponent,
      targetClassName
    } = this.props

    return (
      <Manager>
        <Target className={targetClassName}>
          {targetComponent}
        </Target>
        {
          !hidePopper &&
          <Popper
              className={popperClassName}
              modifiers={popperModifiers}
              placement={popperPlacement}>
            {popperComponent}
          </Popper>
        }
      </Manager>
    )
  }
}
