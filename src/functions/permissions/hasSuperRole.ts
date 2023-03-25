import { usePage } from "@inertiajs/vue3";

const hasSuperRole = (): Boolean => {
    // @ts-ignore
    let roles = usePage().props.auth? (usePage().props.auth.roles?? []) : [];
    let superRoles = usePage().props.superRoles?? [];

    // @ts-ignore
    if (!emptyArray(roles) && !emptyArray(superRoles) && roles.some((item: String) => superRoles.includes(item))) {
        return true;
    }

    return false;
}

export default hasSuperRole;