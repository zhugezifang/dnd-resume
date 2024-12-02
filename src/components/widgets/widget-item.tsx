import { forwardRef } from 'react'
import { BasicInfo } from '@/components/widgets/basic-info.tsx'
import { TitleSection } from '@/components/widgets/title-section.tsx'
import { ExperienceTime } from '@/components/widgets/experience-time.tsx'
import { ImageSection } from '@/components/widgets/image-section.tsx'
import { TextContent } from '@/components/widgets/text-content.tsx'
import type { WidgetNode } from '@/store/page-store.ts'

export const WidgetItem = forwardRef<HTMLDivElement, WidgetNode>((node, ref) => {
  const { type } = node
  switch (type) {
    case 'BasicInfo':
      return (
        <div ref={ref}>
          <BasicInfo {...node.props} />
        </div>
      )
    case 'TitleSection':
      return (
        <div ref={ref}>
          <TitleSection {...node.props} />
        </div>
      )
    case 'ExperienceTime':
      return (
        <div ref={ref}>
          <ExperienceTime {...node.props} />
        </div>
      )
    case 'TextContent':
      return (
        <div ref={ref}>
          <TextContent {...node.props} />
        </div>
      )
    case 'ImageSection':
      return (
        <div ref={ref}>
          <ImageSection {...node.props} />
        </div>
      )
    default: {
      const exhaustiveCheck: never = type
      return exhaustiveCheck
    }
  }
})
