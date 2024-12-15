export type WidgetType =
  | 'BasicInfo'
  | 'TitleSection'
  | 'ExperienceTime'
  | 'TextContent'
  | 'ImageSection'

export interface WidgetDisplayInfo {
  type: WidgetType
  icon: string
  title: string
}

export type WidgetNode =
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
