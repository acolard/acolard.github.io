/* ---- dessin de l'environnement --------- */

/*------ dessin des lignes -------*/

var lineWidth = 15; // largeur des lignes noires

/* --- Position initial mBot [x,y,angle(sesn horriare)] -------*/

var initPos = [50, 50, 0];

// variables contenat les propriétés des lignes à dessiner

var linePath1 = [
  ["startPoint", [75, 75]],
  ["l", [350, 75]],
]; //"l" pour une ligne droite ou "a" pour un arc

var linePath2 = [
  ["startPoint", [500, 75]],
  ["l", [700, 75]],
  ["a", [800, 150]],
  ["a", [700, 215]],
  ["l", [500, 215]],
];

var linePath3 = [
  ["startPoint", [350, 215]],
  ["l", [200, 215]],
];

var linePath4 = [
  ["startPoint", [200, 365]],
  ["a", [100, 290]],
  ["a", [200, 215]],
];

var linePath5 = [
  ["startPoint", [200, 365]],
  ["l", [350, 365]],
];


var linePath6 = [
  ["startPoint", [500, 365]],
  ["l", [700, 365]],
  ["a", [800, 440]],
  ["a", [700, 515]],
  ["l", [500, 515]],
];

var linePath7= [
  ["startPoint", [350, 515]],
  ["l", [200, 515]],
];

var linePath8 = [
  ["startPoint", [200, 665]],
  ["a", [100, 590]],
  ["a", [200, 515]],
];

var linePath9= [
  ["startPoint", [350, 665]],
  ["l", [200, 665]],
];

var linePath10 = [
  ["startPoint", [500, 665]],
  ["l", [700, 665]],
];


// variables contenat les propriétés des lignes à dessiner

var linePath = [
  linePath1,
  linePath2,
  linePath3,
  linePath4,
  linePath5,
  linePath6,
  linePath7,
  linePath8,
  linePath9,
  linePath10
];

//------ dessin des obstacles --------

var obstList = [
  [425, 215, 20, 20, "#9ba39d", 1], // #9ba39d = couleur des ostacles
  [425, 440, 300, 280, "#ffd269", 0.5], // #ffd269 = couleur des tunnels
  [425, 515, 20, 20, "#9ba39d", 1], // #9ba39d = couleur des ostacles
  [700, 665, 20, 20, "#9ba39d", 1], // #9ba39d = couleur des ostacles

]; // centerx, centery, length, width, color (r:155, g:163, b:157, a:255), alpha
//-----------------------------------------------------------

/* !!!!! les trois parmetres doivent être exporter !!!!!!!!!!!! */

const envParamA2 = [initPos, lineWidth, linePath, obstList];

export { envParamA2 };

//----------------------------------------------------
