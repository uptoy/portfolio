import React from 'react'
import { atom, SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

/**
 * @description
 * Atom。X（先手）の手番なら、true。
 */
export const xIsNextState = atom<boolean>({
  key: 'tic-tac-toe/xIsNextState',
  default: true
})

/**
 * @description X（先手）の手番かのstate
 */
export const useXIsNextState = (): boolean => {
  return useRecoilValue(xIsNextState)
}

interface UseXIsNextStateMutatorType {
  setXIsNextState: (xIsNextState: boolean) => void
}

/**
 * @description X（先手）の手番かのstateをセットする関数
 */
export const useXIsNextStateMutator = (): UseXIsNextStateMutatorType => {
  const setState: SetterOrUpdater<boolean> = useSetRecoilState(xIsNextState)
  const setXIsNextState = React.useCallback(
    (XIsNextState: boolean) => {
      setState(XIsNextState)
    },
    [setState]
  )

  return { setXIsNextState }
}
