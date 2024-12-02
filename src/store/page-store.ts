import { widgetsSchema } from '@/components/widgets/widgets-schema.ts'
import type { WidgetNode } from '@/components/widgets/widgets-util.ts'
import { storage } from '@/lib/utils.ts'
import { create } from 'zustand'

interface PageState {
  widgets: WidgetNode[]
  selectedId: string | null
  selectedWidget: () => WidgetNode | null

  addWidget: (widget: WidgetNode) => void
  removeWidget: (id: string) => void
  updateWidgets: (widgets: WidgetNode[]) => void
  resetWidgets: () => void
  setSelectedId: (id: string) => void
}

const usePageStore = create<PageState>()((set, get) => {
  return {
    widgets: widgetsSchema.safeParse(storage.get('WIDGETS')).data || [],
    selectedId: null,
    selectedWidget: () => {
      const { widgets, selectedId } = get()
      return widgets.find(item => item.id === selectedId) || null
    },

    addWidget: (widget: WidgetNode) => {
      set(({ widgets }) => {
        const newWidgets = [...widgets, widget]
        storage.set('WIDGETS', newWidgets)
        return {
          widgets: newWidgets,
        }
      })
    },
    removeWidget: (id: string) => {
      set(({ widgets }) => {
        const newWidgets = widgets.filter(widget => widget.id !== id)
        storage.set('WIDGETS', newWidgets)
        return {
          widgets: newWidgets,
        }
      })
    },
    updateWidgets: (widgets: WidgetNode[]) => {
      set({ widgets })
      storage.set('WIDGETS', widgets)
    },
    resetWidgets: () => {
      set({ widgets: [] })
      storage.remove('WIDGETS')
    },
    setSelectedId: (id: string) => set({ selectedId: id }),
  }
})

export { usePageStore }
