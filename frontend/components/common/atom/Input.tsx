import React, { ChangeEvent, ReactNode, VFC, FC } from "react"

interface Props {
  label: string
  type: string
  name: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  ref?: any
}

export const Input: VFC<Props> = ({ ref, label, type, name, value, onChange, placeholder }) => {
  console.log("Input component")
  return (
    <>
      <label>{label}</label>
      <input
        className="mb-3 px-3 py-2 border border-gray-300"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        ref={ref}
      />
    </>
  )
}
