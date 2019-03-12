export const namespaced = true

export const state = {
  items: [
    {
      title: 'manage contents',
      path: 'manage',
      permission: 'R&A Manager'
    },
    {
      title: 'post new',
      path: 'post'
    },
    {
      title: 'submit new',
      path: 'submit-new',
      permission: 'R&A User'
    },
    {
      title: 'submit update',
      path: 'submit-update',
      permission: 'R&A User'
    },
    {
      title: 'update',
      path: 'update'
    }
  ]
}
