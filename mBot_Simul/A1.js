/* ---- dessin de l'environnement --------- */

/*------ dessin des lignes -------*/

var lineWidth = 0.5; // largeur des lignes noires

/* --- Position initial mBot [x,y,angle(sesn horriare)] -------*/

var initPos = [150, 250, 0];

// variables contenat les propriétés des lignes à dessiner

var linePath1 = [
  ["startPoint", [200, 50]],
  ["l", [200, 600]],
]; //"l" pour une ligne droite ou "a" pour un arc

// variables contenat les propriétés des lignes à dessiner

var linePath = [linePath1];

for (let index = 1; index < 11; index++) {
  let path = [
    ["startPoint", [200 + (index * 50), 50]],
    ["l", [200 + (index * 50), 600]],
  ];
  linePath.push(path);
}

//------ dessin des obstacles --------

var obstList = [
  [600, 200, 20, 20, "#9ba39d", 1], // #9ba39d = couleur des ostacles
  [350, 250, 100, 60, "#ffd269", 0.5], // #ffd269 = couleur des tunnels
  [350, 220, 100, 2, "#9ba39d", 1], // #9ba39d = couleur des ostacles
  [350, 280, 100, 2, "#9ba39d", 1], // #9ba39d = couleur des ostacles

]; // centerx, centery, length, width, color (r:155, g:163, b:157, a:255), alpha
//-----------------------------------------------------------

/* !!!!! les trois parmetres doivent être exporter !!!!!!!!!!!! */

const envParamA1 = [initPos, lineWidth, linePath, obstList];

export { envParamA1 };

//----------------------------------------------------
