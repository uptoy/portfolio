import { Typography } from '@material-ui/core'
import createStyles from '@material-ui/styles/createStyles'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { Modal } from '../modal'
import { DateRange } from 'src/@types'
import formatDate from 'src/utils/formatDate'
import getDateRanges from 'src/utils/getDateRanges'

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      padding: '15px 10px',
      border: '1px solid transparent',
      borderBottom: '1px solid #ccc',
      cursor: 'pointer',
      background: 'transparent',
      display: 'block',
      width: '100%  '
    }
  })
)

interface Props {
  show: boolean
  onClose(): void
  onSelectDateRange(range: DateRange): void
}

const SelectDateRangeModal: React.FC<Props> = ({ show, onClose, onSelectDateRange }) => {
  const classes = useStyles()

  const dateRanges = getDateRanges()

  const handleSelectDateRange = (range: DateRange) => {
    onSelectDateRange(range)
  }

  return (
    <Modal title="Select Date Range" isVisible={show} onClose={onClose}>
      <div>
        {dateRanges.map((range, idx) => (
          <button key={idx} className={classes.listItem} type="button" onClick={() => handleSelectDateRange(range)}>
            <Typography variant="body1">{range.label}</Typography>
            <Typography variant="body2" color="textSecondary">
              {`${formatDate(range.start_date)} - ${formatDate(range.end_date)}`}
            </Typography>
          </button>
        ))}
      </div>
    </Modal>
  )
}

export default SelectDateRangeModal
