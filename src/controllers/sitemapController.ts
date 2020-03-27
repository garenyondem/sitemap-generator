import { Request, Response, NextFunction } from 'express';
import { ISitemapQuery } from '../utils/interfaces';
import { SitemapService } from '../services/sitemapService';

export async function sitemap(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { fromUrl } = req.query as ISitemapQuery;

    const sitemapService = new SitemapService(fromUrl);
    const result = await sitemapService.generate();
    
    res.status(200).json(result);
    next();
}
