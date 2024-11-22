'use client'
import Link from "next/link";
import { FaMoon } from "react-icons/fa";
import { useAppContext } from "@/components/ThemeContext";


export default function Navbar() {
  const {isLight,setIsLight} = useAppContext()
  function handleLight(){
    setIsLight(prev => !prev)
  }
  return (
    <>
    <nav className={` shadow-2xl ${isLight ? 'bg-[#FFFFFF] text-[#111517] border-b-2' : 'bg-[#2B3945] text-[#FFFFFF]'}`}>
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <Link href="/" className="flex text-xs sm:text-base sm:items-stretch sm:justify-start">
        <div className="font-extrabold">
            Where in the World?
        </div>
        
      </Link>
        <div onClick={handleLight} className = "dark-mode-container text-xs sm:text-base cursor-pointer flex gap-2 items-center">
        {/* < Image
                src="https://tailwindui.com/plus/img/logos/mark.svg"
                alt="logo"
                className="h-8 w-auto"
                width={20}
                height={20}
             /> */}
             <FaMoon color={isLight ? "#10161b" : "white"} />
             <span>{isLight ? "Dark Mode" : "Light Mode"}</span>
        </div>

    </div>
  </div>

 
</nav>

    </>
  )
}
