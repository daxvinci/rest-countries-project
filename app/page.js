'use client'
import Card from "@/components/Card";
import { FaSearch } from "react-icons/fa";
import { useAppContext } from "@/components/ThemeContext";
import axios from "axios"
import { useEffect } from "react";



export default function Home() {

  const {filter,setFilter,search,setSearch,countries,setCountries,isLight} = useAppContext()

  useEffect(()=>{
    const fetchData = async()=>{
      try{
      const {data} = await axios.get("https://restcountries.com/v3.1/all")
      setCountries(data)
      console.log(data)
      }catch(err){
        console.log(err)
      }
    }

    fetchData()
    
  },[setCountries])

  useEffect(() => {
    console.log(countries);
  }, [countries]);
  

  const handleChange =(e)=>{
    const {value} = e.target
    setFilter(value)
    console.log(value)
  }

  const handleSearch =(e)=>{
    const {value} = e.target
    setSearch(value)
    console.log(value)
  }

  return (
    <div className={`flex flex-col min-h-screen ${isLight ? "text-[#111517] bg-[#FAFAFA]" : "text-[#FFFFFF] bg-[#202C37]"} font-[family-name:var(--font-geist-sans)]`}>
      
        <div className="search-filter-container flex sm:flex-row flex-col p-6 sm:p-12 gap-6 sm:gap-2 justify-between">
          <label htmlFor="search" className={`flex sm:w-[50%] hover:ring-2 shadow-xl hover:ring-sky-400/70 rounded-md py-1 md:py-2 px-2 md:px-5 items-center gap-2 ${isLight ? "bg-[#FFFFFF]" : "bg-[#2B3945]"}`}>
              <FaSearch />
              <input type="search" id="search" placeholder="Search for a Country...." autoComplete="off" className={` ${isLight ? "bg-[#FFFFFF]" : "bg-[#2B3945]"} w-full outline-none`} onChange={handleSearch}/>
          </label>

          <div className="relative w-48">
            <select
              onChange={handleChange}
              className={`block w-full ${isLight ? "bg-[#FFFFFF]" : "bg-[#2B3945]"} border-gray-300 rounded-md h-full shadow-xl px-4 py-2 text-sm hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200 ease-in-out`}
            >
              <option value="">
                Filter
              </option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="Antarctic">Antarctic</option>
            </select>
          </div>

        </div>
        <main className="grid sm:grid-cols-3 p-12 md:grid-cols-4 gap-6 auto-rows-fr">
          {countries && countries.filter(country=>country.region.toLowerCase().includes(filter.toLowerCase()) )
          .filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
          .map((country,index) => < Card key={index} country = {country} />)}
        </main>
      
    </div>
  );
}
