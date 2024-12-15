import { EditHeader } from '@/pages/edit/edit-header.tsx'
import { PanelConfig } from '@/pages/edit/panel-config.tsx'
import { PanelDnd } from '@/pages/edit/panel-dnd.tsx'
import { PanelMaterials } from '@/pages/edit/panel-materials.tsx'

const PageEdit = () => {
  return (
    <div className="h-[100vh]">
      <EditHeader />
      <div className="flex h-[calc(100%-52px)]">
        {/* left materials panel */}
        <div className="scroll-thin h-full w-[200px] flex-shrink-0 overflow-y-auto border-r">
          <PanelMaterials />
        </div>
        {/* center dnd panel */}
        <div className="flex flex-grow justify-center bg-zinc-50 p-4">
          <PanelDnd />
        </div>
        {/* right config panel */}
        <div className="scroll-thin h-full w-[281px] flex-shrink-0 overflow-y-auto border-l 2xl:w-[321px]">
          <PanelConfig />
        </div>
      </div>
    </div>
  )
}

export { PageEdit }
