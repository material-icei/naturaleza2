/* =========================================================
   EXPLORADORES DEL CUERPO HUMANO · Registro de puntajes
   Google Apps Script vinculado a la planilla de Google Sheets.

   Recibe los datos que envía la app y los guarda en la hoja
   "Puntajes", con UNA FILA POR ALUMNO (nombre + grado).
   Si el alumno ya existe, actualiza su fila y conserva siempre
   el mejor puntaje de cada módulo.
   Instrucciones de instalación: ver LEEME.txt
   ========================================================= */

var HOJA = 'Puntajes';
var ENCABEZADOS = ['Nombre', 'Grado', 'Puntaje total', 'Puntaje módulo 1', 'Puntaje módulo 2',
                   'Puntaje módulo 3', 'Puntaje módulo 4', 'Actividades realizadas', 'Última actualización'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);                       // evita que dos Chromebooks escriban a la vez
  try {
    var d = JSON.parse(e.postData.contents);
    var nombre = limpiar(d.nombre), grado = limpiar(d.grado);
    if (!nombre || !grado) return responder({ ok: false, error: 'Faltan datos' });

    var hoja = obtenerHoja();
    var datos = hoja.getDataRange().getValues();
    var clave = normalizar(nombre) + '|' + normalizar(grado);
    var fila = -1;
    for (var i = 1; i < datos.length; i++) {
      if (normalizar(datos[i][0]) + '|' + normalizar(datos[i][1]) === clave) { fila = i + 1; break; }
    }
    var previo = fila > 0 ? datos[fila - 1] : null;

    // Se conserva el mejor puntaje de cada módulo
    var modulos = [];
    for (var m = 1; m <= 4; m++) {
      modulos.push(Math.max(numero(d['m' + m]), previo ? numero(previo[2 + m]) : 0));
    }
    var total = modulos[0] + modulos[1] + modulos[2] + modulos[3];
    var hechas = Math.max(numero(d.actividades), previo ? numero(String(previo[7]).split(' ')[0]) : 0);
    var valores = [nombre, grado, total].concat(modulos)
      .concat([hechas + ' de ' + numero(d.totalActividades), new Date()]);

    if (fila > 0) hoja.getRange(fila, 1, 1, valores.length).setValues([valores]);
    else hoja.appendRow(valores);
    return responder({ ok: true });
  } catch (err) {
    return responder({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* Abrir la URL en el navegador sirve para comprobar que la implementación funciona */
function doGet() {
  return ContentService.createTextOutput('Exploradores del cuerpo humano: el registro de puntajes está activo.');
}

function obtenerHoja() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = libro.getSheetByName(HOJA) || libro.insertSheet(HOJA);
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(ENCABEZADOS);
    hoja.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight('bold');
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function numero(v) { var n = Number(v); return isFinite(n) && n > 0 ? Math.round(n) : 0; }
function normalizar(t) { return String(t).trim().replace(/\s+/g, ' ').toLowerCase(); }
/* Quita símbolos iniciales para que un nombre nunca se interprete como fórmula */
function limpiar(t) { return String(t == null ? '' : t).trim().replace(/\s+/g, ' ').replace(/^[=+\-@]+/, '').slice(0, 60); }
