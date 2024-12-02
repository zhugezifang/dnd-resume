import type { TextContentData } from '@/components/widgets/widgets-util.ts'

interface TextContentProps {
  data: TextContentData
}

const TextContent = ({ data }: TextContentProps) => {
  const { content } = data

  return <div className="mb-2 flex min-h-9 flex-col justify-center">{content}</div>
}

export { TextContent }
