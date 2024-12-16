import { Button } from '@/components/ui/button.tsx'
import type { WidgetType } from '@/components/widgets/widgets-type'
import { createWidgetsNode, widgetMaterialList } from '@/components/widgets/widgets-util.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { clsx } from 'clsx'

const PanelMaterials = () => {
  // click to add widget
  const addWidget = useWidgetsStore(state => state.addWidget)
  const handleClick = (type: WidgetType) => {
    const newWidget = createWidgetsNode(type)
    addWidget(newWidget)
  }

  return (
    <ul className="flex w-full flex-col p-4">
      {widgetMaterialList.map(item => (
        <li
          className="mb-3 flex-grow"
          key={item.type}
        >
          <Button
            variant="outline"
            onClick={() => handleClick(item.type)}
            className="w-full justify-between"
          >
            <span className="flex-center">
              <span className={clsx(item.icon, 'mr-2 h-4 w-4')}></span>
              <span>{item.title}</span>
            </span>
            <span className="iconify ri--add-line"></span>
          </Button>{' '}
        </li>
      ))}
    </ul>
  )
}

export { PanelMaterials }
