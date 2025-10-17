import { default as astroRss } from "@astrojs/rss";
import { config } from "selo-components/config";

export const rss = (feed: any[]) => async (context: any) =>
  astroRss({
    title: config.title,
    description: config.description,
    site: context.site,
    items: feed.map((post) => ({
      ...post.data,
      link: `https://${config.hostname}/${post.id}/`,
      content: post.rendered.html,
      pubDate: post.data.date,
    })),
  });
