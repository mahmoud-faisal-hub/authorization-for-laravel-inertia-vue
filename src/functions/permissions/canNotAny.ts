import { canAny } from "..";

const canNotAny = (value: String|Array<String>): Boolean => { return !canAny(value) }

export default canNotAny;