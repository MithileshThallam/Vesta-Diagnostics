import { useAdminStore } from "@/stores/adminStore"

export const updateStats = () => {
  const { updateStats: storeUpdateStats } = useAdminStore.getState()
  storeUpdateStats()
}
