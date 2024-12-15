import { Input } from '@/components/ui/input.tsx'
import type { ExperienceTimeData } from '@/components/widgets/widgets-type.d.ts'
import type { ChangeEvent } from 'react'

const ExperienceTimeForm = ({
  data,
  onChange,
}: {
  data: ExperienceTimeData
  onChange: (value: ExperienceTimeData) => void
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onChange({ ...data, [name]: value })
  }

  return (
    <div>
      {/* 经历内容 */}
      <div>
        <div className="form-label">
          <span>经历内容</span>
        </div>
        <Input
          name="title"
          value={data.title}
          placeholder="输入经历"
          onChange={handleChange}
        />
      </div>
      {/* 起止时间 */}
      <div>
        <div className="form-label">
          <span>起止时间</span>
        </div>
        <Input
          name="dateRange"
          value={data.dateRange}
          placeholder="输入起止时间"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export { ExperienceTimeForm }
