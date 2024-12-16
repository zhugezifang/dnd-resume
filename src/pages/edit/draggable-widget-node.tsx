import { Button } from '@/components/ui/button.tsx'
import { BasicInfo } from '@/components/widgets/node/basic-info.tsx'
import { ExperienceTime } from '@/components/widgets/node/experience-time.tsx'
import { ImageSection } from '@/components/widgets/node/image-section.tsx'
import { TextContent } from '@/components/widgets/node/text-content.tsx'
import { TitleSection } from '@/components/widgets/node/title-section.tsx'
import type { WidgetNode } from '@/components/widgets/widgets-type.d.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { clsx } from 'clsx'
import { Reorder } from 'motion/react'
import type { MouseEvent } from 'react'
import { memo } from 'react'

interface ReorderItemProps {
  item: WidgetNode
  isSelected: boolean
}

function DraggableWidgetNode({ item, isSelected }: ReorderItemProps) {
  const setSelectedId = useWidgetsStore(state => state.setSelectedId)
  const handleClick = () => setSelectedId(item.id)

  // remove widget
  const removeWidget = useWidgetsStore(state => state.removeWidget)
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
      whileHover={{ boxShadow: '0px 4px 12px 2px rgba(219,99,39,0.6)' }}
      whileDrag={{ zIndex: 20 }}
      className="relative cursor-move bg-white"
    >
      <div
        id={item.id}
        className={clsx(
          'relative',
          isSelected && 'z-10 shadow-[0_4px_12px_2px_rgba(223,84,74,0.6)]',
        )}
        onClick={handleClick}
      >
        {WidgetRenderComponent()}

        <Button
          variant="outline"
          size="icon"
          className="absolute right-1 top-1 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleClickRemove}
        >
          <div className="iconify text-lg ri--delete-bin-line"></div>
        </Button>
      </div>
    </Reorder.Item>
  )
}

const Memorized = memo(DraggableWidgetNode)

export { Memorized as DraggableWidgetNode }
