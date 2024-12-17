import { DraggableWidgetNode } from '@/pages/edit/draggable-widget-node.tsx'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { closestCenter, DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core/dist/types'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useEffect } from 'react'
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

  /**
   * dnd logic
   */
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = widgets.findIndex(item => item.id === active.id)
      const newIndex = widgets.findIndex(item => item.id === over.id)
      setWidgets(arrayMove(widgets, oldIndex, newIndex))
      setSelectedId(active.id as string)
    }
  }

  /**
   * auto scroll selected widget into view
   */
  useEffect(() => {
    if (!selectedId) return
    const element = document.getElementById(selectedId)
    if (!element) return

    const rect = element.getBoundingClientRect()
    const inView = rect.top >= 68 && rect.bottom <= window.innerHeight - 16
    if (!inView) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedId])

  return (
    <ul className="print-wrapper relative rounded-2xl border">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement, restrictToVerticalAxis]}
      >
        <SortableContext
          items={widgets}
          strategy={verticalListSortingStrategy}
        >
          {widgets.map(item => (
            <DraggableWidgetNode
              key={item.id}
              item={item}
              isSelected={item.id === selectedId}
            />
          ))}
        </SortableContext>
      </DndContext>
    </ul>
  )
}

export { PanelDnd }
