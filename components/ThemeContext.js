'use client'

import { createContext, useContext,useState } from "react";

const AppContext = createContext()


export default function ThemeContext({children}) {
    const [filter, setFilter] = useState("")
    const [search,setSearch] = useState("")
    const [countries,setCountries] = useState([])
    const [isLight, setIsLight] = useState(true)
  return (
    < AppContext.Provider value={{filter,setFilter,search,setSearch,countries,setCountries,isLight,setIsLight}}>
        {children}
    </AppContext.Provider>
  )
}

export function useAppContext(){
    const useApp = useContext(AppContext)
    if (!useApp) {
        throw new Error('useAppContext must be used within an AppProvider');
      }
    return useApp;
}
