import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "./ThemeContext";

export default function Card({country}) {
  const {isLight} = useAppContext()
  return (
    <Link href={`/country/${country.cca3}`} className={`card flex flex-col shadow-xl rounded-lg overflow-hidden w-full h-[350px] ${isLight ? "bg-[#FFFFFF] text-[#111517]" : "bg-[#2B3945] text-[#FFFFFF]"}`}>
      <div className="img-container w-full h-1/2">
        < Image
          src = {country.flags.png}
          alt="country image"
          height={300}
          width={300}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="card-body flex flex-col gap-2 p-3">
        <h2 className="name text-xl font-bold">{country.name.common || "N/A"}</h2>
        <p className="population"> <strong className="font-semibold">Populaltion: </strong> <span className="text-gray-400"> {country.population.toLocaleString('en-US') || "N/A"}</span></p>
        <p className="region"> <strong className="font-semibold">Region: </strong> <span className="text-gray-400"> {country.region || "N/A"}</span></p>
        <p className="capital"> <strong className="font-semibold">Capital: </strong> <span className="text-gray-400">{Array.isArray(country.capital) && country.capital.length > 0 ? country.capital[0] : "N/A"}</span> </p>
      </div>
    </Link>
  )
}
