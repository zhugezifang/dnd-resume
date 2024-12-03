import { TiptapMenu } from '@/components/common/tiptap-memu.tsx'
import Link from '@tiptap/extension-link'
import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import type { MouseEvent } from 'react'
import '@/styles/tiptap.css'

const extensions = [StarterKit, Link]

interface TiptapProps {
  content: string
  onCreate: (editor: Editor) => void
}

const Tiptap = ({ content, onCreate }: TiptapProps) => {
  const editor = useEditor({
    extensions,
    content,
    onCreate: ({ editor }) => {
      const lastPosition = editor.state.doc.content.size
      editor.chain().focus().setTextSelection(lastPosition).run()
      onCreate(editor)
    },
  })

  const handleClickBg = (e: MouseEvent<HTMLDivElement>) => {
    if (editor && e.target === e.currentTarget) {
      const lastPosition = editor.state.doc.content.size
      editor.chain().focus().setTextSelection(lastPosition).run()
    }
  }

  return (
    <div
      className="h-full"
      onClick={handleClickBg}
    >
      <div className="h-10 w-full">{editor && <TiptapMenu editor={editor} />}</div>
      <div className="h-[calc(100%-48px)] overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export { Tiptap }
