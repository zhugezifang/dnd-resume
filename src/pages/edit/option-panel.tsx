import { BasicInfoForm } from '@/components/widgets/basic-info-form.tsx'
import { ExperienceTimeForm } from '@/components/widgets/experience-time-form.tsx'
import { ImageSectionForm } from '@/components/widgets/image-section-form.tsx'
import { TextContentForm } from '@/components/widgets/text-content-form.tsx'
import { TitleSectionForm } from '@/components/widgets/title-section-form.tsx'
import { widgetsDisplayMap } from '@/components/widgets/widgets-util.ts'
import { usePageStore } from '@/store/page-store.ts'
import { clsx } from 'clsx'

const OptionPanel = () => {
  const widgets = usePageStore(state => state.widgets)
  const updateWidgets = usePageStore(state => state.updateWidgets)

  const selectedWidget = usePageStore(state => state.selectedWidget())
  if (!selectedWidget) return null

  const widgetInfo = widgetsDisplayMap[selectedWidget.type]

  const onChange = (data: any) => {
    const newWidgets = widgets.map(item => {
      if (item.id === selectedWidget.id) {
        return { ...item, data }
      }
      return item
    })
    updateWidgets(newWidgets)
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
        <span className={clsx(widgetInfo.icon, 'h-4 w-4')}></span>
        <span className="ml-2 text-xl font-medium">{widgetInfo.title}</span>
      </div>
      {FormComponent}
    </div>
  )
}

export { OptionPanel }
