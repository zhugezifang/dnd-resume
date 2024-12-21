import { Input } from '@/components/ui/input.tsx'
import { Slider } from '@/components/ui/slider'
import type { StyleData } from '@/components/widgets/widgets-type'
import type { ChangeEvent } from 'react'

interface StyleFormProps {
  styleData: StyleData
  onStyleChange: (styleData: StyleData) => void
}

const MIN_VAL = 0
const MAX_VAL = 64

function StyleForm({ styleData, onStyleChange }: StyleFormProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onStyleChange({
      ...styleData,
      [name]: Number(value) || 0,
    })
  }

  const handleSliderChange = (name: string, value: number) => {
    onStyleChange({
      ...styleData,
      [name]: value,
    })
  }

  return (
    <ul>
      <li>
        <div className="form-label">
          <span>上边距</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32"
            name="marginTop"
            type="number"
            min={MIN_VAL}
            max={MAX_VAL}
            value={styleData.marginTop}
            onChange={handleInputChange}
          />
          <Slider
            value={[styleData.marginTop]}
            max={MAX_VAL}
            step={1}
            onValueChange={val => handleSliderChange('marginTop', val[0])}
          />
        </div>
      </li>
      <li>
        <div className="form-label">
          <span>下边距</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32"
            name="marginBottom"
            type="number"
            min={MIN_VAL}
            max={MAX_VAL}
            value={styleData.marginBottom}
            onChange={handleInputChange}
          />
          <Slider
            value={[styleData.marginBottom]}
            max={MAX_VAL}
            step={1}
            onValueChange={val => handleSliderChange('marginBottom', val[0])}
          />
        </div>
      </li>
    </ul>
  )
}

export { StyleForm }
