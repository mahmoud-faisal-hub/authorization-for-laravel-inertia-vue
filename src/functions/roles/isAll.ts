import { usePage } from "@inertiajs/vue3";
import { emptyArray } from "@/helpers";

const isAll = (value:String|Array<String>) => {
    if (typeof value !== 'string' && !Array.isArray(value)) {
        throw new Error('Please pass only string or array value');
    };

    // @ts-ignore
    let roles = usePage().props.auth? (usePage().props.auth.roles?? []) : [];

    if (emptyArray(roles)) {
        return false;
    }

    let _return = false;
    if (typeof value === 'string') {
        if(value.includes('|')){
            _return = true;
			value.split('|').forEach(function (item) {
				if(!roles.includes(item.trim())){
					_return = false;
				}
			});
        } else {
            _return = roles.includes(value.trim());
        }
    } else {
        _return = true;
        value.forEach(function (item) {
            if (typeof item === 'string') {
                if(!roles.includes(item.trim())){
                    _return = false;
                }
            }
        });
    }

    return _return;
}

export default isAll;