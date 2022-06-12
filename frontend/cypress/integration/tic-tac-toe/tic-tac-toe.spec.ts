/**
 * @description 三目ならべの盤面のコンポーネント
 */
describe('三目ならべ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('次の手番は、先手（X）', () => {
    cy.get('[data-cy=square_0]').click()
    cy.get('[data-cy=square_1]').click()
    cy.get('[data-cy=winner_status]').should('have.text', 'Next player: X')
  })
  it('次の手番は、後手（O）', () => {
    cy.get('[data-cy=square_0]').click()
    cy.get('[data-cy=winner_status]').should('have.text', 'Next player: O')
  })
  it('先手（X）上横一列勝ち', () => {
    cy.get('[data-cy=square_0]').click()
    cy.get('[data-cy=square_3]').click()
    cy.get('[data-cy=square_1]').click()
    cy.get('[data-cy=square_4]').click()
    cy.get('[data-cy=square_2]').click()
    cy.get('[data-cy=winner_status]').should('have.text', 'Winner: X')
  })
  it('後手（O）下一列勝ち', () => {
    cy.get('[data-cy=square_0]').click()
    cy.get('[data-cy=square_6]').click()
    cy.get('[data-cy=square_3]').click()
    cy.get('[data-cy=square_7]').click()
    cy.get('[data-cy=square_1]').click()
    cy.get('[data-cy=square_8]').click()
    cy.get('[data-cy=winner_status]').should('have.text', 'Winner: O')
  })
})
