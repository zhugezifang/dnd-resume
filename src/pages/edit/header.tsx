import { Button } from '@/components/ui/button'

const EditHeader = () => (
  <div className="border-b-10 flex-end h-[52px] border-b px-6">
    <Button
      variant="outline"
      className="mr-4 w-20"
    >
      预览
    </Button>
    <Button
      variant="outline"
      className="w-20"
    >
      保存
    </Button>
  </div>
)

export { EditHeader }
