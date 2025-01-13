import { Input } from '@/components/ui/input.tsx'
import { Slider } from '@/components/ui/slider'
import type { ImageSectionData } from '@/components/widgets/widgets-type.d.ts'
import { MAX_IMAGE_BR, MAX_IMAGE_SIZE, MIN_IMAGE_BR, MIN_IMAGE_SIZE } from '@/const/dom.ts'
import type { ChangeEvent } from 'react'

const ImageSectionForm = ({
  data,
  onChange,
}: {
  data: ImageSectionData
  onChange: (value: ImageSectionData) => void
}) => {
  const { propsData } = data
  const { url, imageSize, borderRadius } = propsData

  const handleEventChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onChange({
      ...data,
      propsData: {
        ...propsData,
        [name]: value,
      },
    })
  }

  const handleValueChange = (name: keyof ImageSectionData['propsData'], value: string | number) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        [name]: Number(value),
      },
    })
  }

  return (
    <div>
      {/* 图片 */}
      <div>
        <div className="form-label">
          <span>图片地址</span>
        </div>
        <Input
          name="url"
          value={url}
          placeholder="输入图片地址"
          onChange={handleEventChange}
        />
      </div>
      {/* 图片大小 */}
      <div>
        <div className="form-label">
          <span>图片大小（百分比）</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32 shrink-0"
            name="imageSize"
            type="number"
            min={MIN_IMAGE_SIZE}
            max={MAX_IMAGE_SIZE}
            value={imageSize}
            onChange={e => handleValueChange('imageSize', e.target.value)}
          />
          <Slider
            value={[imageSize]}
            min={MIN_IMAGE_SIZE}
            max={MAX_IMAGE_SIZE}
            step={1}
            onValueChange={val => handleValueChange('imageSize', val[0])}
          />
        </div>
      </div>
      {/* 图片圆角 */}
      <div>
        <div className="form-label">
          <span>图片圆角</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32 shrink-0"
            type="number"
            name="borderRadius"
            value={borderRadius}
            min={MIN_IMAGE_BR}
            max={MAX_IMAGE_BR}
            onChange={e => handleValueChange('borderRadius', e.target.value)}
          />
          <Slider
            value={[borderRadius]}
            min={MIN_IMAGE_BR}
            max={MAX_IMAGE_BR}
            step={1}
            onValueChange={val => handleValueChange('borderRadius', val[0])}
          />
        </div>
      </div>
    </div>
  )
}

export { ImageSectionForm }
