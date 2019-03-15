export const namespaced = true

export const state = {
  agegroupOptions: ['juvenile', 'adult', 'juvenile/adult'],
  categoryOptions: [
    'corrections',
    'courts',
    'crimes',
    'law enforcement',
    'other'
  ],
  rules: {
    required: value => !!value || 'Required.',
    timeperiod: value =>
      value.match(/^\d{4}-\d{4}$/g) || 'Correct format: yyyy-yyyy'
  }
}
