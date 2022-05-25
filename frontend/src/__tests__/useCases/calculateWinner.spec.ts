import { calculateWinner } from '@/useCases/calculateWinner'

describe('三目並べ勝者判定の関数 calculateWinner', (): void => {
  test('勝者なし（引き分け）', (): void => {
    const winner = calculateWinner(['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'])
    expect(winner).toBeNull()
  })
  test('上横一列で先手（X）勝ち。', (): void => {
    const winner = calculateWinner(['X', 'X', 'X', 'O', 'O', null, null, null, null])
    expect(winner).toBe('X')
  })
  test('下横一列で後手（O）勝ち。', (): void => {
    const winner = calculateWinner(['X', null, null, 'X', 'X', null, 'O', 'O', 'O'])
    expect(winner).toBe('O')
  })
})
