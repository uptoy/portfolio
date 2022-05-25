import { Square } from './Square'

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
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}
