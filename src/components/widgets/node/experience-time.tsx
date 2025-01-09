import type { ExperienceTimeData } from '@/components/widgets/widgets-type.d.ts'

interface ExperienceTimeProps {
  data: ExperienceTimeData['propsData']
}

const ExperienceTime = ({ data }: ExperienceTimeProps) => {
  const { title, dateRange } = data

  return (
    <div className="flex flex-wrap items-center justify-between py-1">
      <div className="text-[18px] font-semibold">{title}</div>
      <div className="font-mono text-sm text-zinc-600">{dateRange}</div>
    </div>
  )
}
export { ExperienceTime }
