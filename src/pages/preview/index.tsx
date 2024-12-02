import { BasicInfo } from '@/components/widgets/basic-info.tsx'
import { ExperienceTime } from '@/components/widgets/experience-time.tsx'
import { ImageSection } from '@/components/widgets/image-section.tsx'
import { TextContent } from '@/components/widgets/text-content.tsx'
import { TitleSection } from '@/components/widgets/title-section.tsx'
import { usePageStore } from '@/store/page-store.ts'

const widgetsRenderMap = {
  BasicInfo,
  TitleSection,
  ExperienceTime,
  TextContent,
  ImageSection,
}

const PagePreview = () => {
  const widgets = usePageStore(state => state.widgets)

  return (
    <div className="mx-auto w-[900px]">
      <div className="print-wrapper">
        {widgets.map(item => (
          <div key={item.id}>{widgetsRenderMap[item.type]({ data: item.data })}</div>
        ))}
      </div>
    </div>
  )
}

export { PagePreview }
