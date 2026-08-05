export async function unloadLlamaModel(): Promise<{ success: boolean }> {
  return { success: true }
}

export async function getLoadedModels(): Promise<string[]> {
  return []
}
