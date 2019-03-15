export const namespaced = true

export const state = {
  options: {
    agegroup: ['juvenile', 'adult', 'juvenile/adult'],
    category: ['corrections', 'courts', 'crimes', 'law enforcement', 'other']
  },
  rules: {
    required: value => !!value || 'Required.'
  }
}
