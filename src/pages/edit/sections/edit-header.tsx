import { LogoGithub } from '@/components/common/svg-icons.tsx'
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
} from '@/components/ui/alert-dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { widgetsSchema } from '@/components/widgets/widgets-schema.ts'
import { getBasename } from '@/components/widgets/widgets-util.tsx'
import { encodeToBase64Url } from '@/lib/utils.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { type ChangeEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

const EditHeader = () => {
  const { t } = useTranslation()
  const widgets = useWidgetsStore(state => state.widgets)
  const resetWidgets = useWidgetsStore(state => state.resetWidgets)
  const setWidgets = useWidgetsStore(state => state.setWidgets)
  const setSelectedId = useWidgetsStore(state => state.setSelectedId)
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)
  const handleImportConfig = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        try {
          const json = e.target?.result as string
          const ret = widgetsSchema.safeParse(JSON.parse(json))
          if (ret.success) {
            const importedWidgets = ret.data
            setWidgets(importedWidgets)
            setSelectedId(importedWidgets.length ? importedWidgets[0].id : '')
            toast.success(t('Successfully imported configuration file'))
          } else {
            console.error(ret.error)
            toast.error(t('message.parseError'))
          }
        } catch (error) {
          console.error(error)
          toast.error(t('message.parseError'))
        }
      }
      reader.readAsText(file)
    }
  }

  const handleClickExport = () => {
    const dataStr = JSON.stringify(widgets, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (getBasename(widgets) || 'resume-config') + '.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClickPreview = () => {
    const base64 = encodeToBase64Url(JSON.stringify(widgets))
    navigate('/preview?data=' + base64)
  }

  const handleClickPrint = () => {
    sessionStorage.setItem('PRINT', 'true')
    navigate('/print')
  }

  return (
    <div className="flex h-[52px] items-center justify-between border-b px-6">
      {/* github */}

      <div className="flex-center gap-4">
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          onChange={handleImportConfig}
          style={{ display: 'none' }}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          {t('common.importConfig')}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleClickExport}
        >
          {t('common.exportConfig')}
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
            >
              {t('common.reset')}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('message.confirmReset')}</AlertDialogTitle>
              <AlertDialogDescription>{t('message.resetWarning')}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={resetWidgets}>{t('common.confirm')}</AlertDialogAction>
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
          {t('common.preview')}
        </Button>
        <Button
          size="sm"
          onClick={handleClickPrint}
        >
          {t('common.print')}
        </Button>
      </div>
    </div>
  )
}
export { EditHeader }
