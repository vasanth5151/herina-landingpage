/**
 * Apps Script Web App that receives the booking form data (POST JSON)
 * and appends it as a new row to the bound Google Sheet.
 *
 * Setup:
 * 1. Create a Google Sheet, add header row in Sheet1: Timestamp | Name | Phone | Condition | Preferred Time
 * 2. Extensions > Apps Script, paste this file's contents, save.
 * 3. Deploy > New deployment > type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL and paste it into SHEET_ENDPOINT in index.js.
 */

const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.condition || '',
      data.time || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
