import type { App } from 'vue';
import * as auth from './functions';

export default {
    install: (app: App) => {
        // Permissions Global Properties
        app.config.globalProperties.can = (value: String) => { return auth.can(value) };
        app.config.globalProperties.canNot = (value: String) => { return auth.canNot(value) };
        app.config.globalProperties.canAny = (value: String|Array<String>) => { return auth.canAny(value) };
        app.config.globalProperties.canNotAny = (value: String|Array<String>) => { return auth.canNotAny(value) };
        app.config.globalProperties.canAll = (value: String|Array<String>) => { return auth.canAll(value) };
        app.config.globalProperties.canNotAll = (value: String|Array<String>) => { return auth.canNotAll(value) };
        app.config.globalProperties.guest = app.config.globalProperties.hasNoPermissions = () => { return auth.guest() };

        // Roles Global Properties
        app.config.globalProperties.is = app.config.globalProperties.hasRole = (value: String) => { return auth.is(value) };
        app.config.globalProperties.isNot = app.config.globalProperties.unlessRole = (value: String) => { return auth.isNot(value) };
        app.config.globalProperties.isAny = app.config.globalProperties.hasAnyRole = (value: String|Array<String>) => { return auth.isAny(value) };
        app.config.globalProperties.isNotAny = app.config.globalProperties.unlessAnyRole = (value: String|Array<String>) => { return auth.isNotAny(value) };
        app.config.globalProperties.isAll = app.config.globalProperties.hasAllRoles = (value: String|Array<String>) => { return auth.isAll(value) };
        app.config.globalProperties.isNotAll = app.config.globalProperties.unlessAllRoles = (value: String|Array<String>) => { return auth.isNotAll(value) };
        app.config.globalProperties.isExact = app.config.globalProperties.hasExactRoles = (value: String|Array<String>) => { return auth.isExact(value) };
        app.config.globalProperties.hasNoRoles = () => { return auth.hasNoRoles() };
        app.config.globalProperties.isSuper = app.config.globalProperties.hasSuperRole = () => { return auth.isSuper() };
        app.config.globalProperties.isNotSuper = app.config.globalProperties.unlessSuperRole = () => { return auth.isNotSuper() };
    },
};