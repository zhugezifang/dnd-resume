import { Input } from '@/components/ui/input.tsx'
import type { TitleSectionData } from '@/components/widgets/widgets-type.d.ts'
import type { ChangeEvent } from 'react'

const TitleSectionForm = ({
  data,
  onChange,
}: {
  data: TitleSectionData
  onChange: (value: TitleSectionData) => void
}) => {
  const { propsData } = data

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onChange({
      ...data,
      propsData: {
        ...propsData,
        [name]: value,
      },
    })
  }

  return (
    <div>
      {/* 标题 */}
      <div>
        <div className="form-label">
          <span>标题内容</span>
        </div>
        <Input
          name="title"
          value={propsData.title}
          placeholder="输入标题内容"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export { TitleSectionForm }
