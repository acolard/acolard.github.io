/* ---- dessin de l'environnement --------- */

/*------ dessin des lignes -------*/

var lineWidth = 15; // largeur des lignes noires

/* --- Position initial mBot [x,y,angle(sesn horriare)] -------*/

var initPos = [150,250,0];

// variables contenat les propriétés des lignes à dessiner

var linePath = [];

//------ dessin des obstacles --------

var obstList = []; // centerx, centery, length, width, color (r:155, g:163, b:157, a:255), alpha

//-----------------------------------------------------------

/* !!!!! les trois parmetres doivent être exporter !!!!!!!!!!!! */

const envParamA1 = [initPos, lineWidth, linePath, obstList];

export { envParamA1 };

//----------------------------------------------------
