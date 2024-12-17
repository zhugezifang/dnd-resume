import type { ImageSectionData } from '@/components/widgets/widgets-type.d.ts'

interface ImageSectionProps {
  data: ImageSectionData
}

const ImageSection = ({ data }: ImageSectionProps) => {
  const { url } = data

  return (
    <div className="flex-center min-h-16 drop-shadow-lg">
      <img
        src={url}
        alt="image"
        draggable="false"
      />
    </div>
  )
}

export { ImageSection }
