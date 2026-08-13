import "server-only";

import type { HomePageContent } from "../model/home-blocks";
import {
  getLandingPageContent as getGenericLandingPageContent,
  saveLandingPageBlocks,
} from "./get-landing-page-content";
import { LANDING_PAGE_SLUGS } from "../model/landing-page-slugs";

const HOME_SLUG = LANDING_PAGE_SLUGS.home;

export async function getHomePageContent(): Promise<HomePageContent> {
  const content = await getGenericLandingPageContent(HOME_SLUG);
  return content as HomePageContent;
}

export { saveLandingPageBlocks };
