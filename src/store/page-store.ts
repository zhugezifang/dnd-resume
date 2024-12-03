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
      set(({ selectedId, widgets }) => {
        const newWidgets = [...widgets]
        if (!selectedId) {
          newWidgets.push(widget)
        } else {
          const index = widgets.findIndex(item => item.id === selectedId)
          if (index === -1) {
            newWidgets.push(widget)
          } else {
            newWidgets.splice(index + 1, 0, widget)
          }
        }
        storage.set('WIDGETS', newWidgets)
        return {
          widgets: newWidgets,
        }
      })
    },
    removeWidget: (id: string) => {
      set(({ widgets }) => {
        const index = widgets.findIndex(item => item.id === id)
        const newWidgets = widgets.filter(widget => widget.id !== id)
        const selectedId =
          newWidgets.length > index
            ? newWidgets[index].id // 聚焦到下一个
            : newWidgets.length === index
              ? newWidgets[index - 1].id // 删除的是最后一个
              : null
        storage.set('WIDGETS', newWidgets)
        return {
          widgets: newWidgets,
          selectedId,
        }
      })
    },
    updateWidgets: (widgets: WidgetNode[]) => {
      set({ widgets })
      storage.set('WIDGETS', widgets)
    },
    resetWidgets: () => {
      set({ widgets: [], selectedId: null })
      storage.remove('WIDGETS')
    },
    setSelectedId: (id: string) => set({ selectedId: id }),
  }
})

export { usePageStore }
