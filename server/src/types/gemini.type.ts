export type SlideCaptionsRequest = {
  place: string | string[];
  activities: string;
  events: string[];
}[];

export type ChaperTitleHashTagResponse = {
  name: string;
  title: string;
  hashtags: string[];
}[];
