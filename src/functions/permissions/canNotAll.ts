import { canAll } from "..";

const canNotAll = (value: String|Array<String>): Boolean => { return !canAll(value) }

export default canNotAll;