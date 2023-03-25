import { usePage } from "@inertiajs/vue3";
import { emptyArray } from "@/helpers";
import { hasSuperRole } from "..";

const can = (value: String): Boolean => {
    if (typeof value !== 'string') {
        throw new Error('Please pass only string value');
    };

    if (hasSuperRole()) {
        return true;
    }

    // @ts-ignore
    let permissions: Array<String> = usePage().props.auth? (usePage().props.auth.permissions?? []) : [];

    if (emptyArray(permissions)) {
        return false;
    }

    if (permissions.includes(value.trim())) {
        return true;
    }

    return false;
}

export default can;