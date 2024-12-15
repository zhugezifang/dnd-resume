import { Input } from '@/components/ui/input.tsx'
import type { ImageSectionData } from '@/components/widgets/widgets-type.d.ts'
import type { ChangeEvent } from 'react'

const ImageSectionForm = ({
  data,
  onChange,
}: {
  data: ImageSectionData
  onChange: (value: ImageSectionData) => void
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onChange({ ...data, [name]: value })
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
          value={data.url}
          placeholder="输入图片地址"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export { ImageSectionForm }
