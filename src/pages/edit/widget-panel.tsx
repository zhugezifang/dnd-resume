import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { usePageStore } from '@/store/page-store.ts'
import { Button } from '@/components/ui/button.tsx'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { createWidgetsNode } from '@/components/widgets/widgets-util.ts'
import type { WidgetType } from '@/components/widgets/widgets-util.ts'

const widgetButtonsData: Array<{
  type: WidgetType
  icon: string
  title: string
}> = [
  {
    type: 'BasicInfo',
    icon: 'iconify ri--user-3-line',
    title: '基本信息',
  },
  {
    type: 'TitleSection',
    icon: 'iconify ri--heading',
    title: '标题',
  },
  {
    type: 'ExperienceTime',
    icon: 'iconify ri--calendar-todo-line',
    title: '经历',
  },
  {
    type: 'TextContent',
    icon: 'iconify ri--ai-generate-text',
    title: '文本内容',
  },
  {
    type: 'ImageSection',
    icon: 'iconify ri--image-line',
    title: '图片',
  },
]

const WidgetPanel = () => {
  // click to push widget
  const pushWidget = usePageStore(state => state.pushWidget)
  const handleClick = (type: WidgetType) => pushWidget(createWidgetsNode(type))

  const dragRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [draggingWidgetType, setDraggingWidgetType] = useState('')
  // register drag events
  useEffect(() => {
    const cleanUpFns: Array<() => void> = []
    dragRefs.current.forEach((el, index) => {
      const type = widgetButtonsData[index].type
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
      {widgetButtonsData.map((item, index) => (
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
