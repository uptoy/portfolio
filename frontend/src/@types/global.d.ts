// 升目に入りうる値
type SquareValueType = null | 'X' | 'O'

/**
 * @description ゲーム履歴の配列の型
 * ex.
 * [
 *  { squares: [null, null, null, null, null, null, null, null, null] },
 *  { squares: [null, null, null, null, null, null, null, 'X', null] },
 *  { squares: [null, null, null, null, 'O', null, null, 'X', null] }
 * ]
 */
type GameHistoryArrType = Array<{ squares: SquareValueType[] }>
