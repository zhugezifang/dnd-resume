export type WidgetType =
  | 'BasicInfo'
  | 'TitleSection'
  | 'ExperienceTime'
  | 'TextContent'
  | 'ImageSection'

interface WidgetDisplayInfo {
  type: WidgetType
  icon: string
  title: string
}

export const widgetsDisplayInfo: WidgetDisplayInfo[] = [
  {
    type: 'BasicInfo',
    icon: 'iconify ri--user-3-line',
    title: '基本信息',
  },
  {
    type: 'TitleSection',
    icon: 'iconify ri--heading',
    title: '标题',
  },
  {
    type: 'ExperienceTime',
    icon: 'iconify ri--calendar-todo-line',
    title: '经历',
  },
  {
    type: 'TextContent',
    icon: 'iconify ri--ai-generate-text',
    title: '文本',
  },
  {
    type: 'ImageSection',
    icon: 'iconify ri--image-line',
    title: '图片',
  },
]

export const widgetsDisplayMap: { [type: string]: WidgetDisplayInfo } = {}
for (const widgetInfo of widgetsDisplayInfo) {
  widgetsDisplayMap[widgetInfo.type] = widgetInfo
}

export type WidgetNode =
  | {
      type: WidgetType
      id: string
      data: any
    }
  | {
      type: 'BasicInfo'
      id: string
      data: BasicInfoData
    }
  | {
      type: 'TitleSection'
      id: string
      data: TitleSectionData
    }
  | {
      type: 'ExperienceTime'
      id: string
      data: ExperienceTimeData
    }
  | {
      type: 'TextContent'
      id: string
      data: TextContentData
    }
  | {
      type: 'ImageSection'
      id: string
      data: ImageSectionData
    }

export interface BasicInfoData {
  avatarUrl: string
  name: string
  jobTitle: string
  linksGroup: [LinkGroup, LinkGroup, LinkGroup]
}
export type LinkGroup = LinkItem[]
export interface LinkItem {
  href: string
  content: string
  icon: string
}

export interface TitleSectionData {
  title: string
}

export interface ExperienceTimeData {
  title: string
  dateRange: string
}

export interface TextContentData {
  content: string
}

export interface ImageSectionData {
  url: string
}

export function createWidgetsNode(type: WidgetType): WidgetNode {
  const id = `${type}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
  switch (type) {
    case 'BasicInfo':
      return {
        type: 'BasicInfo',
        id,
        data: {
          avatarUrl: '/dnd-resume/avatar.jpg',
          name: '炭治郎',
          jobTitle: '前端开发工程师',
          linksGroup: [
            [
              { href: '', content: '1994/11', icon: 'MynauiCake' },
              { href: '', content: '15123520989', icon: 'MynauiTelephoneCall' },
            ],
            [
              {
                href: 'https://github.com/Arman19941113',
                content: 'github.com',
                icon: 'LogosGithubIcon',
              },
              {
                href: 'mailto:td19941113@gmail.com',
                content: 'td19941113@gmail.com',
                icon: 'LogosGoogleGmail',
              },
            ],
            [],
          ],
        },
      }
    case 'TitleSection':
      return {
        type: 'TitleSection',
        id,
        data: {
          title: '工作经历',
        },
      }
    case 'ExperienceTime':
      return {
        type: 'ExperienceTime',
        id,
        data: {
          title: '腾讯科技（深圳）有限公司',
          dateRange: '2077/01 - 至今',
        },
      }
    case 'TextContent':
      return {
        type: 'TextContent',
        id,
        data: {
          content: '负责 xxx 业务',
        },
      }
    case 'ImageSection':
      return {
        type: 'ImageSection',
        id,
        data: {
          url: '/dnd-resume/image.png',
        },
      }
    default: {
      const exhaustiveCheck: never = type
      return exhaustiveCheck
    }
  }
}

export const createLinkItem: () => LinkItem = () => {
  return { href: 'https://github.com/', content: 'github.com', icon: 'RiLinksLine' }
}
