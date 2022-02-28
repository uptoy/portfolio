import React, { FormEvent, ReactNode, VFC } from "react"

interface Props {
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export const Form: VFC<Props> = ({ onSubmit, children }) => {
  console.log("Form component")
  return (
    <>
      <form className="flex flex-col justify-center items-center" onSubmit={onSubmit}>
        {children}
      </form>
    </>
  )
}
