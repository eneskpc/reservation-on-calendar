import NameSlug from "./NameSlug";
import Venue from "./Venue";

export default interface Event extends NameSlug {
  url: string;
  content: string;
  start: string;
  end: string;
  is_free: boolean;
  poster_url: string;
  ticket_url: string;
  phone: string;
  email: string;
  facebook_url: string;
  twitter_url: string;
  hashtag: string;
  web_url: string;
  live_url: string;
  android_url: string;
  ios_url: string;
  format: NameSlug;
  category: NameSlug;
  venue: Venue;
  tags: NameSlug[];
}
