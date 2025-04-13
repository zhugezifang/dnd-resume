import type { TitleSectionData } from '@/components/widgets/widgets-type.d.ts'

interface TitleSectionProps {
  data: TitleSectionData['propsData']
}

const TitleSection = ({ data }: TitleSectionProps) => {
  const { title } = data

  return (
    <div className="flex h-9 items-center">
      <div className="h-full w-1 bg-zinc-600"></div>
      <div className="flex h-full grow items-center bg-zinc-200 pl-2 text-xl font-medium">
        {title}
      </div>
    </div>
  )
}

export { TitleSection }
