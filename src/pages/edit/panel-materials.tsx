import { widgetMaterialList } from '@/components/widgets/widgets-util.ts'
import { DraggableWidgetMaterial } from '@/pages/edit/draggable-widget-material.tsx'

const PanelMaterials = () => {
  return (
    <ul className="flex w-full flex-col p-4">
      {widgetMaterialList.map(item => (
        <li
          className="mb-3 flex-grow"
          key={item.type}
        >
          <DraggableWidgetMaterial item={item}></DraggableWidgetMaterial>
        </li>
      ))}
    </ul>
  )
}

export { PanelMaterials }
