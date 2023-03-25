import { usePage } from "@inertiajs/vue3";
import { emptyArray } from "@/helpers";
import { hasSuperRole } from "..";

const canAny = (value: String|Array<String>): Boolean => {
    if (typeof value !== 'string' && !Array.isArray(value)) {
        throw new Error('Please pass only string or array value');
    };

    if (hasSuperRole()) {
        return true;
    }

    // @ts-ignore
    let permissions: Array<String> = usePage().props.auth? (usePage().props.auth.permissions?? []) : [];

    if (emptyArray(permissions)) {
        return false;
    }

    let _return = false;
    if (typeof value === 'string') {
        if(value.includes('|')){
			value.split('|').every(function (item) {
				if(permissions.includes(item.trim())){
					_return = true;
                    return;
				}
                return true;
			});
        } else {
            _return = permissions.includes(value.trim());
        }
    } else {
        value.every(function (item) {
            if (typeof item === 'string') {
                if(permissions.includes(item.trim())){
                    _return = true;
                    return;
                }
            }
            return true;
        });
    }

    return _return;
}

export default canAny;