export const namespaced = true

export const state = {
  agegroupOptions: ['all', 'adult', 'juvenile'],
  categoryOptions: [
    'corrections',
    'courts',
    'crimes',
    'law enforcement',
    'other'
  ],
  timeperiodOptions: ['calendar', 'fiscal-Federal', 'fiscal-Illinois', 'other'],
  typeOptions: ['article', 'report', 'research report'],
  unitOptions: ['national', 'state', 'county', 'municipal', 'other'],
  rules: {
    required: value => !!value || 'Required.',
    timeperiod: value =>
      /^\d{4}-\d{4}$/g.test(value) || 'Correct format: yyyy-yyyy'
  }
}
