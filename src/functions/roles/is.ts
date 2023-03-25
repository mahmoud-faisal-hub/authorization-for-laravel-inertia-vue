import { usePage } from "@inertiajs/vue3";
import { emptyArray } from "@/helpers";

const is = (value: String) => {
    if (typeof value !== 'string') {
        throw new Error('Please pass only string value');
    };

    // @ts-ignore
    let roles = usePage().props.auth? (usePage().props.auth.roles?? []) : [];

    if (emptyArray(roles)) {
        return false;
    }

    if (roles.includes(value.trim())) {
        return true;
    }

    return false;
}

export default is;