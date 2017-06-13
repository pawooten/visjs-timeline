var groups = [
  { id: 'Tab1', content: 'All' },
  { id: 'Tab2', content: 'Pathology' },
  { id: 'Tab3', content: 'Physician Notes' },
  { id: 'Tab4', content: 'Transcriptions' },
  { id: 'Tab5', content: 'DICOM' },
];

var documentData = [
  { Tab: 'Tab1', DaySummaries: [ 
    { Date: '2016-01-01', Count: 4 },
    { Date: '2016-02-01', Count: 9 },
    { Date: '2016-11-01', Count: 11 },
    { Date: '2017-02-01', Count: 1 },
    { Date: '2017-05-01', Count: 3 },
  ]},
  { Tab: 'Tab2', DaySummaries: [ 
    { Date: '2016-01-04', Count: 1 },
    { Date: '2016-02-02', Count: 4 },
    { Date: '2016-11-04', Count: 1 },
    { Date: '2017-02-11', Count: 10 },
    { Date: '2017-05-02', Count: 7 },
  ]},
  { Tab: 'Tab3', DaySummaries: [ 
    { Date: '2016-01-05', Count: 1 },
    { Date: '2016-02-05', Count: 1 },
    { Date: '2016-11-05', Count: 2 },
    { Date: '2017-02-05', Count: 2 },
    { Date: '2017-05-05', Count: 3 },
  ]},
];