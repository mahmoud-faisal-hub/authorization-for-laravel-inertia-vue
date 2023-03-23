import { usePage } from "@inertiajs/vue3";

export default {
    install: (app, options) => {
        // Permissions Global Properties
        app.config.globalProperties.can = (value) => { return can(value) };
        app.config.globalProperties.canNot = (value) => { return canNot(value) };
        app.config.globalProperties.canAny = (value) => { return canAny(value) };
        app.config.globalProperties.canNotAny = (value) => { return canNotAny(value) };
        app.config.globalProperties.canAll = (value) => { return canAll(value) };
        app.config.globalProperties.canNotAll = (value) => { return canNotAll(value) };
        app.config.globalProperties.guest = app.config.globalProperties.hasNoPermissions = () => { return guest() };

        // Roles Global Properties
        app.config.globalProperties.is = app.config.globalProperties.hasRole = (value) => { return is(value) };
        app.config.globalProperties.isNot = app.config.globalProperties.unlessRole = (value) => { return isNot(value) };
        app.config.globalProperties.isAny = app.config.globalProperties.hasAnyRole = (value) => { return isAny(value) };
        app.config.globalProperties.isNotAny = app.config.globalProperties.unlessAnyRole = (value) => { return isNotAny(value) };
        app.config.globalProperties.isAll = app.config.globalProperties.hasAllRoles = (value) => { return isAll(value) };
        app.config.globalProperties.isNotAll = app.config.globalProperties.unlessAllRoles = (value) => { return isNotAll(value) };
        app.config.globalProperties.isExact = app.config.globalProperties.hasExactRoles = (value) => { return isExact(value) };
        app.config.globalProperties.hasNoRoles = () => { return hasNoRoles() };
    },
};

const can = (value) => {
    if (typeof value !== 'string') {
        throw new Error('Please pass only string value');
    };

    if (hasSuperRole()) {
        return true;
    }

    let permissions = usePage().props.auth? (usePage().props.auth.permissions?? []) : [];

    if (emptyArray(permissions)) {
        return false;
    }

    if (permissions.includes(value.trim())) {
        return true;
    }

    return false;
}

const canNot = (value) => { return !can(value) }

const canAny = (value) => {
    if (typeof value !== 'string' && !Array.isArray(value)) {
        throw new Error('Please pass only string or array value');
    };

    if (hasSuperRole()) {
        return true;
    }

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

const canNotAny = (value) => { return !canAny(value) }

const canAll = (value) => {
    if (typeof value !== 'string' && !Array.isArray(value)) {
        throw new Error('Please pass only string or array value');
    };

    if (hasSuperRole()) {
        return true;
    }

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

const canNotAll = (value) => { return !canAll(value) }

let guest, hasNoPermissions;
guest = hasNoPermissions = () => {
    if (hasSuperRole()) {
        return false;
    }

    let permissions = usePage().props.auth? (usePage().props.auth.permissions?? []) : [];

    if (emptyArray(permissions)) {
        return true;
    }

    return false;
}

let is, hasRole;
is = hasRole = (value) => {
    if (typeof value !== 'string') {
        throw new Error('Please pass only string value');
    };

    let roles = usePage().props.auth? (usePage().props.auth.roles?? []) : [];

    if (emptyArray(roles)) {
        return false;
    }

    if (roles.includes(value.trim())) {
        return true;
    }

    return false;
}

let isNot, unlessRole;
isNot = unlessRole = (value) => { return !is(value) }

let isAny, hasAnyRole;
isAny = hasAnyRole = (value) => {
    if (typeof value !== 'string' && !Array.isArray(value)) {
        throw new Error('Please pass only string or array value');
    };

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

let isNotAny, unlessAnyRole;
isNotAny = unlessAnyRole = (value) => { return !isAny(value) }

let isAll, hasAllRoles;
isAll = hasAllRoles = (value) => {
    if (typeof value !== 'string' && !Array.isArray(value)) {
        throw new Error('Please pass only string or array value');
    };

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

let isNotAll, unlessAllRoles;
isNotAll = unlessAllRoles = (value) => { return !isAll(value) }

let isExact, hasExactRoles;
isExact = hasExactRoles = (value) => {
    if (!Array.isArray(value)) {
        throw new Error('Please pass only array value');
    };

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

const hasNoRoles = () => {
    let roles = usePage().props.auth? (usePage().props.auth.roles?? []) : [];

    if (emptyArray(roles)) {
        return true;
    }

    return false;
}

const emptyArray = (arr) => {
    if (Array.isArray(arr) && arr.length > 0) {
        return false;
    }

    return true;
}

const hasSuperRole = () => {
    let roles = usePage().props.auth? (usePage().props.auth.roles?? []) : [];
    let superRoles = usePage().props.superRoles?? [];

    if (!emptyArray(roles) && !emptyArray(superRoles) && roles.some((item) => superRoles.includes(item))) {
        return true;
    }

    return false;
}

export { can, canNot, canAny, canNotAny, canAll, canNotAll, guest, hasNoPermissions, is, hasRole, isNot, unlessRole, isAny, hasAnyRole, isNotAny, unlessAnyRole, isAll, hasAllRoles, isNotAll, unlessAllRoles, isExact, hasExactRoles, hasNoRoles };
