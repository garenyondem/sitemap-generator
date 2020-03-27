import { Router } from 'express';
import { sitemap } from '../controllers/sitemapController';

export const routes = Router();

routes.get('/sitemap', sitemap);
