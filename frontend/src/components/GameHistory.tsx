import {
  useHistoryState,
  useStepNumberState,
  useStepNumberStateMutator,
  useXIsNextState,
  useXIsNextStateMutator
} from 'src/infrastructure/recoil'
/**
 * @description [null, null, null, null, null, null, 'X', null, 'O']のような配列
 */
type BoardArrType = SquareValueType[]

/**
 * @description 勝者を判定する。
 */
export const calculateWinner = (squares: BoardArrType): SquareValueType => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (const line of lines) {
    const [a, b, c] = line
    // 縦、横、対角線 で3つXあるいは、Oが連続すれば、連続したvalueを返す。
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

/**
 * @description 三目ならべのゲーム履歴機能のコンポーネント
 */
export const GameHistory: React.FC = () => {
  // ゲーム履歴の配列
  const historyArr: GameHistoryArrType = useHistoryState()

  // 現在のステップ数（何手目か。）
  const stepNumber: number = useStepNumberState()
  const { setStepNumberState } = useStepNumberStateMutator()

  // X（先手）の手番か。
  const xIsNext: boolean = useXIsNextState()
  const { setXIsNextState } = useXIsNextStateMutator()

  const current: { squares: SquareValueType[] } = historyArr[stepNumber]

  // 勝者判定
  const winner: SquareValueType = calculateWinner(current.squares)

  const jumpTo = (step: number): void => {
    setStepNumberState(step)
    const isXNext = step % 2 === 0
    setXIsNextState(isXNext)
  }

  // N手目に戻る。or ゲームを最初から始める。
  const moves: JSX.Element[] = historyArr.map((step, moveNumber: number) => {
    const description: string = moveNumber ? `Go to move #${moveNumber}` : 'Go to game start'

    return (
      <li key={moveNumber}>
        <button
          onClick={() => {
            jumpTo(moveNumber)
          }}
        >
          {description}
        </button>
      </li>
    )
  })

  // 勝者 or 次の手番の表示
  const getStatus = (winnerStr: SquareValueType): string => {
    if (winnerStr) {
      return 'Winner: ' + winnerStr
    }
    return 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  const status: string = getStatus(winner)

  return (
    <div className="game-info">
      <div data-cy="winner_status">{status}</div>
      <ol>{moves}</ol>
    </div>
  )
}
