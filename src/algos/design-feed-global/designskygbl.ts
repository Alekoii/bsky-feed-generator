import { QueryParams } from '../../lexicon/types/app/bsky/feed/getFeedSkeleton'
import { AppContext } from '../../config'
import { DESIGN_KEYWORDS } from './constants'

// max 15 chars
export const shortname = 'designskygbl'

export const handler = async (ctx: AppContext, params: QueryParams) => {
  let builder = ctx.db
    .selectFrom('post')
    .selectAll()
    .orderBy('indexedAt', 'desc')
    .orderBy('cid', 'desc')
    .limit(params.limit || 50)

  if (params.cursor) {
    const timeStr = new Date(parseInt(params.cursor, 10)).toISOString()
    builder = builder.where('post.indexedAt', '<', timeStr)
  }

  const posts = await builder.execute()

  const feed = posts
    .map((row) => ({
      post: row.uri,
    }))
    .filter((item) => {
      return true
    })

  let cursor: string | undefined
  const last = posts.at(-1)
  if (last) {
    cursor = new Date(last.indexedAt).getTime().toString(10)
  }

  return {
    cursor,
    feed,
  }
}

// Helper function to check if post contains design keywords
function containsDesignKeywords(text: string): boolean {
  const lowerText = text.toLowerCase()
  return DESIGN_KEYWORDS.some(keyword => 
    typeof keyword === 'string' && lowerText.includes(keyword.toLowerCase())
  )
}