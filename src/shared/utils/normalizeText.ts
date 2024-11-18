export const normalizeText = (text: string) => {
  const normalized = text.normalize('NFD')
  const stripped = normalized.replace(/[\u0300-\u036f]/g, '')
  return stripped
}
