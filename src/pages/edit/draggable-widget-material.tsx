import { Button } from '@/components/ui/button.tsx'
import type { WidgetMaterial, WidgetType } from '@/components/widgets/widgets-type'
import { createWidgetsNode } from '@/components/widgets/widgets-util.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'
import invariant from 'tiny-invariant'

interface DraggableWidgetMaterialProps {
  item: WidgetMaterial
}

function DraggableWidgetMaterial({ item }: DraggableWidgetMaterialProps) {
  // draggable logic
  const dragRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    invariant(dragRef.current)
    return draggable({
      element: dragRef.current,
      getInitialData: () => ({ type: item.type }),
      onDragStart: ({ source }) => {
        source.element.classList.remove('bg-zinc-50')
        source.element.classList.add('border-zinc-400', 'bg-zinc-200')
      },
      onDrop: ({ source }) => {
        source.element.classList.remove('border-zinc-400', 'bg-zinc-200')
        source.element.classList.add('bg-zinc-50')
      },
    })
  }, [item])

  // click to push widget
  const addWidget = useWidgetsStore(state => state.addWidget)
  const handleClick = (type: WidgetType) => {
    const newWidget = createWidgetsNode(type)
    addWidget(newWidget)
  }

  return (
    <Button
      variant="outline"
      ref={dragRef}
      onClick={() => handleClick(item.type)}
      className="w-full justify-start bg-zinc-50 text-zinc-600 hover:border-zinc-400 hover:bg-zinc-200"
    >
      <span className={clsx(item.icon, 'h-4 w-4')}></span>
      <span>{item.title}</span>
    </Button>
  )
}

export { DraggableWidgetMaterial }
