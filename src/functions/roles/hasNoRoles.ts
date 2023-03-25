import { usePage } from "@inertiajs/vue3";
import { emptyArray } from "@/helpers";

const hasNoRoles = (): Boolean => {
    // @ts-ignore
    let roles = usePage().props.auth? (usePage().props.auth.roles?? []) : [];

    if (emptyArray(roles)) {
        return true;
    }

    return false;
}

export default hasNoRoles;