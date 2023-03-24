# Authorization For Laravel Inertia Vue

Authorization For Laravel Inertia Vue is a js package to check for the logged in user roles and permissions.

## After installed you can use it like this in [Vue.js](https://vuejs.org/):

```html
<!-- Check if the user has a permission -->
<div v-if="can('edit post')">
  <!-- Do something -->
</div>

<!-- Check if the user has a role -->
<div v-if="is('writer')">
  <!-- Do something -->
</div>
<!-- OR -->
<div v-if="hasRole('writer')">
  <!-- Do something -->
</div>

<!-- Check if the user has any permission in given a array -->
<div v-if="canAny(['create post', 'edit post', 'delete post'])">
  <!-- Do something -->
</div>

<!-- Check if the user has any permission using a separator -->
<div v-if="canAny('create post | edit post | delete post'])">
  <!-- Do something -->
</div>

<!-- Check if the user has any role in given a array -->
<div v-if="isAny(['writer', 'editor'])">
  <!-- Do something -->
</div>
<!-- OR -->
<div v-if="hasAnyRole('create post | edit post | delete post'])">
  <!-- Do something -->
</div>

<!-- Check if the user has all the permission in a given array -->
<div v-if="canAll(['create post', 'publish post'])">
  <!-- Do something -->
</div>

<!-- Check if the user has all the roles in a given array -->
<div v-if="isAll(['writer', 'editor', 'super admin'])">
  <!-- Do something -->
</div>
```

## Installation

```bash
npm install 
```

## Configuration

First, return the `roles` and `permissions` of the logged in user and the defined `superRules` in the `HandleInertiaRequests.php` file in `app\Http\Middleware\HandleInertiaRequests.php` in the `share` method:
```php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'roles' => $request->user() ? $request->user()->roles()->pluck('name') : [],
            'permissions' => $request->user() ? $request->user()->getAllPermissions()->pluck('name') : [],
        ],
        'superRoles' => ['Super Admin', 'Super Moderator'],
    ]);
}
```

Second, add and use the `authorization-for-laravel-inertia-vue` plugin in `app.js` file:

```js
import AuthorizationForLaravelInertiaVue from 'authorization-for-laravel-inertia-vue';

// The use it with the createApp
return createApp({ render: () => h(App, props) })
            .use(AuthorizationForLaravelInertiaVue)
            .mount(el);
```

And now you are good to go 🚀.

## Section Links
Permissions:

[can](#check-for-a-single-permission:) - 
[canNot](#check-if-user-does-not-has-permission:) - 
[canAny](#check-if-user-has-any-of-the-provided-permissions:) -
[canNotAny](#check-if-user-does-NOT-has-any-of-the-provided-permissions:) - 
[canAll](#check-if-user-has-all-of-the-provided-permissions:) -
[canNotAll](#check-if-user-does-not-has-all-of-the-provided-permissions:) -
[guest](#check-if-user-is-a-guest-and-do-not-has-any-permission:)

Roles

[is & hasRole](#check-for-a-single-role:) - 
[isNot & unlessRole](#check-if-user-does-not-has-role:) - 
[isAny & hasAnyRole](#check-if-user-has-any-of-the-provided-roles:) - 
[isNotAny & unlessAnyRole](#check-if-user-does-not-has-any-of-the-provided-roles:) - 
[isAll & hasAllRoles](#check-if-user-has-all-of-the-provided-role:) - 
[isNotAll & unlessAllRoles](#check-if-user-does-not-has-all-of-the-provided-role:) - 
[isExact & hasExactRoles](#check-if-user-has-exactly-all-of-a-given-list-of-roles:) - 
[hasNoRoles](#check-if-user-has-no-roles:) - 

## Documentation

All the methods provided by this package can be used in the `template` directly or imported from the package and used in the `script` as following:

### Check for a single permission:

- You can use it inside the template directly like this:
```html
<!-- Check if the user has a permission -->
<div v-if="can('edit post')">
  <!-- Do something -->
</div>
```

- Or you can use it in the script like this:
```js
import { can } from 'authorization-for-laravel-inertia-vue';

if (can('edit post')) {
    // Do something
}
```

### Check if user does **NOT** has permission:

```html
<!-- Check if the user doesn't has permission -->
<div v-if="canNot('delete post')">
  <!-- Do something -->
</div>
```

### Check if user has **ANY** of the provided permissions:

```html
<!-- Check if the user has Any permission -->
<div v-if="canAny(['edit post', 'delete post'])">
  <!-- Do something -->
</div>

<!-- OR By Using A Separator -->
<div v-if="canAny('create post | edit post | delete post')">
  <!-- Do something -->
</div>
```

### Check if user does **NOT** has **ANY** of the provided permissions:

```html
<!-- Check if the user doesn't has Any of those permissions -->
<div v-if="canNotAny(['edit post', 'delete post'])">
  <!-- Do something -->
</div>
```

### Check if user has **ALL** of the provided permissions:

```html
<!-- Check if the user has All of those permissions -->
<div v-if="canAll(['create post', 'edit post'])">
  <!-- Do something -->
</div>
```

### Check if user does **NOT** has **ALL** of the provided permissions:

```html
<!-- Check if the user does NOT has All of those permissions -->
<div v-if="canNotAll(['create post', 'edit post'])">
  <!-- Do something -->
</div>
```

### Check if user is a **GUEST** and do **NOT** has **ANY** permission:

```html
<!-- Check if the user is a guest permissions -->
<div v-if="guest()">
  <!-- Do something -->
</div>
```
---

### Check for a single role:

```html
<!-- Check if the user a role -->
<div v-if="is('writer')">
  <!-- Do something -->
</div>

<!-- Or -->
<div v-if="hasRole('writer')">
  <!-- Do something -->
</div>
```

### Check if user does **NOT** has role:

```html
<!-- Check if the user doesn't has role -->
<div v-if="isNot('writer')">
  <!-- Do something -->
</div>

<!-- Or -->
<div v-if="unlessRole('writer')">
  <!-- Do something -->
</div>
```

### Check if user has **ANY** of the provided roles:

```html
<!-- Check if the user has Any role -->
<div v-if="isAny(['writer', 'editor'])">
  <!-- Do something -->
</div>

<!-- Or -->
<div v-if="hasAnyRole(['writer', 'editor'])">
  <!-- Do something -->
</div>
```

### Check if user does **NOT** has **ANY** of the provided roles:

```html
<!-- Check if the user doesn't has Any of those roles -->
<div v-if="isNotAny(['writer', 'editor'])">
  <!-- Do something -->
</div>

<!-- Or -->
<div v-if="unlessAnyRole(['writer', 'editor'])">
  <!-- Do something -->
</div>
```

### Check if user has **ALL** of the provided role:

```html
<!-- Check if the user has All of those role -->
<div v-if="isAll(['writer', 'editor'])">
  <!-- Do something -->
</div>

<!-- Or -->
<div v-if="hasAllRoles(['writer', 'editor'])">
  <!-- Do something -->
</div>
```

### Check if user does **NOT** has ALL of the provided role:

```html
<!-- Check if the user does NOT has All of those roles -->
<div v-if="isNotAll(['writer', 'editor'])">
  <!-- Do something -->
</div>

<!-- Or -->
<div v-if="unlessAllRoles(['writer', 'editor'])">
  <!-- Do something -->
</div>
```

### Check if user has **Exactly ALL** of a given list of roles:

```html
<!-- Check if the user has exactly all of a given list of roles no more no less -->
<div v-if="isExact(['writer', 'editor'])">
  <!-- Do something -->
</div>

<!-- Or -->
<div v-if="hasExactRoles(['writer', 'editor'])">
  <!-- Do something -->
</div>
```

### Check if user has **NO** roles:

```html
<!-- Check if the user has no roles -->
<div v-if="hasNoRoles()">
  <!-- Do something -->
</div>
```

## Licence
[MIT](./LICENCE.md)
