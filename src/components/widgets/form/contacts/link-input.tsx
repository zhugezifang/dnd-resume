import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { Link } from 'lucide-react'

interface LinkInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const LinkInput = ({ value, onChange, className }: LinkInputProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={className}
          variant="outline"
          size="icon"
        >
          <Link />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-52"
        align="end"
      >
        <div className="flex flex-wrap justify-between">
          <Input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="输入链接地址"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { LinkInput }
