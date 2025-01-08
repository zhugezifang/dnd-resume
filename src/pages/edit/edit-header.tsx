import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { encodeToBase64Url } from '@/lib/utils.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { useNavigate } from 'react-router'

const EditHeader = () => {
  const widgets = useWidgetsStore(state => state.widgets)
  const resetWidgets = useWidgetsStore(state => state.resetWidgets)
  const navigate = useNavigate()

  const handleClickPreview = () => {
    const base64 = encodeToBase64Url(JSON.stringify(widgets))
    navigate('/preview?data=' + base64)
  }
  const handleClickPrint = () => {
    sessionStorage.setItem('PRINT', 'true')
    navigate('/preview')
  }

  return (
    <div className="border-b-10 flex h-[52px] items-center justify-between border-b px-6">
      {/* github */}
      <a
        href="https://github.com/Arman19941113/dnd-resume"
        target="_blank"
        className="flex-center"
      >
        <span className="iconify text-2xl ri--github-fill"></span>
        <span className="ml-1 text-sm underline">在线生成简历</span>
      </a>

      <div className="flex-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
            >
              重置
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认重置？</AlertDialogTitle>
              <AlertDialogDescription>重置后数据不可恢复。</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={resetWidgets}>确认</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClickPreview}
        >
          预览
        </Button>
        <Button
          size="sm"
          onClick={handleClickPrint}
        >
          打印
        </Button>
      </div>
    </div>
  )
}
export { EditHeader }
