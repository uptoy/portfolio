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
