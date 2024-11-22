'use client'
import { useEffect} from "react"
import { useAppContext } from "@/components/ThemeContext";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import axios from "axios"
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";


export default function Country() {
  const router = useRouter()
  const params = useParams()
  const {countries,setCountries,isLight} = useAppContext()
  const slug = params.slug

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
 
  
  if (!countries || countries.length === 0) {
    return <div className="loading h-screen flex justify-center"><div>Loading...</div></div>;
  }

  const country = countries.find((country) => country.cca3 === slug);


  if (!country) {
    return <div className="error h-screen flex justify-center"><div>Country not found!</div></div>;
  }


    return (
      <div className={`p-6 sm:p-12 min-h-screen ${isLight ? "text-[#111517] bg-[#FFFFFF]" : "text-[#FFFFFF] bg-[#202C37]"}`}>
        <button type="button" className={`btn shadow-lg items-center flex gap-2 rounded-md px-6 py-2 ${isLight ? "bg-[#FFFFFF] border border-black/20" : "bg-[#2B3945]"} mb-12`} onClick={() => router.back()}>
        <FaArrowLeftLong />
          <span>Back</span>
        </button>
        <div className="card flex flex-col sm:flex-row sm:justify-between gap-3 w-full ">
          <div className="img-container h-[250px] sm:h-[350px] sm:w-[43%] ">
            < Image
              src = {country.flags.png}
              alt="country image"
              height={300}
              width={300}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="card-body flex flex-col sm:w-[44%] gap-10 p-3">
            
              <h2 className="name font-bold text-3xl">{country.name.common || "N/A"}</h2>
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-3 sm:justify-between">
                <div className="left-flex flex flex-col gap-3">
                  <p className="native-name"> <strong>Native Name: </strong> <span className="text-gray-400"> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A"}</span></p>
                  <p className="population"> <strong>Populaltion: </strong> <span className="text-gray-400"> {country.population.toLocaleString('en-US') || "N/A"}</span></p>
                  <p className="region"> <strong>Region: </strong> <span className="text-gray-400">{country.region || "N/A"}</span> </p>
                  <p className="sub-region"> <strong>Sub Region: </strong> <span className="text-gray-400"> {country.subregion || "N/A"}</span></p>
                  <p className="capital"> <strong>Capital: </strong> <span className="text-gray-400"> {Array.isArray(country.capital) && country.capital.length > 0 ? country.capital[0] : "N/A"}</span></p>
                </div>
                <div className="right-flex flex flex-col gap-3">
                  <p className="top-level-domain"> <strong>Top Level Domain: </strong> <span className="text-gray-400"> {Array.isArray(country.tld) && country.tld.length > 0 ? country.tld[0] : "N/A"}</span></p>
                  <p className="currencies"> <strong>Currencies: </strong> <span className="text-gray-400"> {country.currencies ? Object.values(country.currencies)[0].name : "N/A"}</span></p>
                  <p className="language"> <strong>Language: </strong> <span className="text-gray-400">{country.languages ? Object.values(country.languages)[0] : "N/A"}</span> </p>
                </div>
              </div>
           
              <div className="bottom-flex flex sm:flex-row flex-col items-center gap-4 sm:gap-2 border-countries"> <strong className="whitespace-nowrap">Border Countries:</strong> <div className="borders flex flex-wrap gap-2">{country.borders ? country.borders.map((border,index) => < Link key={index} href={`/country/${border}`} className={`px-8 py-1 text-sm shadow-lg ${isLight ? "bg-[#FFFFFF] border border-black/20" : "bg-[#2B3945]"} rounded-md`} >{border} </Link> ) : "N/A" } </div> </div>
            
          </div>
        </div>

      </div>
    )
 
}
