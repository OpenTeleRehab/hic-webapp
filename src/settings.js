const settings = {
  date_format: 'DD/MM/YYYY',
  datetime_format: 'DD/MM/YYYY HH:mm:ss',
  textMaxLength: 255,
  phoneCodeMaxLength: 3,
  isoCodeLength: 2,
  genders: {
    options: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
      { text: 'Other', value: 'other' }
    ]
  },
  platforms: {
    options: [
      { text: 'Admin portal', value: 'admin_portal' }
    ]
  },
  contentTypes: {
    options: [
      { text: 'Activities', value: 'activities' },
      { text: 'Preset Treatment', value: 'preset_treatment' }
    ]
  },
  educationMaterial: {
    maxFileSize: 25 // MB
  },
  tinymce: {
    apiKey: 'hp4m52i3gyuf4edxwxu9jyt91br22arfth7bg6ckya5a83k0'
  },
  minAge: 0,
  maxAge: 80,
  ageGap: 10,
  noteMaxLength: 50
};

export default settings;
