import { LinkIconComponent, linkIconNames } from '@/components/common/link-icons.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'

interface LinkIconSelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const IconSelect = ({ value, onChange, className }: LinkIconSelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={className}
          variant="outline"
          size="icon"
        >
          {LinkIconComponent(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-52"
        align="start"
      >
        <div className="flex flex-wrap justify-between">
          {linkIconNames.map(item => (
            <Button
              key={item}
              variant="outline"
              size="icon"
              className="mb-2"
              onClick={() => onChange(item)}
            >
              {LinkIconComponent(item)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { IconSelect }
