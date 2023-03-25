import { usePage } from "@inertiajs/vue3";
import { emptyArray } from "@/helpers";

const isExact = (value:String|Array<String>) => {
    if (!Array.isArray(value)) {
        throw new Error('Please pass only array value');
    };

    // @ts-ignore
    let roles = usePage().props.auth? (usePage().props.auth.roles?? []) : [];

    if (emptyArray(roles)) {
        return false;
    }

    value.forEach((element, index) => {
        if (typeof element === 'string') {
            value[index] = element.trim();
        }
    });

    if (roles.sort().join(',') === value.sort().join(',')) {
        return true;
    }

    return false;
}

export default isExact;