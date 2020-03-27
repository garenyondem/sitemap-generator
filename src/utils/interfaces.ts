interface ISitemapItem {
    url: string;
    sub_urls: ISitemapItem[]
}

interface ISitemapQuery {
    fromUrl: string
}

export { ISitemapItem, ISitemapQuery };