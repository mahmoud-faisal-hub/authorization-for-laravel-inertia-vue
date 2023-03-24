import type { App } from 'vue';
import { usePage } from "@inertiajs/vue3";

export default {
    install: (app: App) => {
        // Permissions Global Properties
        app.config.globalProperties.can = (value: String) => { return can(value) };
        app.config.globalProperties.canNot = (value: String) => { return canNot(value) };
        app.config.globalProperties.canAny = (value: String|Array<String>) => { return canAny(value) };
        app.config.globalProperties.canNotAny = (value: String|Array<String>) => { return canNotAny(value) };
        app.config.globalProperties.canAll = (value: String|Array<String>) => { return canAll(value) };
        app.config.globalProperties.canNotAll = (value: String|Array<String>) => { return canNotAll(value) };
        app.config.globalProperties.guest = app.config.globalProperties.hasNoPermissions = () => { return guest() };

        // Roles Global Properties
        app.config.globalProperties.is = app.config.globalProperties.hasRole = (value: String) => { return is(value) };
        app.config.globalProperties.isNot = app.config.globalProperties.unlessRole = (value: String) => { return isNot(value) };
        app.config.globalProperties.isAny = app.config.globalProperties.hasAnyRole = (value: String|Array<String>) => { return isAny(value) };
        app.config.globalProperties.isNotAny = app.config.globalProperties.unlessAnyRole = (value: String|Array<String>) => { return isNotAny(value) };
        app.config.globalProperties.isAll = app.config.globalProperties.hasAllRoles = (value: String|Array<String>) => { return isAll(value) };
        app.config.globalProperties.isNotAll = app.config.globalProperties.unlessAllRoles = (value: String|Array<String>) => { return isNotAll(value) };
        app.config.globalProperties.isExact = app.config.globalProperties.hasExactRoles = (value: String|Array<String>) => { return isExact(value) };
        app.config.globalProperties.hasNoRoles = () => { return hasNoRoles() };
    },
};

const can = (value: String): Boolean => {
    if (typeof value !== 'string') {
        throw new Error('Please pass only string value');
    };

    if (hasSuperRole()) {
        return true;
    }

    // @ts-ignore
    let permissions = usePage().props.auth? (usePage().props.auth.permissions?? []) : [];

    if (emptyArray(permissions)) {
        return false;
    }

    if (permissions.includes(value.trim())) {
        return true;
    }

    return false;
}

const canNot = (value: String): Boolean => { return !can(value) }

const canAny = (value: String|Array<String>): Boolean => {
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

const canNotAny = (value: String|Array<String>): Boolean => { return !canAny(value) }

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

const canNotAll = (value: String|Array<String>): Boolean => { return !canAll(value) }

let guest: () => Boolean, hasNoPermissions: () => Boolean;
guest = hasNoPermissions = (): Boolean => {
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

let is: (value:String|Array<String>) => Boolean, hasRole: (value:String|Array<String>) => Boolean;
is = hasRole = (value) => {
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

let isNot: (value:String|Array<String>) => Boolean, unlessRole: (value:String|Array<String>) => Boolean;
isNot = unlessRole = (value) => { return !is(value) }

let isAny: (value:String|Array<String>) => Boolean, hasAnyRole: (value:String|Array<String>) => Boolean;
isAny = hasAnyRole = (value) => {
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
			value.split('|').every(function (item) {
				if(roles.includes(item.trim())){
					_return = true;
                    return;
				}
                return true;
			});
        } else {
            _return = roles.includes(value.trim());
        }
    } else {
        value.every(function (item) {
            if (typeof item === 'string') {
                if(roles.includes(item.trim())){
                    _return = true;
                    return;
                }
            }
            return true;
        });
    }

    return _return;
}

let isNotAny: (value:String|Array<String>) => Boolean, unlessAnyRole: (value:String|Array<String>) => Boolean;
isNotAny = unlessAnyRole = (value) => { return !isAny(value) }

let isAll: (value:String|Array<String>) => Boolean, hasAllRoles: (value:String|Array<String>) => Boolean;
isAll = hasAllRoles = (value) => {
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

let isNotAll: (value:String|Array<String>) => Boolean, unlessAllRoles: (value:String|Array<String>) => Boolean;
isNotAll = unlessAllRoles = (value) => { return !isAll(value) }

let isExact: (value:String|Array<String>) => Boolean, hasExactRoles: (value:String|Array<String>) => Boolean;
isExact = hasExactRoles = (value) => {
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

const hasNoRoles = (): Boolean => {
    // @ts-ignore
    let roles = usePage().props.auth? (usePage().props.auth.roles?? []) : [];

    if (emptyArray(roles)) {
        return true;
    }

    return false;
}

const emptyArray = (arr: Array<any>): Boolean => {
    if (Array.isArray(arr) && arr.length > 0) {
        return false;
    }

    return true;
}

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

export { can, canNot, canAny, canNotAny, canAll, canNotAll, guest, hasNoPermissions, is, hasRole, isNot, unlessRole, isAny, hasAnyRole, isNotAny, unlessAnyRole, isAll, hasAllRoles, isNotAll, unlessAllRoles, isExact, hasExactRoles, hasNoRoles };
