import { Input } from '@/components/ui/input.tsx'
import { ContactsForm } from '@/components/widgets/form/contacts/contacts-form.tsx'
import type { BasicInfoData, LinkItem } from '@/components/widgets/widgets-type.d.ts'
import { produce } from 'immer'
import type { ChangeEvent } from 'react'

const BasicInfoForm = ({
  data,
  onChange,
}: {
  data: BasicInfoData
  onChange: (value: BasicInfoData) => void
}) => {
  const { avatarUrl, name, jobTitle, linksGroup } = data

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const handleLinkGroupChange = (groupIndex: number, linkGroup: LinkItem[]) => {
    const nextState = produce(data.linksGroup, draft => {
      draft[groupIndex] = linkGroup
    })
    onChange({ ...data, linksGroup: nextState })
  }

  return (
    <div>
      {/* 头像地址 */}
      <div>
        <div className="form-label">
          <span>头像地址</span>
        </div>
        <Input
          name="avatarUrl"
          value={avatarUrl}
          placeholder="输入头像地址"
          onChange={handleChange}
        />
      </div>
      {/* 姓名 */}
      <div>
        <div className="form-label">
          <span>姓名</span>
        </div>
        <Input
          name="name"
          value={name}
          placeholder="输入姓名"
          onChange={handleChange}
        />
      </div>
      {/* 职位 */}
      <div>
        <div className="form-label">
          <span>职位</span>
        </div>
        <Input
          name="jobTitle"
          value={jobTitle}
          placeholder="输入职位"
          onChange={handleChange}
        />
      </div>
      {/* 联系方式 */}
      <div>
        <div className="form-label">
          <span>联系方式（第一行）</span>
        </div>
        <ContactsForm
          data={linksGroup[0]}
          onChange={data => handleLinkGroupChange(0, data)}
        />
        <div className="form-label">
          <span>联系方式（第二行）</span>
        </div>
        <ContactsForm
          data={linksGroup[1]}
          onChange={data => handleLinkGroupChange(1, data)}
        />
        <div className="form-label">
          <span>联系方式（第三行）</span>
        </div>
        <ContactsForm
          data={linksGroup[2]}
          onChange={data => handleLinkGroupChange(2, data)}
        />
      </div>
    </div>
  )
}

export { BasicInfoForm }
