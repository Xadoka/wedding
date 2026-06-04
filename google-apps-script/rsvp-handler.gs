/**
 * Скрипт для Google Таблицы (RSVP).
 *
 * 1. Откройте таблицу: https://docs.google.com/spreadsheets/d/1JoNLYBsRsm_l1UWTVeInYyD-DRhHF1NIuIZTC1LvCks/edit?gid=0#gid=0
 * 2. Расширения → Apps Script
 * 3. Вставьте этот код, сохраните
 * 4. Развернуть → Новое развертывание → Тип: Веб-приложение
 *    - Запуск от: Я
 *    - У кого есть доступ: Все
 * 5. Скопируйте URL развертывания в .env.local как GOOGLE_SHEETS_WEB_APP_URL
 */

var SHEET_NAME = 'RSVP';

function getRsvpSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Дата и время', 'Имя', 'Ответ', 'Код ответа']);
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }
  return sheet;
}

function doGet() {
  return jsonResponse_({
    success: true,
    message: 'RSVP API работает. Данные принимаются через POST с сайта.',
  });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getRsvpSheet_();
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.attendanceLabel || data.attendance || '',
      data.attendance || '',
    ]);
    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
