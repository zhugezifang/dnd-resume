import { linkIconsMap } from '@/components/common/link-icons.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'

interface LinkIconSelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const LinkIconSelect = ({ value, onChange, className }: LinkIconSelectProps) => {
  const iconNames = Object.keys(linkIconsMap)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={className}
          variant="outline"
          size="icon"
        >
          {linkIconsMap[value]?.({ width: '1em', height: '1em' })}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-52"
        align="start"
      >
        <div className="flex flex-wrap justify-between">
          {iconNames.map(item => (
            <Button
              key={item}
              variant="outline"
              size="icon"
              className="mb-2"
              onClick={() => onChange(item)}
            >
              {linkIconsMap[item]({ width: '1em', height: '1em' })}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { LinkIconSelect }
