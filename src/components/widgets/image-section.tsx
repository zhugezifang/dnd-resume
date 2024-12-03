import type { ImageSectionData } from '@/components/widgets/widgets-util.ts'

interface ImageSectionProps {
  data: ImageSectionData
}

const ImageSection = ({ data }: ImageSectionProps) => {
  const { url } = data

  return (
    <div className="flex-center mb-2 min-h-16 drop-shadow-xl">
      <img
        src={url}
        alt="image"
        draggable="false"
      />
    </div>
  )
}

export { ImageSection }
