import { Button } from '@/components/ui/button.tsx'
import type { WidgetType } from '@/components/widgets/widgets-util.ts'
import { createWidgetsNode, widgetsDisplayInfo } from '@/components/widgets/widgets-util.ts'
import { usePageStore } from '@/store/page-store.ts'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'

const WidgetPanel = () => {
  // click to push widget
  const addWidget = usePageStore(state => state.addWidget)
  const setSelectedId = usePageStore(state => state.setSelectedId)
  const handleClick = (type: WidgetType) => {
    const newWidget = createWidgetsNode(type)
    addWidget(newWidget)
    setSelectedId(newWidget.id)
  }

  const dragRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [draggingWidgetType, setDraggingWidgetType] = useState('')
  // register drag events
  useEffect(() => {
    const cleanUpFns: Array<() => void> = []
    dragRefs.current.forEach((el, index) => {
      const type = widgetsDisplayInfo[index].type
      cleanUpFns.push(
        draggable({
          element: el!,
          getInitialData: () => ({ type }),
          onDragStart: () => setDraggingWidgetType(type),
          onDrop: () => setDraggingWidgetType(''),
        }),
      )
    })
    return () => cleanUpFns.forEach(fn => fn())
  }, [])

  return (
    <ul className="flex w-full flex-col p-4">
      {widgetsDisplayInfo.map((item, index) => (
        <li
          className="mb-3 flex-grow"
          key={item.type}
        >
          <Button
            ref={el => (dragRefs.current[index] = el)}
            variant="outline"
            className={clsx(
              'w-full justify-start bg-zinc-50 text-zinc-600 hover:border-zinc-400 hover:bg-zinc-200',
              item.type === draggingWidgetType && 'border-zinc-400 bg-zinc-200',
            )}
            onClick={() => handleClick(item.type)}
          >
            <span className={clsx(item.icon, 'h-4 w-4')}></span>
            <span>{item.title}</span>
          </Button>
        </li>
      ))}
    </ul>
  )
}

export { WidgetPanel }
