import { isAny } from "..";

const isNotAny = (value:String|Array<String>) => { return !isAny(value) }

export default isNotAny;