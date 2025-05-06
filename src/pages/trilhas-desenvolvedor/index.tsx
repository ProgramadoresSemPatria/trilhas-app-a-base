import Header from "../../components/header"
import TrilhasCard from "../../components/trilhas-card"
export default function TrilhasDesenvolvedor() {

  return (
    <>
        <Header />
        <main className="w-full h-full max-w-[96rem] mx-auto text-white p-5 sm:p-8 lg:p-12">
            <h1 className="text-xl sm:text-3xl font-medium sm:mt-5">Trilhas de Desenvolvedor</h1>
            <div className="w-full h-full mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-5">
              <TrilhasCard 
                track={{
                  description: "Descrição", 
                  imageSrc: "./full-stack-js-fe-wise.png",
                  slug: "full-stack-javascript-fe-wise"
                }}/>
              <TrilhasCard 
                track={{
                  description: "Descrição", 
                  imageSrc: "./full-stack-js-be-wise.png",
                  slug: "full-stack-javascript-be-wise"
                }}/>
              <TrilhasCard 
                track={{
                  description: "Descrição", 
                  imageSrc: "./be-node-js.png",
                  slug: "backend-nodejs"
                }}/>
              <TrilhasCard 
                track={{
                  description: "Descrição", 
                  imageSrc: "./full-stack-python-be-wise.png",
                  slug: "full-stack-python-be-wise"
                }}/>
              <TrilhasCard 
                track={{
                  description: "Descrição", 
                  imageSrc: "./python-be.png",
                  slug: "backend-python"
                }}/>
            </div>
        </main>
    </>
  )
}
