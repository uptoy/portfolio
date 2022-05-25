interface SquarePropsType {
  value: SquareValueType
  // テスト用index
  squareIndex: number
  onClick: () => void
}
/**
 * @description 三目ならべの升目のコンポーネント
 *
 * button の data-cy は、Cypress の DOM取得用
 * Selecting Elements - Cypress Best Practices
 * https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
 */
export const Square: React.FC<SquarePropsType> = ({ value, squareIndex, onClick }) => {
  return (
    <button className="square" onClick={onClick} data-cy={`square_${squareIndex}`}>
      {value}
    </button>
  )
}
