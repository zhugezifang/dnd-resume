import { Button } from '@/components/ui/button.tsx'
import { BasicInfo } from '@/components/widgets/node/basic-info.tsx'
import { ExperienceTime } from '@/components/widgets/node/experience-time.tsx'
import { ImageSection } from '@/components/widgets/node/image-section.tsx'
import { TextContent } from '@/components/widgets/node/text-content.tsx'
import { TitleSection } from '@/components/widgets/node/title-section.tsx'
import type { WidgetNode } from '@/components/widgets/widgets-type.d.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { clsx } from 'clsx'
import type { MouseEvent } from 'react'
import { memo } from 'react'

interface ReorderItemProps {
  item: WidgetNode
  isSelected: boolean
}

function DraggableWidgetNode({ item, isSelected }: ReorderItemProps) {
  /**
   * dnd logic
   */
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }
  const getCls: () => string = () => {
    if (isDragging) return 'z-20 shadow-[0_4px_18px_2px_rgba(219,99,39,0.8)]'
    if (isSelected) return 'z-10 shadow-[0_4px_12px_2px_rgba(219,99,39,0.6)]'
    return ''
  }

  /**
   * click to setSelectedId
   */
  const setSelectedId = useWidgetsStore(state => state.setSelectedId)
  const handleClickItem = () => setSelectedId(item.id)

  /**
   * click to remove widget
   */
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
    <li
      id={item.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={handleClickItem}
      className={clsx('group relative flow-root cursor-move bg-white transition-shadow', getCls())}
    >
      <div style={item.data.style}>
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
    </li>
  )
}

const Memorized = memo(DraggableWidgetNode)

export { Memorized as DraggableWidgetNode }
