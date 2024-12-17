import type { ExperienceTimeData } from '@/components/widgets/widgets-type.d.ts'

interface ExperienceTimeProps {
  data: ExperienceTimeData
}

const ExperienceTime = ({ data }: ExperienceTimeProps) => {
  const { title, dateRange } = data

  return (
    <div className="flex h-9 items-center justify-between">
      <div className="text-[18px] font-semibold">{title}</div>
      <div className="font-mono text-sm text-zinc-600">{dateRange}</div>
    </div>
  )
}
export { ExperienceTime }
