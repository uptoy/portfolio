import {
  useHistoryState,
  useStepNumberState,
  useStepNumberStateMutator,
  useXIsNextState,
  useXIsNextStateMutator
} from '@/infrastructure/recoil'
import { calculateWinner } from '@/useCases/calculateWinner'

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
    return 'Next playerNext player: ' + (xIsNext ? 'X' : 'O')
  }

  const status: string = getStatus(winner)

  return (
    <div className="game-info">
      <div data-cy="winner_status">{status}</div>
      <ol>{moves}</ol>
    </div>
  )
}
