import type { TitleSectionData } from '@/components/widgets/widgets-util.ts'

interface TitleSectionProps {
  data: TitleSectionData
}

const TitleSection = ({ data }: TitleSectionProps) => {
  const { title } = data

  return (
    <div className="mb-2 flex h-9 items-center">
      <div className="h-full w-1 bg-zinc-600"></div>
      <div className="flex h-full flex-grow items-center bg-zinc-200 pl-2 text-xl font-medium">
        {title}
      </div>
    </div>
  )
}

export { TitleSection }
