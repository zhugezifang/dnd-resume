import { BasicInfoForm } from '@/components/widgets/basic-info-form.tsx'
import { ExperienceTimeForm } from '@/components/widgets/experience-time-form.tsx'
import { ImageSectionForm } from '@/components/widgets/image-section-form.tsx'
import { TextContentForm } from '@/components/widgets/text-content-form.tsx'
import { TitleSectionForm } from '@/components/widgets/title-section-form.tsx'
import type { WidgetNode } from '@/components/widgets/widgets-util.ts'
import { widgetsDisplayMap } from '@/components/widgets/widgets-util.ts'
import { usePageStore } from '@/store/page-store.ts'
import { clsx } from 'clsx'

const formsMap = {
  BasicInfo: BasicInfoForm,
  TitleSection: TitleSectionForm,
  ExperienceTime: ExperienceTimeForm,
  TextContent: TextContentForm,
  ImageSection: ImageSectionForm,
}

const OptionPanel = () => {
  const widgets = usePageStore(state => state.widgets)
  const updateWidgets = usePageStore(state => state.updateWidgets)

  const selectedWidget = usePageStore(state => state.selectedWidget())
  if (!selectedWidget) return null

  const type = selectedWidget.type
  const widgetInfo = widgetsDisplayMap[type]
  const formComponent = formsMap[type]

  const { data } = selectedWidget
  const onChange = (data: WidgetNode['data']) => {
    const newWidgets = widgets.map(item => {
      if (item.id === selectedWidget.id) {
        return { ...item, data }
      }
      return item
    })
    updateWidgets(newWidgets)
  }

  return (
    <div className="p-4">
      <div className="flex items-center">
        <span className={clsx(widgetInfo.icon, 'h-4 w-4')}></span>
        <span className="ml-2 text-xl font-medium">{widgetInfo.title}</span>
      </div>
      {formComponent({ data, onChange })}
    </div>
  )
}

export { OptionPanel }
