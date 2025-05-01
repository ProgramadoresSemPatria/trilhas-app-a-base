import { cn } from "../../lib/utils"

interface ButtonProps {
    onClick?: () => void
    className?: string
    children: React.ReactNode
    type?: "button" | "submit" | "reset"
}

export default function Button( props: ButtonProps ) {
  return (
    <button 
        onClick={props.onClick}
        className={cn(
            "py-2 bg-[#4814b0] text-white rounded-lg cursor-pointer hover:bg-[#4814b0]/80 transition-colors duration-200",
            props.className
        )}
        type={props.type}
    >
        {props.children}
    </button>
  )
}
