import type { TextContentData } from '@/components/widgets/widgets-util.ts'

interface TextContentProps {
  data: TextContentData
}

const TextContent = ({ data }: TextContentProps) => {
  const { content } = data

  return (
    <div
      className="tiptap mb-2 flex min-h-9 flex-col justify-center"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  )
}

export { TextContent }
