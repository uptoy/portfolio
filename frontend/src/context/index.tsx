import React, { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'
interface IProps {
  children: ReactNode
}

const ContextProvider: React.FC<IProps> = ({ children }) => <AuthProvider>{children}</AuthProvider>

export default ContextProvider
