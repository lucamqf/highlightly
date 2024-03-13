import { ICrawler } from ".";

export interface IBook {
  id: string;
  title: string;
  authors: string;
  image: string;
}

export interface IHighlight {
  title: string;
  note: string;
  location: string;
  type: string;
}

export type IExtractHighlightsCrawlerOutput = {
  books: IBook[];
  highlights: Record<string, IHighlight[]>;
};

export type IExtractHighlightsCrawler = ICrawler<
  void,
  IExtractHighlightsCrawlerOutput
>;
