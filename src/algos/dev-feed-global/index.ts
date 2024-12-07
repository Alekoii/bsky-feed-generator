import { AppContext } from '../../config'
import {
  QueryParams,
  OutputSchema as AlgoOutput,
} from '../../lexicon/types/app/bsky/feed/getFeedSkeleton'
import * as designFeed from './devskygbl'

type AlgoHandler = (ctx: AppContext, params: QueryParams) => Promise<AlgoOutput>

const algos: Record<string, AlgoHandler> = {
  [designFeed.shortname]: designFeed.handler,
}

export default algos