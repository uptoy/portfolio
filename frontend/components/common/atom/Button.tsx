import { VFC } from "react"

export interface Props {
  type?: "submit" | "reset" | "button" | undefined
  disabled?: boolean
  label?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: VFC<Props> = ({ type, disabled, label }) => {
  console.log("Button component")
  return (
    <>
      <button
        type={type}
        disabled={!disabled}
        className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
      >
        {label}
      </button>
    </>
  )
}
