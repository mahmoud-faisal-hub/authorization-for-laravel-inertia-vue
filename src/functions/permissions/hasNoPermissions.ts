import { usePage } from "@inertiajs/vue3";
import { emptyArray } from "@/helpers";
import { hasSuperRole } from "..";

const hasNoPermissions = (): Boolean => {
    if (hasSuperRole()) {
        return false;
    }

    // @ts-ignore
    let permissions = usePage().props.auth? (usePage().props.auth.permissions?? []) : [];

    if (emptyArray(permissions)) {
        return true;
    }

    return false;
}

export default hasNoPermissions;