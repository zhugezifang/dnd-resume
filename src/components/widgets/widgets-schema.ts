import { z } from 'zod'

const linkItemSchema = z.object({
  href: z.string(),
  content: z.string(),
  icon: z.string(),
})

const basicInfoSchema = z.object({
  type: z.literal('BasicInfo'),
  id: z.string(),
  data: z.object({
    avatarUrl: z.string(),
    name: z.string(),
    jobTitle: z.string(),
    linksGroup: z.tuple([
      z.array(linkItemSchema),
      z.array(linkItemSchema),
      z.array(linkItemSchema),
    ]),
    style: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

const titleSectionSchema = z.object({
  type: z.literal('TitleSection'),
  id: z.string(),
  data: z.object({
    title: z.string(),
    style: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

const experienceTimeSchema = z.object({
  type: z.literal('ExperienceTime'),
  id: z.string(),
  data: z.object({
    title: z.string(),
    dateRange: z.string(),
    style: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

const textContentSchema = z.object({
  type: z.literal('TextContent'),
  id: z.string(),
  data: z.object({
    content: z.string(),
    style: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

const imageSectionSchema = z.object({
  type: z.literal('ImageSection'),
  id: z.string(),
  data: z.object({
    url: z.string(),
    style: z.object({
      marginTop: z.number(),
      marginBottom: z.number(),
    }),
  }),
})

const widgetSchema = z.discriminatedUnion('type', [
  basicInfoSchema,
  titleSectionSchema,
  experienceTimeSchema,
  textContentSchema,
  imageSectionSchema,
])

export const widgetsSchema = widgetSchema.array()
