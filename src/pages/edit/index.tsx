import { DropPanel } from '@/pages/edit/drop-panel.tsx'
import { EditHeader } from '@/pages/edit/header.tsx'
import { OptionPanel } from '@/pages/edit/option-panel.tsx'
import { WidgetPanel } from '@/pages/edit/widget-panel.tsx'

const PageEdit = () => {
  return (
    <div className="h-[100vh]">
      <EditHeader />
      <div className="flex h-[calc(100%-52px)]">
        {/* left widget panel */}
        <div className="scroll-thin h-full w-[200px] flex-shrink-0 overflow-y-auto border-r">
          <WidgetPanel />
        </div>
        {/* center editor panel */}
        <div className="flex flex-grow justify-center bg-zinc-50 p-4">
          <DropPanel />
        </div>
        {/* right option panel */}
        <div className="scroll-thin h-full w-[281px] flex-shrink-0 overflow-y-auto border-l 2xl:w-[321px]">
          <OptionPanel />
        </div>
      </div>
    </div>
  )
}

export { PageEdit }
