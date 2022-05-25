import React from 'react'
import { atom, SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

/**
 * @description ゲーム履歴配列のstateのatom
 */
export const historyState = atom<GameHistoryArrType>({
  key: 'tic-tac-toe/historyState',
  default: new Array({ squares: Array(9).fill(null) })
})

/**
 * @description ゲーム履歴配列のstate
 */
export const useHistoryState = (): GameHistoryArrType => {
  return useRecoilValue(historyState)
}

interface UseHistoryStateMutatorType {
  setHistoryState: (gameHistoryState: GameHistoryArrType) => void
}

/**
 * @description ゲーム履歴配列のstateをセットする関数
 */
export const useHistoryStateMutator = (): UseHistoryStateMutatorType => {
  const setState: SetterOrUpdater<GameHistoryArrType> = useSetRecoilState(historyState)
  const setHistoryState = React.useCallback(
    (gameHistoryState: GameHistoryArrType) => {
      setState(gameHistoryState)
    },
    [setState]
  )

  return { setHistoryState }
}
