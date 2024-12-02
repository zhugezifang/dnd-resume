import { useNavigate } from 'react-router'
import { usePageStore } from '@/store/page-store.ts'
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

const EditHeader = () => {
  const resetWidgets = usePageStore(state => state.resetWidgets)
  const navigate = useNavigate()

  const handleClickPreview = () => navigate('/preview')

  return (
    <div className="border-b-10 flex-end h-[52px] border-b px-6">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="mr-4 w-20"
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
      <Button
        variant="outline"
        className="w-20"
        onClick={handleClickPreview}
      >
        预览
      </Button>
    </div>
  )
}
export { EditHeader }
