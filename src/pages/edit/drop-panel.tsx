import { useEffect, useRef } from 'react'
import { Reorder } from 'motion/react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { usePageStore } from '@/store/page-store.ts'
import { ReorderItem } from '@/pages/edit/reorder-item.tsx'
import { createWidgetsNode } from '@/components/widgets/widgets-util.ts'
import type { WidgetType } from '@/components/widgets/widgets-util.ts'

const DropPanel = () => {
  const widgets = usePageStore(state => state.widgets)
  const updateWidgets = usePageStore(state => state.updateWidgets)

  const dropRef = useRef<HTMLDivElement | null>(null)
  const widgetsRef = useRef<{ [id: string]: HTMLDivElement }>({})
  // register drop event
  useEffect(() => {
    return dropTargetForElements({
      element: dropRef.current!,
      onDragEnter: ({ source, location }) => {
        const type = source.data.type as WidgetType
        const newNode = createWidgetsNode(type)
        // push to end
        if (!widgets.length) {
          updateWidgets([newNode])
          return
        }
        // calculate order
        const widgetsLocation = widgets
          .map(item => widgetsRef.current[item.id])
          .map(el => {
            const rect = el.getBoundingClientRect()
            return {
              top: rect.top,
              height: rect.height,
            }
          })
        let index = 0
        while (index < widgetsLocation.length) {
          const { top, height } = widgetsLocation[index]
          if (location.current.input.clientY > top + height / 2) {
            index++
          } else {
            break
          }
        }
        // move
        const _widgets = [...widgets]
        _widgets.splice(index, 0, newNode)
        updateWidgets(_widgets)
      },
    })
  }, [widgets, updateWidgets])

  return (
    <div
      ref={dropRef}
      className="print-wrapper rounded-2xl border"
    >
      <Reorder.Group
        axis="y"
        values={widgets}
        onReorder={updateWidgets}
      >
        {widgets.map(item => (
          <ReorderItem
            key={item.id}
            ref={el => (widgetsRef.current[item.id] = el!)}
            item={item}
          />
        ))}
      </Reorder.Group>
    </div>
  )
}

export { DropPanel }
