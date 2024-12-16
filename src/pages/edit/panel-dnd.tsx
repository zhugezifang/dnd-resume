import { DraggableWidgetNode } from '@/pages/edit/draggable-widget-node.tsx'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { Reorder } from 'motion/react'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

const PanelDnd = () => {
  const { widgets, setWidgets, selectedId } = useWidgetsStore(
    useShallow(state => ({
      widgets: state.widgets,
      setWidgets: state.setWidgets,
      selectedId: state.selectedId,
    })),
  )

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
    <div className="print-wrapper relative rounded-2xl border">
      <Reorder.Group
        axis="y"
        values={widgets}
        onReorder={setWidgets}
      >
        {widgets.map(item => (
          <DraggableWidgetNode
            key={item.id}
            item={item}
            isSelected={item.id === selectedId}
          />
        ))}
      </Reorder.Group>
    </div>
  )
}

export { PanelDnd }
