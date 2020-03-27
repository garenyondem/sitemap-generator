import { ISitemapItem } from "../utils/interfaces";
import getHrefs from 'get-hrefs';
import fetch from 'node-fetch';

export class SitemapService {

    #baseUrl: string;
    #fromUrl: string;
    #scannedUrls: Set<string>;

    constructor(fromUrl: string) {
        this.#baseUrl = new URL(fromUrl).origin;
        this.#fromUrl = fromUrl;
        this.#scannedUrls = new Set();
    }

    public async generate() {
        const initialItem = {
            url: this.#fromUrl,
            sub_urls: [],
        };
        this.#scannedUrls.add(this.#fromUrl);
        const result = this.recursiveFetch(initialItem);
        return result;
    }
    
    private async recursiveFetch(item: ISitemapItem) {
        const sub_urls = await this.fetchUrls(item.url);
        if (!sub_urls.length) {
            return;
        }
        const promises = sub_urls.map(async (item: ISitemapItem) => {
            item.sub_urls = (await this.recursiveFetch(item)) || [];
            return item;
        });
        const result = await Promise.all(promises);
        return result;
    }
    
    private async fetchUrls(url: string): Promise<ISitemapItem[]> {
        console.info(`Fetching html from ${url}`);
        const html = await this.fetchHtml(url);
        return this.mapUrls(html);
    }
    
    private mapUrls(html: string): ISitemapItem[] {
        const hrefs = this.filterUniqueHrefs(html);
        return hrefs.map((item) => {
            this.#scannedUrls.add(item);
            return {
                url: item,
                sub_urls: [],
            } as ISitemapItem;
        });
    }
    
    private filterUniqueHrefs(html: string) {
        const options = {
            baseUrl: this.#baseUrl, removeQueryParameters: [/(.*?)/] 
        }
        const hrefs: string[] = getHrefs(html, options).filter((x: string) => {
            return x.includes(this.#baseUrl) && !this.#scannedUrls.has(x);
        });
        return [...new Set(hrefs)];
    }
    
    private async fetchHtml(url: string) {
        try {
            const result = await fetch(url);
            return result.text();
        } catch (err) {
            return '';
        }
    }
}