import { Square } from './Square'
import { Box } from '@mui/material'

interface BoardPropsType {
  squares: SquareValueType[]
  onClick: (i: number) => void
}

/**
 * @description 三目ならべの盤面のコンポーネント
 */
export const Board: React.FC<BoardPropsType> = (props) => {
  const renderSquare = (i: number): JSX.Element => {
    return (
      <Square
        value={props.squares[i]}
        squareIndex={i}
        onClick={() => {
          props.onClick(i)
        }}
      />
    )
  }

  return (
    <Box>
      <Box>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Box>
      <Box component="div">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Box>
      <Box component="div">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Box>
    </Box>
  )
}
