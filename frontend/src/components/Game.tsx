import React from 'react'

import { Board } from '@/components/Board'
import { GameHistory } from '@/components/GameHistory'
import {
  useHistoryState,
  useHistoryStateMutator,
  useStepNumberState,
  useStepNumberStateMutator,
  useXIsNextState,
  useXIsNextStateMutator
} from '@/infrastructure/recoil'
import { calculateWinner } from '@/useCases/calculateWinner'

/**
 * @description 三目ならべのルートコンポーネント
 */
export const Game: React.FC = () => {
  // ゲーム履歴の配列
  const historyArr: GameHistoryArrType = useHistoryState()
  const { setHistoryState } = useHistoryStateMutator()

  // 現在のステップ数（何手目か。）
  const stepNumber: number = useStepNumberState()
  const { setStepNumberState } = useStepNumberStateMutator()

  // X（先手）の手番か。
  const xIsNext: boolean = useXIsNextState()
  const { setXIsNextState } = useXIsNextStateMutator()

  // 升目をクリックしたときに以下のstateを更新する。
  // ゲーム履歴配列に新しく履歴追加。
  // 手数と次の手番更新。
  const handleClick = (indexNumber: number): void => {
    const beforeUpdatedHistory: GameHistoryArrType = historyArr.slice(0, stepNumber + 1)

    const current: { squares: SquareValueType[] } = beforeUpdatedHistory[beforeUpdatedHistory.length - 1]
    const squaresArr: SquareValueType[] = current.squares.slice()

    const isNotSquaresNull = squaresArr[indexNumber] !== null

    if (calculateWinner(squaresArr) || isNotSquaresNull) {
      return
    }

    // 三目並べ盤配列に、クリックを反映。
    // 先手なら、X。後手なら、O
    squaresArr[indexNumber] = xIsNext ? 'X' : 'O'

    // ゲーム履歴に最新の盤配列の状態を反映。
    const updatedHistory: GameHistoryArrType = beforeUpdatedHistory.concat([{ squares: squaresArr }])

    // Recoil で state をアップデート
    setHistoryState(updatedHistory)
    setStepNumberState(beforeUpdatedHistory.length)
    setXIsNextState(!xIsNext)
  }

  const current: { squares: SquareValueType[] } = historyArr[stepNumber]

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => {
            handleClick(i)
          }}
        />
      </div>
      <div className="game-info">
        <GameHistory />
      </div>
    </div>
  )
}
