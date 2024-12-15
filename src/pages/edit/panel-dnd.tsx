import type { WidgetType } from '@/components/widgets/widgets-type.d.ts'
import { createWidgetsNode } from '@/components/widgets/widgets-util.ts'
import { useLatest } from '@/hooks/use-latest.ts'
import { WidgetDisplayItem } from '@/pages/edit/widget-display-item.tsx'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { Reorder } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

const PanelDnd = () => {
  const { widgets, setWidgets, selectedId, setSelectedId } = useWidgetsStore(
    useShallow(state => ({
      widgets: state.widgets,
      setWidgets: state.setWidgets,
      selectedId: state.selectedId,
      setSelectedId: state.setSelectedId,
    })),
  )
  const widgetsRef = useLatest(widgets)
  const selectedIdRef = useLatest(selectedId)

  const dropRef = useRef<HTMLDivElement | null>(null)
  const widgetsDomRef = useRef<{ [id: string]: HTMLDivElement }>({})
  const widgetsLocationRef = useRef<Array<{ top: number; height: number }>>([])
  useEffect(() => {
    widgetsLocationRef.current = widgets
      .map(item => widgetsDomRef.current[item.id])
      .map(el => {
        return {
          top: (el.offsetParent as HTMLLIElement).offsetTop,
          height: el.offsetHeight,
        }
      })
  }, [widgets])

  const [dropIndex, setDropIndex] = useState<null | number>(null)
  const dropIndexRef = useLatest(dropIndex)
  const getGuideLineTop = () => {
    if (dropIndex === null) return null
    if (dropIndex === 0) return 0
    const baseTop = widgetsLocationRef.current[0].top
    const rect = widgetsLocationRef.current[dropIndex - 1]
    return rect.top - baseTop + rect.height
  }
  const guideLineTop = getGuideLineTop()
  // register drop event
  useEffect(() => {
    return dropTargetForElements({
      element: dropRef.current!,
      onDrag: ({ location }) => {
        if (!widgetsRef.current.length) {
          return setDropIndex(0)
        }
        // calculate order
        const curY = location.current.input.clientY
        const baseTop = widgetsDomRef.current[widgetsRef.current[0].id]!.getBoundingClientRect().top
        const paddingTop = 16
        const curTop = curY - baseTop + paddingTop
        let index = 0
        while (index < widgetsLocationRef.current.length) {
          const { top, height } = widgetsLocationRef.current[index]
          if (curTop > top + height / 2) {
            index++
          } else {
            break
          }
        }
        setDropIndex(index)
      },
      onDragLeave: () => {
        setDropIndex(null)
      },
      onDrop: ({ source }) => {
        const type = source.data.type as WidgetType
        const newNode = createWidgetsNode(type)
        const _widgets = [...widgetsRef.current]
        _widgets.splice(dropIndexRef.current!, 0, newNode)
        setWidgets(_widgets)
        setSelectedId(newNode.id)
        setDropIndex(null)
      },
    })
  }, [setWidgets, setSelectedId, widgetsRef, widgetsLocationRef, selectedIdRef, dropIndexRef])

  return (
    <div
      ref={dropRef}
      className="print-wrapper relative rounded-2xl border"
    >
      <Reorder.Group
        axis="y"
        values={widgets}
        onReorder={setWidgets}
      >
        {widgets.map(item => (
          <WidgetDisplayItem
            key={item.id}
            ref={el => (widgetsDomRef.current[item.id] = el!)}
            item={item}
          />
        ))}
      </Reorder.Group>
      {guideLineTop !== null && (
        <div
          className="absolute left-0 top-3 flex w-full items-center"
          style={{ transform: `translateY(${guideLineTop}px)` }}
        >
          <div className="h-2 w-2 rounded-full border-2 border-orange-400"></div>
          <div className="h-0.5 flex-grow bg-orange-400 shadow-[0_0_6px_0_rgba(219,99,39,0.6)]"></div>
        </div>
      )}
    </div>
  )
}

export { PanelDnd }
