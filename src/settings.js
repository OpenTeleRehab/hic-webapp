const settings = {
  date_format: 'DD/MM/YYYY',
  textMaxLength: 255,
  phoneCodeMaxLength: 3,
  isoCodeLength: 2,
  platforms: {
    options: [
      { text: 'Admin portal', value: 'admin_portal' },
      { text: 'Therapist portal', value: 'therapist_portal' },
      { text: 'Patient app', value: 'patient_app' }
    ]
  },
  educationMaterial: {
    maxFileSize: 25 // MB
  }
};

export default settings;
