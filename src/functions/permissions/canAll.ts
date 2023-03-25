import { usePage } from "@inertiajs/vue3";
import { emptyArray } from "@/helpers";
import { hasSuperRole } from "..";

const canAll = (value: String|Array<String>): Boolean => {
    if (typeof value !== 'string' && !Array.isArray(value)) {
        throw new Error('Please pass only string or array value');
    };

    if (hasSuperRole()) {
        return true;
    }

    // @ts-ignore
    let permissions = usePage().props.auth? (usePage().props.auth.permissions?? []) : [];

    if (emptyArray(permissions)) {
        return false;
    }

    let _return = false;
    if (typeof value === 'string') {
        if(value.includes('|')){
            _return = true;
			value.split('|').forEach(function (item) {
				if(!permissions.includes(item.trim())){
					_return = false;
				}
			});
        } else {
            _return = permissions.includes(value.trim());
        }
    } else {
        _return = true;
        value.forEach(function (item) {
            if (typeof item === 'string') {
                if(!permissions.includes(item.trim())){
                    _return = false;
                }
            }
        });
    }

    return _return;
}

export default canAll;