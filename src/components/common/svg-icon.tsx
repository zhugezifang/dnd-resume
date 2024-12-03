export type IconName =
  | 'bold'
  | 'bullet-list'
  | 'code'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'italic'
  | 'link'
  | 'ordered-list'
  | 'paragraph'
  | 'redo'
  | 'strike'
  | 'undo'

interface SvgIconProps {
  name: IconName
  size?: number
}
const SvgIcon = (props: SvgIconProps) => {
  const size = props.size || 16
  const style = {
    width: size + 'px',
    height: size + 'px',
  }
  const symbolId = `#svg-icon-${props.name}`

  return (
    <svg
      style={style}
      aria-hidden="true"
      className="overflow-hidden fill-current"
    >
      <use href={symbolId} />
    </svg>
  )
}

export { SvgIcon }
