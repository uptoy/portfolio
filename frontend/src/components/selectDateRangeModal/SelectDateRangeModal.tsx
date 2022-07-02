import { Typography, Button } from '@mui/material'
import React from 'react'
import { Modal } from '../modal'
import { DateRange } from 'src/@types'
import formatDate from 'src/utils/formatDate'
import getDateRanges from 'src/utils/getDateRanges'


interface Props {
  show: boolean
  onClose(): void
  onSelectDateRange(range: DateRange): void
}

const SelectDateRangeModal: React.FC<Props> = ({ show, onClose, onSelectDateRange }) => {
  // const classes = useStyles()

  const dateRanges = getDateRanges()

  const handleSelectDateRange = (range: DateRange) => {
    onSelectDateRange(range)
  }

  return (
    <Modal title="Select Date Range" isVisible={show} onClose={onClose}>
      <div>
        {dateRanges.map((range, idx) => (
          <Button
            key={idx}
            sx={{
              padding: '15px 10px',
              border: '1px solid transparent',
              borderBottom: '1px solid #ccc',
              cursor: 'pointer',
              background: 'transparent',
              display: 'block',
              width: '100%  '
            }}
            type="button"
            onClick={() => handleSelectDateRange(range)}
          >
            <Typography variant="body1">{range.label}</Typography>
            <Typography variant="body2" color="textSecondary">
              {`${formatDate(range.start_date)} - ${formatDate(range.end_date)}`}
            </Typography>
          </Button>
        ))}
      </div>
    </Modal>
  )
}

export default SelectDateRangeModal
