import TestModal from "./TestModal"
import type { MedicalTest } from "@/types/test"

interface CreateTestModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (test: Omit<MedicalTest, "id">) => void
}

const CreateTestModal = ({ open, onClose, onSubmit }: CreateTestModalProps) => {
  return <TestModal open={open} onClose={onClose} onSubmit={onSubmit} mode="create" />
}

export default CreateTestModal
