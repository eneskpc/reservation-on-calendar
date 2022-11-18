export default interface ResponseBase<T> {
  status: number;
  data: T;
}
