import { BasicInfoForm } from '@/components/widgets/form/basic-info-form.tsx'
import { ExperienceTimeForm } from '@/components/widgets/form/experience-time-form.tsx'
import { ImageSectionForm } from '@/components/widgets/form/image-section-form.tsx'
import { TextContentForm } from '@/components/widgets/form/text-content-form.tsx'
import { TitleSectionForm } from '@/components/widgets/form/title-section-form.tsx'
import { widgetMaterialMap } from '@/components/widgets/widgets-util.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { clsx } from 'clsx'

const PanelConfig = () => {
  const widgets = useWidgetsStore(state => state.widgets)
  const setWidgets = useWidgetsStore(state => state.setWidgets)

  const selectedWidget = useWidgetsStore(state => state.selectedWidget())
  if (!selectedWidget) return null

  const widgetMaterialInfo = widgetMaterialMap[selectedWidget.type]

  const onChange = (data: any) => {
    const newWidgets = widgets.map(item => {
      if (item.id === selectedWidget.id) {
        return { ...item, data }
      }
      return item
    })
    setWidgets(newWidgets)
  }
  const FormComponent = (() => {
    switch (selectedWidget.type) {
      case 'BasicInfo':
        return (
          <BasicInfoForm
            data={selectedWidget.data}
            onChange={onChange}
          />
        )
      case 'TitleSection':
        return (
          <TitleSectionForm
            data={selectedWidget.data}
            onChange={onChange}
          />
        )
      case 'ExperienceTime':
        return (
          <ExperienceTimeForm
            data={selectedWidget.data}
            onChange={onChange}
          />
        )
      case 'TextContent':
        return (
          <TextContentForm
            data={selectedWidget.data}
            onChange={onChange}
          />
        )
      case 'ImageSection':
        return (
          <ImageSectionForm
            data={selectedWidget.data}
            onChange={onChange}
          />
        )
    }
  })()

  return (
    <div className="p-4">
      <div className="flex items-center">
        <span className={clsx(widgetMaterialInfo.icon, 'h-4 w-4')}></span>
        <span className="ml-2 text-xl font-medium">{widgetMaterialInfo.title}</span>
      </div>
      {FormComponent}
    </div>
  )
}

export { PanelConfig }
