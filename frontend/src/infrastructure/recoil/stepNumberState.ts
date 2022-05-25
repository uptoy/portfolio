import React from 'react'
import { atom, SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

/**
 * @description 現在のステップ数（何手目か）のstateのAtom
 */
export const stepNumberState = atom<number>({
  key: 'tic-tac-toe/stepNumberState',
  default: 0
})

/**
 * @description 現在のステップ数（何手目か）のstate
 */
export const useStepNumberState = (): number => {
  return useRecoilValue(stepNumberState)
}

interface UseStepNumberStateMutatorType {
  setStepNumberState: (stepNumberState: number) => void
}

/**
 * @description 現在のステップ数（何手目か）のstateをセットする関数
 */
export const useStepNumberStateMutator = (): UseStepNumberStateMutatorType => {
  const setState: SetterOrUpdater<number> = useSetRecoilState(stepNumberState)
  const setStepNumberState = React.useCallback(
    (stepNumberStateArg: number) => {
      setState(stepNumberStateArg)
    },
    [setState]
  )

  return { setStepNumberState }
}
