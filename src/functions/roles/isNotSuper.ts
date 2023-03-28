import { hasSuperRole } from "..";

const isNotSuper = () => { return !hasSuperRole() }

export default isNotSuper;