/* ---- dessin de l'environnement --------- */

/*------ dessin des lignes -------*/

var lineWidth = 15; // largeur des lignes noires

// variables contenat les propriétés des lignes à dessiner

var linePath1 = [
  ["startPoint", [100, 100]],
  ["l", [500, 100]],
  ["a", [600, 200]],
  ["a", [500, 300]],
  ["a", [400, 200]],
  ["a", [500, 100]],
]; //"l" pour une ligne droite ou "a" pour un arc

/*var linePath2 = [
  ["startPoint", [300, 100]],
  ["l", [300, 300]],
]; //"l" pour une ligne droite ou "a" pour un arc*/

var linePath = [linePath1 /*, linePath2 */];

//------ dessin des obstacles --------

var obstList = [
  /*[600, 200, 20, 20, "#9ba39d", 1],
  [300, 300, 20, 20, "#9ba39d", 1],*/
]; // centerx, centery, length, width, color (r:155, g:163, b:157, a:255), alpha

//-----------------------------------------------------------

/* !!!!! les trois parmetres doivent être exporter !!!!!!!!!!!! */

const envParamA1 = [lineWidth, linePath, obstList];

export { envParamA1 };

//----------------------------------------------------
