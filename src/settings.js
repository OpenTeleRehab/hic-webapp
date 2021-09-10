const settings = {
  locale: 'en',
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
      { text: 'Admin portal', value: 'admin_portal' },
      { text: 'Public portal', value: 'public_portal' }
    ]
  },
  libraryTypes: {
    options: [
      { text: 'library.exercises', value: 'exercise' },
      { text: 'library.education_materials', value: 'education' },
      { text: 'library.questionnaires', value: 'questionnaire' }
    ]
  },
  educationMaterial: {
    maxFileSize: 25 // MB
  },
  tinymce: {
    apiKey: 'hp4m52i3gyuf4edxwxu9jyt91br22arfth7bg6ckya5a83k0',
    height: 500,
    plugins: [
      'advlist autolink lists link image code charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    contentStyle: 'body { font-size:14px; }',
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image | code | help'
  },
  minAge: 0,
  maxAge: 80,
  ageGap: 10,
  noteMaxLength: 50,
  featuredResourcesLimit: 8,
  appIdleTimeout: 180 // in second
};

export default settings;
