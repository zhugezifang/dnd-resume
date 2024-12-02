import { forwardRef } from 'react'
import { Reorder, useMotionValue } from 'motion/react'
import { useRaisedStyle } from '@/hooks/use-raised-style.ts'
import { BasicInfo } from '@/components/widgets/basic-info.tsx'
import { ExperienceTime } from '@/components/widgets/experience-time.tsx'
import { ImageSection } from '@/components/widgets/image-section.tsx'
import { TextContent } from '@/components/widgets/text-content.tsx'
import { TitleSection } from '@/components/widgets/title-section.tsx'
import type { WidgetNode } from '@/components/widgets/widgets-util.ts'

const ReorderItem = forwardRef<HTMLDivElement, { item: WidgetNode }>(({ item }, ref) => {
  const y = useMotionValue(0)
  const { scale, boxShadow } = useRaisedStyle(y)

  const WidgetContent = () => {
    const { type } = item
    switch (type) {
      case 'BasicInfo':
        return (
          <div ref={ref}>
            <BasicInfo {...item.props} />
          </div>
        )
      case 'TitleSection':
        return (
          <div ref={ref}>
            <TitleSection {...item.props} />
          </div>
        )
      case 'ExperienceTime':
        return (
          <div ref={ref}>
            <ExperienceTime {...item.props} />
          </div>
        )
      case 'TextContent':
        return (
          <div ref={ref}>
            <TextContent {...item.props} />
          </div>
        )
      case 'ImageSection':
        return (
          <div ref={ref}>
            <ImageSection {...item.props} />
          </div>
        )
      default: {
        const exhaustiveCheck: never = type
        return exhaustiveCheck
      }
    }
  }

  return (
    <Reorder.Item
      value={item}
      style={{ scale, boxShadow, y }}
    >
      <WidgetContent />
    </Reorder.Item>
  )
})

export { ReorderItem }
