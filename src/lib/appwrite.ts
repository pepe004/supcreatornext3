import { Client, Account, Databases } from 'appwrite'
import { createContext, useContext } from 'react'

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID')

const account = new Account(client)
const databases = new Databases(client)

export const AppwriteContext = createContext({ client, account, databases })

export const useAppwrite = () => useContext(AppwriteContext)

export const AppwriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppwriteContext.Provider value={{ client, account, databases }}>
      {children}
    </AppwriteContext.Provider>
  )
}