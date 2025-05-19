import Header from "../../components/header"
import TrilhasCard from "../../components/trilhas-card"
export default function TrilhasDados() {
  return (
    <>
        <Header />
        <main className="w-full h-full max-w-[96rem] mx-auto text-white p-5 sm:p-8 lg:p-12 ">
            <h1 className="text-xl sm:text-3xl font-medium sm:mt-5">Trilhas de Dados</h1>
            <div className="w-full h-full mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <TrilhasCard 
                track={{
                  description: "Descrição", 
                  imageSrc: "./data-science.png",
                  slug: "data-science"
                }}/>
              <TrilhasCard 
                track={{
                  description: "Descrição", 
                  imageSrc: "./data-engineering.png",
                  slug: "data-engineering"
                }}/>
              <TrilhasCard 
                track={{
                  description: "Descrição", 
                  imageSrc: "./artificial-intelligence.png",
                  slug: "artificial-intelligence"
                }}/>
            </div>
        </main>
    </>
  )
}
