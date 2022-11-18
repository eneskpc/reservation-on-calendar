import NameSlug from "./NameSlug";

export default interface Venue extends NameSlug {
  about: string;
  lat: string;
  lng: string;
  status: number;
  phone: string;
  web_url: string;
  facebook_url: string;
  twitter_url: string;
  city: NameSlug;
  district: NameSlug;
  neighborhood: NameSlug;
  address: string;
}
