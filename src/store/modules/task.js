export const namespaced = true

export const state = {
  items: [
    {
      title: 'create contents',
      path: 'create',
      permission: ['R&A User']
    },
    {
      title: 'update contents',
      path: 'update',
      permission: ['R&A User']
    },
    {
      title: 'manage contents',
      path: 'manage',
      permission: ['R&A User', 'R&A Manager']
    },
    {
      title: 'post new',
      path: 'post-new'
    },
    {
      title: 'post update',
      path: 'post-update'
    }
  ]
}
