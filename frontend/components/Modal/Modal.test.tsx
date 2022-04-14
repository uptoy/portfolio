import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Modal from "./Modal"

test("should shows the children and a close button", () => {
  const name = "Test title"

  const onClose = jest.fn()

  render(<Modal name={name} isVisible={true} onClose={onClose} />)

  const closeButton = screen.getByLabelText(/close/i)
  userEvent.click(closeButton)
  expect(onClose).toHaveBeenCalledTimes(1)
})
