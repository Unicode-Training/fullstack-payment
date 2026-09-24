export const ROUTES_PROTECTED = [
    {
        path: '/admin/roles',
        permissions: 'ADMIN'
    },
    {
        path: '/admin/permissions',
        permissions: 'ADMIN'
    },
    {
        path: '/admin/products/create',
        permissions: 'products.create'
    },
    {
        path: '/admin/products/edit',
        permissions: 'products.update'
    },
    {
        path: '/admin/products',
        permissions: 'products.read'
    },
    {
        path: '/admin/posts/create',
        permissions: 'posts.create'
    },
    {
        path: '/admin/posts/edit',
        permissions: 'posts.update'
    },
    {
        path: '/admin/posts',
        permissions: 'posts.read'
    },
    {
        path: '/admin/users/create',
        permissions: 'users.create'
    },
    {
        path: '/admin/users/edit',
        permissions: 'users.update'
    },
    {
        path: '/admin/users',
        permissions: 'users.read'
    },

];