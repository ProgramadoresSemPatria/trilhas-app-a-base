import { toast } from "sonner";

export default function ErrorToast({ message }: { message: string }) {
  return (
    toast.error(message, {
        style: {
            background: '#4814b0',
            color: 'white'
        }
    })
  )
}
