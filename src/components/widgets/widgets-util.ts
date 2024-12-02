export type WidgetType =
  | 'BasicInfo'
  | 'TitleSection'
  | 'ExperienceTime'
  | 'TextContent'
  | 'ImageSection'

export interface WidgetNode {
  type: WidgetType
  id: string
  props?: any
}

export function createWidgetsNode(type: WidgetType): WidgetNode {
  const id = `${type}_${Date.now()}`
  switch (type) {
    case 'BasicInfo':
      return {
        type: 'BasicInfo',
        id,
        props: {},
      }
    case 'TitleSection':
      return {
        type: 'TitleSection',
        id,
        props: {},
      }
    case 'ExperienceTime':
      return {
        type: 'ExperienceTime',
        id,
        props: {},
      }
    case 'TextContent':
      return {
        type: 'TextContent',
        id,
        props: {},
      }
    case 'ImageSection':
      return {
        type: 'ImageSection',
        id,
        props: {},
      }
    default: {
      const exhaustiveCheck: never = type
      return exhaustiveCheck
    }
  }
}
