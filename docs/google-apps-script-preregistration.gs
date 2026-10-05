/**
 * Apps Script Web App for the "ShraddhaMusicPre-registration" Google Sheet.
 *
 * SETUP (first time)
 * 1. Create a Google Sheet named "ShraddhaMusicPre-registration".
 * 2. In the Sheet, go to Extensions > Apps Script.
 * 3. Delete any placeholder code and paste this entire file in.
 * 4. Click Deploy > New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize the script when prompted, and copy the Web app URL
 *    (it ends in /exec).
 * 6. Send that URL back so it can be set as PRE_REGISTRATION_ENDPOINT_URL in
 *    frontend/src/config/preRegistration.js.
 *
 * UPDATING (when this file changes, e.g. a new field was added)
 * 1. Open the same Sheet > Extensions > Apps Script.
 * 2. Replace all the code with this updated file and Save.
 * 3. Deploy > Manage deployments > click the pencil on the active deployment >
 *    Version: New version > Deploy. The Web app URL stays the same, so
 *    nothing needs to change on the website side.
 *
 * The first submission will auto-create a "Submissions" sheet tab with headers.
 * Header row is re-synced on every submission, so a column added here appears
 * automatically without touching existing data.
 */

const SHEET_NAME = 'Submissions';
const HEADERS = [
  'Creation Date/Time',
  'Student Full Name',
  'Student Date of Birth',
  'Student Age',
  'Instrument(s) Learning',
  'Lesson Goals/Preferences',
  'Parent/Guardian Full Name',
  'Parent/Guardian Email',
  'Parent/Guardian Phone',
  'Mailing Address',
  'Relationship to Student',
  'Assessment Availability',
];

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  return sheet;
}

function respond_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const data = JSON.parse(e.postData.contents);

    const email = (data.parentEmail || '').trim().toLowerCase();
    if (!email) {
      return respond_({ ok: false, error: 'Email address is required.' });
    }

    const emailColIndex = HEADERS.indexOf('Parent/Guardian Email');
    const existingRows = sheet.getDataRange().getValues();
    for (let i = 1; i < existingRows.length; i++) {
      const existingEmail = (existingRows[i][emailColIndex] || '').toString().trim().toLowerCase();
      if (existingEmail === email) {
        return respond_({ ok: false, error: 'Email is already used - Use a different email id' });
      }
    }

    sheet.appendRow([
      new Date(),
      data.studentFullName || '',
      data.studentDob || '',
      data.studentAge || '',
      data.instrument || '',
      data.lessonGoals || '',
      data.parentFullName || '',
      email,
      data.parentPhone || '',
      data.mailingAddress || '',
      data.relationship || '',
      data.assessmentAvailability || '',
    ]);

    return respond_({ ok: true });
  } catch (err) {
    return respond_({ ok: false, error: 'Server error: ' + err.message });
  }
}
