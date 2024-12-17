export type WidgetType =
  | 'BasicInfo'
  | 'TitleSection'
  | 'ExperienceTime'
  | 'TextContent'
  | 'ImageSection'

export interface WidgetMaterial {
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

interface CommonStyleData {
  style: {
    marginTop: number
    marginBottom: number
  }
}

export interface BasicInfoData extends CommonStyleData {
  avatarUrl: string
  name: string
  jobTitle: string
  linksGroup: [LinkGroupData, LinkGroupData, LinkGroupData]
}
export type LinkGroupData = LinkItemData[]
export interface LinkItemData {
  href: string
  content: string
  icon: string
}

export interface TitleSectionData extends CommonStyleData {
  title: string
}

export interface ExperienceTimeData extends CommonStyleData {
  title: string
  dateRange: string
}

export interface TextContentData extends CommonStyleData {
  content: string
}

export interface ImageSectionData extends CommonStyleData {
  url: string
}
