import { Button } from '@/components/ui/button.tsx'
import { BasicInfo } from '@/components/widgets/basic-info.tsx'
import { ExperienceTime } from '@/components/widgets/experience-time.tsx'
import { ImageSection } from '@/components/widgets/image-section.tsx'
import { TextContent } from '@/components/widgets/text-content.tsx'
import { TitleSection } from '@/components/widgets/title-section.tsx'
import type { WidgetNode } from '@/components/widgets/widgets-util.ts'
import { useRaisedStyle } from '@/hooks/use-raised-style.ts'
import { usePageStore } from '@/store/page-store.ts'
import { clsx } from 'clsx'
import { Reorder, useMotionValue } from 'motion/react'
import type { MouseEvent } from 'react'
import { forwardRef, useState } from 'react'

const ReorderItem = forwardRef<HTMLDivElement, { item: WidgetNode }>(({ item }, ref) => {
  // motion style
  const y = useMotionValue(0)
  const { scale } = useRaisedStyle(y)
  const style = { y, scale }

  const setSelectedId = usePageStore(state => state.setSelectedId)
  const selectedId = usePageStore(state => state.selectedId)
  const selectedCls = selectedId === item.id ? 'shadow-[0_4px_12px_2px_rgba(223,84,74,0.6)]' : ''

  // remove widget
  const [isMouseEnter, setIsMouseEnter] = useState(false)
  const removeWidget = usePageStore(state => state.removeWidget)
  const handleClickRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    removeWidget(item.id)
  }

  const WidgetRenderComponent = () => {
    switch (item.type) {
      case 'BasicInfo':
        return <BasicInfo data={item.data} />
      case 'TitleSection':
        return <TitleSection data={item.data} />
      case 'ExperienceTime':
        return <ExperienceTime data={item.data} />
      case 'TextContent':
        return <TextContent data={item.data} />
      case 'ImageSection':
        return <ImageSection data={item.data} />
    }
  }

  return (
    <Reorder.Item
      value={item}
      style={style}
      whileHover={{ boxShadow: '0px 4px 12px 2px rgba(219,99,39,0.6)', zIndex: 10 }}
      className="relative bg-white"
    >
      <div
        className={clsx('relative cursor-move', selectedCls)}
        ref={ref}
        onClick={() => setSelectedId(item.id)}
        onMouseEnter={() => setIsMouseEnter(true)}
        onMouseLeave={() => setIsMouseEnter(false)}
      >
        {WidgetRenderComponent()}

        {isMouseEnter && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7"
            onClick={handleClickRemove}
          >
            <div className="iconify text-lg ri--delete-bin-line"></div>
          </Button>
        )}
      </div>
    </Reorder.Item>
  )
})

export { ReorderItem }
