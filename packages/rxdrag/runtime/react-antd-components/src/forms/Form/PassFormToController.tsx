import { useForm } from "@rxdrag/react-fieldy"
import { useController } from "@rxdrag/react-runner"
import { useEffect } from "react"

export const PassFormToController = () => {
  const form = useForm()
  const controller = useController()
  useEffect(() => {
    if (controller) {
      controller.fieldyNode = form
    }
  }, [controller, form])
  return undefined
}