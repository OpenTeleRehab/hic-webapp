const settings = {
  date_format: 'DD/MM/YYYY',
  datetime_format: 'DD/MM/YYYY HH:mm:ss',
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
  },
  tinymce: {
    apiKey: 'hp4m52i3gyuf4edxwxu9jyt91br22arfth7bg6ckya5a83k0'
  }
};

export default settings;
