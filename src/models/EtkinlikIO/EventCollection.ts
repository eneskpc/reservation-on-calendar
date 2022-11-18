import Event from "./Event";
import Meta from "./Meta";

export default interface EventCollection {
  meta: Meta;
  items: Event[];
}
