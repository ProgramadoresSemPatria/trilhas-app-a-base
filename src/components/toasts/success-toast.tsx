import { toast } from "sonner";

export default function SuccessToast({ message }: { message: string }) {
  return (
    toast.success(message, {
        style: {
            background: '#27c394',
            color: 'white'
        }
    })
  )
}
