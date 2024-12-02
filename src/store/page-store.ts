import { create } from 'zustand'
import { storage } from '@/lib/utils.ts'
import type { WidgetNode } from '@/components/widgets/widgets-util.ts'

interface PageState {
  widgets: WidgetNode[]
  pushWidget: (widget: WidgetNode) => void
  updateWidgets: (widgets: WidgetNode[]) => void
}

const usePageStore = create<PageState>()(set => {
  return {
    widgets: storage.get('WIDGETS') || [],
    pushWidget: (widget: WidgetNode) => set(({ widgets }) => ({ widgets: [...widgets, widget] })),
    updateWidgets: (widgets: WidgetNode[]) => set({ widgets }),
  }
})

export { usePageStore }
