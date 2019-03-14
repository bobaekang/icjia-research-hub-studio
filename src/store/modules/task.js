export const namespaced = true

export const state = {
  items: [
    {
      title: 'manage contents',
      path: 'manage',
      permission: 'R&A Manager'
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
      title: 'post new',
      path: 'post-new'
    },
    {
      title: 'post update',
      path: 'post-update'
    }
  ]
}
