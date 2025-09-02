declare module '@tryghost/content-api' {
  interface GhostContentAPIOptions {
    url: string
    key: string
    version: string
  }

  interface GhostMeta {
    pagination: {
      page: number
      limit: number
      pages: number
      total: number
      next: number | null
      prev: number | null
    }
  }

  interface GhostBrowseResponse<T> extends Array<T> {
    meta: GhostMeta
  }

  interface GhostBrowseOptions {
    limit?: number | 'all'
    page?: number
    filter?: string
    include?: string
    fields?: string
    order?: string
  }

  interface GhostReadOptions {
    include?: string
    fields?: string
    formats?: string[]
  }

  interface GhostReadIdentifier {
    id?: string
    slug?: string
  }

  class GhostContentAPI {
    constructor(options: GhostContentAPIOptions)

    posts: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      browse(options?: GhostBrowseOptions): Promise<GhostBrowseResponse<any>>
      read(
        identifier: GhostReadIdentifier,
        options?: GhostReadOptions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ): Promise<any>
    }

    pages: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      browse(options?: GhostBrowseOptions): Promise<GhostBrowseResponse<any>>
      read(
        identifier: GhostReadIdentifier,
        options?: GhostReadOptions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ): Promise<any>
    }

    tags: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      browse(options?: GhostBrowseOptions): Promise<GhostBrowseResponse<any>>
      read(
        identifier: GhostReadIdentifier,
        options?: GhostReadOptions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ): Promise<any>
    }

    authors: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      browse(options?: GhostBrowseOptions): Promise<GhostBrowseResponse<any>>
      read(
        identifier: GhostReadIdentifier,
        options?: GhostReadOptions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ): Promise<any>
    }

    settings: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      browse(): Promise<any>
    }
  }

  export = GhostContentAPI
}
