import { LinkIconComponent } from '@/components/common/link-icons.tsx'
import type { BasicInfoData } from '@/components/widgets/widgets-util.ts'
import { clsx } from 'clsx'

interface BasicInfoProps {
  data: BasicInfoData
}

const BasicInfo = ({ data }: BasicInfoProps) => {
  const { avatarUrl, name, jobTitle, linksGroup } = data

  return (
    <div className="flex-center mb-4 py-10">
      {/* 头像 */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="avatar"
          width="100"
          className="mr-16 rounded-full"
          draggable={false}
        />
      ) : null}
      <div>
        {/* 姓名、职位 */}
        <div className="mb-1 flex items-end">
          <span className="mr-3 text-2xl font-semibold">{name}</span>
          <span className="text-[17px]">{jobTitle}</span>
        </div>
        {/* 链接、联系方式 */}
        <ul>
          {linksGroup.map((links, groupIndex) => (
            <li key={groupIndex}>
              <ul className="flex items-center">
                {links.map((item, index) => (
                  <li
                    key={index}
                    className="mr-4 flex h-8 min-w-40 items-center"
                  >
                    {/* link icon */}
                    <span className="flex-center mr-2">{LinkIconComponent(item.icon)}</span>
                    {/* link content */}
                    <a
                      href={item.href || undefined}
                      className={clsx('font-mono', item.href && 'underline')}
                      target="_blank"
                    >
                      {item.content}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { BasicInfo }
