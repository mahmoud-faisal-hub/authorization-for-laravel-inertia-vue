import { isAll } from "..";

const isNotAll = (value:String|Array<String>) => { return !isAll(value) }

export default isNotAll;