import type { IconName } from '@/components/common/svg-icon.tsx'
import { SvgIcon } from '@/components/common/svg-icon.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover.tsx'
import type { Editor } from '@tiptap/react'
import { clsx } from 'clsx'
import React, { useState } from 'react'

interface TiptapMenuIconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: IconName
  size?: number
  active?: boolean
}

const TiptapMenuIcon = ({ name, active, size, ...props }: TiptapMenuIconProps) => {
  return (
    <div
      className={clsx(
        'flex-center mr-2 h-7 cursor-pointer rounded px-1 hover:bg-zinc-200',
        active && 'bg-zinc-200',
      )}
      {...props}
    >
      <SvgIcon
        name={name}
        size={size || 20}
      />
    </div>
  )
}

interface TiptapMenuProps {
  editor: Editor
}

const TiptapMenu = ({ editor }: TiptapMenuProps) => {
  const [isLinkOpen, setIsLinkOpen] = useState(false)
  const [linkContent, setLinkContent] = useState<string>('')
  const handleClickLink = () => {
    if (isLinkOpen) return
    setIsLinkOpen(true)

    const previousUrl = editor.getAttributes('link').href
    if (previousUrl) setLinkContent(previousUrl)
  }
  const handleSaveLink = () => {
    const href = linkContent.trim()
    if (!href) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
  }

  return (
    <div className="flex h-full items-center">
      <TiptapMenuIcon
        name="undo"
        onClick={() => editor.chain().focus().undo().run()}
      />
      <TiptapMenuIcon
        name="redo"
        onClick={() => editor.chain().focus().redo().run()}
      />

      <div className="relative top-[0.5px] ml-1 mr-3 h-4 w-px bg-zinc-400"></div>

      <TiptapMenuIcon
        name="bullet-list"
        active={editor.isActive('bulletList')}
        onClick={() => {
          editor.chain().focus().toggleBulletList().run()
        }}
      />

      <TiptapMenuIcon
        name="ordered-list"
        active={editor.isActive('orderedList')}
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run()
        }}
      />

      <TiptapMenuIcon
        name="paragraph"
        size={28}
        active={editor.isActive('paragraph')}
        onClick={() => {
          editor.chain().focus().setParagraph().run()
        }}
      />

      <TiptapMenuIcon
        name="code"
        active={editor.isActive('code')}
        onClick={() => {
          editor.chain().focus().toggleCode().run()
        }}
      />

      <Popover
        open={isLinkOpen}
        onOpenChange={setIsLinkOpen}
      >
        <PopoverAnchor asChild>
          <div>
            <TiptapMenuIcon
              name="link"
              active={editor.isActive('link')}
              onClick={handleClickLink}
            />
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="w-64"
          align="start"
        >
          <div className="flex items-center">
            <Input
              value={linkContent}
              onChange={e => setLinkContent(e.target.value)}
              placeholder="输入链接地址"
            />
            <Button
              className="ml-2 shrink-0"
              size="icon"
              onClick={handleSaveLink}
            >
              <span className="iconify text-lg ri--check-line"></span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <TiptapMenuIcon
        name="bold"
        active={editor.isActive('bold')}
        onClick={() => {
          editor.chain().focus().toggleBold().run()
        }}
      />

      <TiptapMenuIcon
        name="italic"
        active={editor.isActive('italic')}
        onClick={() => {
          editor.chain().focus().toggleItalic().run()
        }}
      />

      <TiptapMenuIcon
        name="strike"
        active={editor.isActive('strike')}
        onClick={() => {
          editor.chain().focus().toggleStrike().run()
        }}
      />

      <TiptapMenuIcon
        name="h1"
        active={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
      />

      <TiptapMenuIcon
        name="h2"
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
      />

      <TiptapMenuIcon
        name="h3"
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
      />
    </div>
  )
}

export { TiptapMenu }
