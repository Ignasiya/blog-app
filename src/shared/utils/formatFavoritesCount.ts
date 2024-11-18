export const formatFavoritesCount = (favoritesCount: number) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2
  }).format(favoritesCount)
}
