export default function ProgresBar({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center gap-2 mb-5">
        {(progress).toFixed(0)}% Concluído
        <div className="flex-start flex h-3 w-60 overflow-hidden rounded-full bg-white font-sans text-xs font-medium">
            <div 
                className="flex items-center justify-center h-full overflow-hidden text-white break-all bg-[#31eeb4] rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${progress}%` }}>
            </div>
        </div>
    </div>
  )
}