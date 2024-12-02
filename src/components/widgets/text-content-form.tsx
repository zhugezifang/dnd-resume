import type { ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import type { TextContentData } from '@/components/widgets/widgets-util.ts'

const TextContentForm = ({
  data,
  onChange,
}: {
  data: TextContentData
  onChange: (value: TextContentData) => void
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onChange({ ...data, [name]: value })
  }

  return (
    <div>
      {/* 文本内容 */}
      <div>
        <div className="form-label">
          <span>文本内容</span>
        </div>
        <Input
          name="content"
          value={data.content}
          placeholder="输入文本内容"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export { TextContentForm }
