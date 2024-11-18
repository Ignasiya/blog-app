type Props = {
  className?: string
  width?: number
  height?: number
}

export function CloseIcon({ className, width = 24, height = 24 }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      width={width}
      height={height}
      strokeWidth={1.5}
      stroke='currentColor'
      className={className}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
    </svg>
  )
}
