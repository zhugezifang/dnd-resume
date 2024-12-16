import type {
  LinkItemData,
  WidgetMaterial,
  WidgetNode,
  WidgetType,
} from '@/components/widgets/widgets-type.d.ts'

export const widgetMaterialList: WidgetMaterial[] = [
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

export const widgetMaterialMap: { [type: string]: WidgetMaterial } = {}
for (const widgetInfo of widgetMaterialList) {
  widgetMaterialMap[widgetInfo.type] = widgetInfo
}

export function createWidgetsNode(type: WidgetType): WidgetNode {
  const id = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
  switch (type) {
    case 'BasicInfo':
      return {
        type: 'BasicInfo',
        id,
        data: {
          avatarUrl: '/avatar.jpg',
          name: '炭治郎',
          jobTitle: '前端开发工程师',
          linksGroup: [
            [
              {
                href: '',
                content: '2050/01',
                icon: 'MynauiCake',
              },
              {
                href: '',
                content: '15123456789',
                icon: 'MynauiTelephoneCall',
              },
            ],
            [
              {
                href: 'https://github.com/',
                content: 'github.com',
                icon: 'LogosGithubIcon',
              },
              {
                href: 'mailto:tanjiro@gmail.com',
                content: 'tanjiro@gmail.com',
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
          dateRange: '2077/07 - 2080/07',
        },
      }
    case 'TextContent':
      return {
        type: 'TextContent',
        id,
        data: {
          content:
            '<h3><a target="_blank" rel="noopener noreferrer nofollow" href="https://pay.weixin.qq.com/">微信支付</a> - Web 前端开发</h3><ul><li><p>负责从需求分析到前端架构设计、功能开发及性能优化的全流程开发工作。</p></li><li><p>坚持与产品、设计、后端团队紧密协作，推动敏捷开发流程和 CI/CD 工具链的落地，确保高质量的交付。</p></li><li><p>通过深入研究用户体验和前端性能，成功优化支付流程页面，提升了用户转化率和支付成功率。</p></li></ul>',
        },
      }
    case 'ImageSection':
      return {
        type: 'ImageSection',
        id,
        data: {
          url: '/image.png',
        },
      }
    default: {
      const exhaustiveCheck: never = type
      return exhaustiveCheck
    }
  }
}

export const createLinkItem: () => LinkItemData = () => {
  return {
    href: 'https://github.com/',
    content: 'github.com',
    icon: 'RiLinksLine',
  }
}
