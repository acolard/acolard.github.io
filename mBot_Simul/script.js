/* --  récupération de l'activité désirer dans URL --- */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const Activity = urlParams.get("a"); //variable a dans URL pour choisir le fichier environnement activité
const ActivityList = [];

import { envParamA0 } from "./A0.js";
ActivityList[0] = envParamA0;

import { envParamA1 } from "./A1.js";
ActivityList[1] = envParamA1;

import { envParamA2 } from "./A2.js";
ActivityList[2] = envParamA2;

import { envParamA3 } from "./A3.js";
ActivityList[3] = envParamA3;

var initPos = ActivityList[Activity][0];
const lineWidth = ActivityList[Activity][1];
const linePath = ActivityList[Activity][2];
var obstList = ActivityList[Activity][3];

if (Activity == 3) {
  const cols = 13; // Nombre de colonnes
  const rows = 9; // Nombre de lignes
  const cellSize = 80; // Taille de chaque cellule du labyrinthe

  // Cr�ation d'une matrice repr�sentant le labyrinthe
  const maze = [];
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < cols; j++) {
      maze[i][j] = 1; // 1 repr�sente un mur par d�faut
    }
  }

  // Fonction pour dessiner le labyrinthe
  function drawMaze() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (maze[i][j] === 1) {
          // Dessiner un mur
          obstList.push([
            j * cellSize,
            i * cellSize,
            cellSize,
            cellSize,
            "#9ba39d",
            1,
          ]);
        } else if (maze[i][j] === 2) {
          // Dessiner l'entr�e (couleur verte)
          initPos = [j * cellSize, i * cellSize - 25, 0];
        }
      }
    }
  }

  // Fonction pour g�n�rer un labyrinthe simple (algorithme de backtracking)
  function generateMaze() {
    const visited = [];
    for (let i = 0; i < rows; i++) {
      visited[i] = [];
      for (let j = 0; j < cols; j++) {
        visited[i][j] = false;
      }
    }

    // Fonction r�cursive pour dessiner un chemin
    function carveMaze(x, y) {
      visited[y][x] = true;
      maze[y][x] = 0; // Marquer comme un chemin libre

      const directions = [
        { dx: 0, dy: -2 }, // Haut
        { dx: 2, dy: 0 }, // Droite
        { dx: 0, dy: 2 }, // Bas
        { dx: -2, dy: 0 }, // Gauche
      ];

      // M�langer les directions pour cr�er des labyrinthes diff�rents
      directions.sort(() => Math.random() - 0.5);

      for (const dir of directions) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;

        if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && !visited[ny][nx]) {
          // Cr�er un chemin entre la cellule actuelle et la nouvelle
          maze[y + dir.dy / 2][x + dir.dx / 2] = 0; // Enlever les murs entre
          carveMaze(nx, ny);
        }
      }
    }

    // D�buter � la cellule (1, 1)
    carveMaze(1, 1);

    // Ajouter l'entr�e : placez l'entr�e sur le mur de gauche (colonne 0)
    let entranceRow = Math.floor(Math.random() * rows); // Position de l'entr�e

    entranceRow =
      entranceRow === 0
        ? (entranceRow = entranceRow + 1)
        : (entranceRow = entranceRow);
    entranceRow =
      entranceRow === rows - 1
        ? (entranceRow = entranceRow - 2)
        : (entranceRow = entranceRow);

    maze[entranceRow][0] = 2; // Marquer l'entr�e (vert)

    let i = 1;
    while (maze[entranceRow][i] === 1) {
      maze[entranceRow][i] = 0;
      i = i + 1;
    }

    // Ajouter la sortie : placez la sortie en bas � droite
    maze[rows - 1][cols - 2] = 3; // Marquer la sortie (rouge)

    // Dessiner le labyrinthe avec l'entr�e et la sortie
    drawMaze();
  }

  // G�n�rer le labyrinthe et l'afficher
  generateMaze();
}

//console.log(initPos);

var state = [];
var run = false;
var runInfini = true;
var distanceRotateSpeedRatio = 500; // à diminuer pour faire avancer ou tourner plus le robot avec le bloc mouvement
var RotateSpeedRatio = 300; // à diminuer pour faire tourner plus le robot avec le bloc mouvement

var direct = "";
var speed = 0;

const theme = Blockly.Theme.defineTheme("themeName", {
  base: Blockly.Themes.Classic,
  startHats: true,
});

//---------------------------------------Bloc perso JSON------------------------------------->

//!!!!!!!!!!!!!!!!!!!! utiliser ````` pour declaration des variables en JQuery  !!!!!!!!!!!!!!!!!!!!!!!!

/*--------bloc Génerer code----------------*/

//-----Bloc attendre

Blockly.defineBlocksWithJsonArray([
  {
    type: "wait_seconds",
    message0: "Temporisation en secondes %1",
    args0: [
      {
        type: "input_value",
        name: "SECONDS",
        check: "Number",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "%{BKY_LOOPS_HUE}",
  },
]);

javascript.javascriptGenerator.forBlock["wait_seconds"] = function (
  block,
  generator
) {
  var seconds = generator.valueToCode(
    block,
    "SECONDS",
    javascript.Order.ATOMIC
  );
  const code = "    waitForSeconds(" + seconds + ");\n";
  return code;
};

//-----Bloc démarrer

Blockly.defineBlocksWithJsonArray([
  {
    type: "start",
    message0: "mBot - générer le code",
    nextStatement: null,
    colour: 195,
    tooltip: "",
    helpUrl: "",
  },
]);

javascript.javascriptGenerator.forBlock["start"] = function (block, generator) {
  // TODO: Assemble javascript into code variable.
  var code = "\n";
  return code;
};

//--------bloc infini

Blockly.defineBlocksWithJsonArray([
  {
    type: "infini",
    message0: "infini",
    output: "Boolean",
    colour: 120,
    tooltip: "",
    helpUrl: "",
  },
]);

javascript.javascriptGenerator.forBlock["infini"] = function (block) {
  return ["runInfini", javascript.Order.ATOMIC];
};

//--------bloc changer couleur LED

Blockly.defineBlocksWithJsonArray([
  {
    type: "del",
    message0: "régler le DEL de la carte  %1 en rouge %2 vert %3 bleu %4",
    args0: [
      {
        type: "field_dropdown",
        name: "DEL",
        options: [
          ["tout", "all"],
          ["DEL gauche", "left"],
          ["DEL droite", "right"],
        ],
      },
      {
        type: "field_number",
        name: "r",
        value: 0,
        min: 0,
        max: 255,
        precision: 1,
      },
      {
        type: "field_number",
        name: "g",
        value: 0,
        min: 0,
        max: 255,
        precision: 1,
      },
      {
        type: "field_number",
        name: "b",
        value: 0,
        min: 0,
        max: 255,
        precision: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 195,
    tooltip: "Allume les LED de la carte à la couleur (r,g,b) paramétrée ",
    helpUrl: "Chaque composante de couleur est codée de 0 à 255 ",
  },
]);

javascript.javascriptGenerator.forBlock["del"] = function (block, generator) {
  var dropdown_del = block.getFieldValue("DEL");
  var number_r = block.getFieldValue("r");
  var number_g = block.getFieldValue("g");
  var number_b = block.getFieldValue("b");

  switch (dropdown_del) {
    case "all":
      var code = `    changeLedColor("rgb(${number_r},${number_g},${number_b})","rgb(${number_r},${number_g},${number_b})");\n`;
      break;

    case "left":
      var code = `    changeLedColor("rgb(${number_r},${number_g},${number_b})","");\n`;
      break;

    case "right":
      var code = `    changeLedColor("","rgb(${number_r},${number_g},${number_b})");\n`;
      break;
  }

  code = code + "    drawLED();";

  return code;
};

//--------bloc récupérer distance ultrason

Blockly.defineBlocksWithJsonArray([
  {
    type: "us_distance",
    message0: "Distance mesurée par le capteur ultrason",
    output: "Number",
    colour: 195,
    tooltip: "",
    helpUrl: "",
  },
]);

javascript.javascriptGenerator.forBlock["us_distance"] = function (block) {
  return ["distDetectUltrasonic", javascript.Order.ATOMIC];
};

//--------bloc mouvement

Blockly.defineBlocksWithJsonArray([
  {
    type: "move",
    message0: "%1 à la vitesse %2",
    args0: [
      {
        type: "field_dropdown",
        name: "direction",
        options: [
          ["avancer", "fw"],
          ["reculer", "bw"],
          ["tourner à droite", "rgt"],
          ["tourner à gauche", "lft"],
        ],
      },
      {
        type: "field_number",
        name: "speed",
        value: 0,
        min: 0,
        max: 255,
        precision: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 195,
    tooltip: "",
    helpUrl: "",
  },
]);

javascript.javascriptGenerator.forBlock["move"] = function (block, generator) {
  var dropdown_direction = block.getFieldValue("direction");
  var text_speed = block.getFieldValue("speed");
  // TODO: Assemble javascript into code variable.
  var code = `    mBotMoveBlock("${dropdown_direction}",${
    text_speed / distanceRotateSpeedRatio
  });\n`;
  return code;
};

//--------bloc mouvement un pas

Blockly.defineBlocksWithJsonArray([
  {
    type: "move_step",
    message0: "%1 à la vitesse %2 pendant une durée (en s) de %3",
    args0: [
      {
        type: "field_dropdown",
        name: "direction",
        options: [
          ["avancer", "fw"],
          ["reculer", "bw"],
          ["tourner à droite", "rgt"],
          ["tourner à gauche", "lft"],
        ],
      },
      {
        type: "field_number",
        name: "speed",
        value: 0,
        min: 0,
        max: 255,
        precision: 1,
      },
      {
        type: "input_value",
        name: "seconds",
        check: "Number",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 195,
    tooltip: "",
    helpUrl: "",
  },
]);

javascript.javascriptGenerator.forBlock["move_step"] = function (
  block,
  generator
) {
  var dropdown_direction = block.getFieldValue("direction");
  var number_speed = block.getFieldValue("speed");
  var seconds = generator.valueToCode(
    block,
    "seconds",
    javascript.Order.ATOMIC
  );
  // TODO: Assemble javascript into code variable.
  var code = `    mBotMoveBlock("${dropdown_direction}",${
    number_speed / distanceRotateSpeedRatio
  });\n`;
  code = code + "    waitForSeconds(" + seconds + ");\n";
  code =
    code +
    `    mBotMoveBlock("${dropdown_direction}",${
      0 / distanceRotateSpeedRatio
    });\n`;
  console.log(code);
  return code;
};

//--------bloc musique

Blockly.defineBlocksWithJsonArray([
  {
    type: "music",
    message0: "Jouer la note %1 %2 temps",
    args0: [
      {
        type: "field_dropdown",
        name: "note",
        options: [
          ["A2", "A2"],
          ["A3", "A3"],
          ["A4", "A4"],
          ["A5", "A5"],
          ["A6", "A6"],
          ["A7", "A7"],
          ["B2", "B2"],
          ["B3", "B3"],
          ["B4", "B4"],
          ["B5", "B5"],
          ["B6", "B6"],
          ["B7", "B7"],
          ["C2", "C2"],
          ["C3", "C3"],
          ["C4", "C4"],
          ["C5", "C5"],
          ["C6", "C6"],
          ["C7", "C7"],
          ["D2", "D2"],
          ["D3", "D3"],
          ["D4", "D4"],
          ["D5", "D5"],
          ["D6", "D6"],
          ["D7", "D7"],
          ["E2", "E2"],
          ["E3", "E3"],
          ["E4", "E4"],
          ["E5", "E5"],
          ["E6", "E6"],
          ["E7", "E7"],
          ["F2", "F2"],
          ["F3", "F3"],
          ["F4", "F4"],
          ["F5", "F5"],
          ["F6", "F6"],
          ["F7", "F7"],
          ["G2", "G2"],
          ["G3", "G3"],
          ["G4", "G4"],
          ["G5", "G5"],
          ["G6", "G6"],
          ["G7", "G7"],
          ["C8", "C8"],
          ["D8", "D8"],
        ],
      },
      {
        type: "field_dropdown",
        name: "time",
        options: [
          ["un demi", "0.3"],
          ["un quart", "0.15"],
          ["un huitième", "0.075"],
          ["entier", "0.6"],
          ["double", "1.2"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 195,
    tooltip: "",
    helpUrl: "",
  },
]);

javascript.javascriptGenerator.forBlock["music"] = function (block, generator) {
  var dropdown_note = block.getFieldValue("note");
  var dropdown_time = block.getFieldValue("time");

  var code = `    playNote("${dropdown_note}",${dropdown_time})\n`;

  return code;
};

//--------bloc suiveur de ligne

Blockly.defineBlocksWithJsonArray([
  {
    type: "line_sensors",
    message0: "état du suiveur de ligne",
    output: null,
    colour: 195,
    tooltip: "",
    helpUrl: "",
  },
]);

javascript.javascriptGenerator.forBlock["line_sensors"] = function (block) {
  return ["lineSensState", javascript.Order.ATOMIC];
};

//--------bloc capteur luminosité

Blockly.defineBlocksWithJsonArray([
  {
    type: "light_sensors",
    message0: "Intensité lumineuse",
    output: null,
    colour: 195,
    tooltip: "",
    helpUrl: "",
  },
]);

javascript.javascriptGenerator.forBlock["light_sensors"] = function (block) {
  return ["lightIntensity", javascript.Order.ATOMIC];
};

/*---------------------Injection de blockly---------*/

var Workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  theme: theme,
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true,
  },
  trashcan: true,
});

//---------Evenement pris en charge dans blockly qui appelle "Workspace.addChangeListener"

const supportedEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
]);

// fonction pour voir le code renvoyer par blockly et modifié dans la fonction stepcode()

function showCode() {
  // Generate JavaScript code and display it.
  javascript.javascriptGenerator.INFINITE_LOOP_TRAP = null;
  var code = javascript.javascriptGenerator.workspaceToCode(Workspace);
  //alert(code);

  code = modifCode(code);

  //console.log(code);

  console.log(code);
}

function trouverDeclarationsAsync(chaine) {
  // Expression régulière pour détecter les déclarations de fonctions async
  const pattern =
    /\basync\s+function\s+\w+\s*\([^\)]*\)\s*\{[\s\S]*?\}[\s\S]\}\s*\n/g;

  // Tableau pour stocker les résultats
  let resultats = [];
  let match;

  // Utilisation de la méthode exec pour trouver toutes les correspondances
  while ((match = pattern.exec(chaine)) !== null) {
    resultats.push(match[0]); // match[0] contient la déclaration entière de la fonction
    let matchTexte = match[0];
    // Suppression du match[0] du texte original
    chaine = chaine.replace(matchTexte, "").trim(); // .trim() pour enlever les éventuels espaces en trop
  }

  resultats.forEach((element) => (chaine = element + "\n" + chaine));

  chaine = trouverNomDeclarationsAsync(chaine);

  return chaine;
}

function trouverDeclarationsVar(chaine) {
  // Expression régulière pour détecter les déclarations de fonctions async
  const pattern = /\bvar\s+.*;/g;

  // Tableau pour stocker les résultats
  let resultats = [];
  let match;

  // Utilisation de la méthode exec pour trouver toutes les correspondances
  while ((match = pattern.exec(chaine)) !== null) {
    resultats.push(match[0]); // match[0] contient la déclaration entière de la fonction
    let matchTexte = match[0];
    // Suppression du match[0] du texte original
    chaine = chaine.replace(matchTexte, "").trim(); // .trim() pour enlever les éventuels espaces en trop
  }

  resultats.forEach((element) => (chaine = element + "\n" + chaine));

  chaine = trouverNomDeclarationsAsync(chaine);

  return chaine;
}

function trouverNomDeclarationsAsync(chaine) {
  // Expression régulière pour détecter les déclarations de fonctions async
  const pattern = /async function \S*\(\)/g;

  // Tableau pour stocker les résultats
  let resultats = [];
  let match;

  // Utilisation de la méthode exec pour trouver toutes les correspondances
  while ((match = pattern.exec(chaine)) !== null) {
    resultats.push(match[0]); // match[0] contient la déclaration entière de la fonction
    let matchTexte = match[0];
    // Suppression du 'async function ' du texte original
    matchTexte = matchTexte.replace("async function ", "").trim();

    chaine = chaine.replace(matchTexte + ";", "await " + matchTexte).trim(); // .trim() pour enlever les éventuels espaces en trop
  }

  return chaine;
}

// fonction exécuter lorsque l'on appuie sur le bouton run (appelle fonction stepcode() à interval régulier)

const runButton = document.getElementById("runButton");
let runInterval = 0;

function runCode() {
  let resultWait = null; // variable pour savoir si la tempo est fini avant de mettre fin au programme
  run = true;

  runButton.disabled = "disabled";
  stepButton.disabled = "disabled";

  runInterval = setInterval(draw, 1);

  window.LoopTrap = 10000;
  javascript.javascriptGenerator.INFINITE_LOOP_TRAP =
    'if (--window.LoopTrap < 0) throw "Infinite loop.";\n'; // pour éviter la boucle infini

  // récupération du code génerer dans blockly

  var code = javascript.javascriptGenerator.workspaceToCode(Workspace);

  code = modifCode(code);

  // execution du code dans eval

  javascript.javascriptGenerator.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}

function modifCode(code) {
  /* ----- modification du code génerer dans blockly ---*/

  code =
    "\nconst testStepTimer = (timerOn) =>\n    new Promise(resolve =>\n        setTimeout(() => resolve(timerOn == false ? 'ok' : 'no'), 1),\n    );\nconst repeatedGreetings = async () => {\n" +
    code;

  code =
    code + "    endProg = true;\n    resetStepUi();\n}\nrepeatedGreetings();";

  // modification du code pour bloquer l'éxecution entre chaque étape en modifiant le mot highlightBlock(?????)

  const lines = code.split("\n"); // division du code par lignes
  const regexpSize = /waitForSeconds(.*?)\);/gi; //code pour touver waitForSeconds(?????)

  for (let i = 0; i < lines.length; i++) {
    for (const match of lines[i].matchAll(regexpSize)) {
      lines[i] = lines[i].replace(
        match[0],
        "\n    " +
          match[0].concat(
            "\n    resultWait = null;\n    while (resultWait != 'ok') {\n        resultWait = await testStepTimer(timerOn);\n    };"
          )
      );
    }
  }

  const regexpSize2 = /highlightBlock(.*?)\);/gi; //code pour touver highlightBlock(?????)

  for (let i = 0; i < lines.length; i++) {
    for (const match of lines[i].matchAll(regexpSize2)) {
      lines[i] = lines[i].replace(
        match[0],
        "\n    " +
          match[0].concat(
            "\n    if (run != true) {\n        resetStepUi();\n        return;}\n    resultWait = null;\n    while (resultWait != 'ok') {\n        resultWait = await testStepTimer(timerOn);\n    };\n"
          )
      );
    }
  }

  code = lines.join("\n"); // reconstruction du code en recollant les lignes

  // pou ajuster les fonctions insérées

  code = code.replaceAll("function", "async function");

  code = trouverDeclarationsAsync(code);

  code = trouverDeclarationsVar(code);

  return code;
}

//-------------------------------------

var lastStep = 0; // Variabale pour vérifier l'étape passée
var nextStep = 0; // Variabale incrémenter pour passer à l'étape suivante
var init = false; // variable pour ne génerer le code qu'au premier click sur le bouton step
let endProg = false; // variable pour laisser tourner l'interval pour animer le robot en fin de programme mais l'arrete si click sur stop ou evenenement dans blockly

const stepButton = document.getElementById("stepButton");
stepButton.style.width = "100px";

// Fonction pour génerer code et passer les étapes

let mBotInterval = 0;

function stepCode() {
  runButton.disabled = "disabled";
  let result = null; // variable pour savoir si le bouton a été cliquer
  let resultWait = null; // variable pour savoir si la tempo est fini avant de mettre fin au programme

  // lance cette interval uniquement au premier click sur step (quand il n'existe pas ou plus) et si l'interval dans run n'est pas lancé

  runInterval = setInterval(draw, 1);

  if (nextStep === 0 && init === false) {
    run = true;

    window.LoopTrap = 10000;
    javascript.javascriptGenerator.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap < 0) throw "Infinite loop.";\n'; // pour éviter la boucle infini

    // récupération du code génerer dans blockly

    var code = javascript.javascriptGenerator.workspaceToCode(Workspace);

    /* ----- modification du code génerer dans blockly ---*/

    // Ajout de code au déut avec la fonction teststep qui tourne en boucle aprés chaque étape jusqu'à un nouveau click sur step (nextstep++)

    code =
      "const initSim = () => {\n    speed = 0;\n    init = false;\n}\n\nconst testStep = (nextStep,timerOn) =>\n    new Promise(resolve =>\n        setTimeout(() => resolve(nextStep > lastStep && timerOn == false ? 'ok' : 'no'), 1),\n    );\n\nconst repeatedGreetings = async () => {\n" +
      code;
    code =
      code +
      "\n    nextStep++;\n    result = null;\n    while (result != 'ok') {\n        result = await testStep(nextStep, timerOn);\n    };\n    lastStep = nextStep;\n    if (run == false) {\n        await initSim();\n        resetStepUi();\n        return;\n    };\n    init = false;\n    endProg = true;\n    resetStepUi();\n}\n\nrepeatedGreetings();";

    // modification du code pour bloquer l'éxecution entre chaque étape en modifiant le mot highlightBlock(?????)

    const lines = code.split("\n"); // division du code par lignes
    const regexpSize = /highlightBlock(.*?)\);/gi; //code pour touver highlightBlock(?????)

    for (let i = 0; i < lines.length; i++) {
      for (const match of lines[i].matchAll(regexpSize)) {
        lines[i] = lines[i].replace(
          match[0],
          "\n    " +
            match[0].concat(
              "\n    result = null;\n    while (result != 'ok') {\n        result = await testStep(nextStep, timerOn);\n    };\n    lastStep = nextStep;\n    if (run == false) {\n        await initSim();\n        resetStepUi();\n        return;\n    };\n"
            )
        );
      }
    }
    code = lines.join("\n"); // reconstruction du code en recollant les lignes

    // pou ajuster les fonctions insérées

    code = code.replaceAll("function", "async function");

    code = trouverDeclarationsAsync(code);

    code = trouverDeclarationsVar(code);

    // execution du code dans eval

    javascript.javascriptGenerator.INFINITE_LOOP_TRAP = null;
    try {
      eval(code);
    } catch (e) {
      alert(e);
    }

    init = true; // modification de la variable pour indiquer que l'initialisation du code est faite
  } else {
    lastStep == nextStep ? nextStep++ : "";
  }
}

/* ---- Fonction pour arréter code quand click sur stop --- */

const stopButton = document.getElementById("stopButton");

function stopCode() {
  run = false;
  speed = 0;
  stopButton.disabled = "disabled";
  endProg = false;
  timerOn = false;

  setTimeout(() => {
    resetStepUi();
  }, 100);
}

//---------------interpreteur

javascript.javascriptGenerator.STATEMENT_PREFIX = "highlightBlock(%1);\n";
javascript.javascriptGenerator.addReservedWords("highlightBlock");

let myInterpreter = null;

function initApi(interpreter, globalObject) {
  // Add an API function for "wait"" blocks.

  // Ensure function name does not conflict with variable names.
  javascript.javascriptGenerator.addReservedWords("waitForSeconds");

  const wrapperWait = interpreter.createAsyncFunction(function (timeInSeconds) {
    // Delay the call to the callback.
    stepButton.disabled = "disabled";
    return waitForSeconds(timeInSeconds);
  });
  interpreter.setProperty(globalObject, "waitForSeconds", wrapperWait);

  // Add an API function for the alert() block, generated for "text_print" blocks.
  const wrapperAlert = function alert(text) {
    return window.alert(text);
  };
  interpreter.setProperty(
    globalObject,
    "alert",
    interpreter.createNativeFunction(wrapperAlert)
  );

  // Add an API function for the prompt() block.
  const wrapperPrompt = function prompt(text) {
    return window.prompt(text);
  };
  interpreter.setProperty(
    globalObject,
    "prompt",
    interpreter.createNativeFunction(wrapperPrompt)
  );

  // Add an API function for highlighting blocks.
  const wrapperHighlight = function (id) {
    id = String(id || "");
    return highlightBlock(id);
  };
  interpreter.setProperty(
    globalObject,
    "highlightBlock",
    interpreter.createNativeFunction(wrapperHighlight)
  );

  // Add an API function for highlighting lED color.
  const wrapperLED = function () {
    return drawLED();
  };
  interpreter.setProperty(
    globalObject,
    "drawLED",
    interpreter.createNativeFunction(wrapperLED)
  );

  // Add an API function for change LED color.
  const wrapperchangeLedColor = function (lftclr, rgtclr) {
    return changeLedColor(lftclr, rgtclr);
  };
  interpreter.setProperty(
    globalObject,
    "changeLedColor",
    interpreter.createNativeFunction(wrapperchangeLedColor)
  );

  // Add an API function for highlighting lED color.
  const wrapperMove = function (dir, spd) {
    return mBotMoveBlock(dir, spd);
  };
  interpreter.setProperty(
    globalObject,
    "mBotMoveBlock",
    interpreter.createNativeFunction(wrapperMove)
  );

  // Add an API function for play note.
  const wrapperPlayNote = function (note, time) {
    return playNote(note, time);
  };
  interpreter.setProperty(
    globalObject,
    "playNote",
    interpreter.createNativeFunction(wrapperPlayNote)
  );
}

// --------- fonction pour gérer les temporisation (bloc attendre)   --*/

let resttime = 0;
let showTimer = 0;
let timerOn = false;

// fonction pour creer la tempo

function waitForSeconds(timeInSeconds) {
  timerOn = true;
  stepButton.disabled = "disabled";
  runButton.disabled = "disabled";
  //stopButton.disabled = "disabled";
  stepButton.innerHTML = timeInSeconds;
  resttime = timeInSeconds;
  showTimer = setInterval(showRestTimer, 100);
}

// fonction pour afficher le temps restant dans bouton

function showRestTimer() {
  resttime -= 0.1;
  stepButton.innerHTML = resttime;
  Math.round(resttime * 10) == 0 ? endWaitStep() : "";
}

// fonction executer en fin de tempo

let currentHighlight = ""; // variable utiliser pour remmettre en surbrillance l'étape attendre pendant son éxecution

function endWaitStep() {
  resttime = 0;
  clearInterval(showTimer);
  stepButton.innerHTML = "Step by step";
  stepButton.disabled = "";
  if (run == false) {
    runButton.disabled = "";
  }
  stopButton.disabled = "";
  timerOn = false;
  highlightBlock(currentHighlight);
}

// fonction pour mettre en surbrillance les blocs

function highlightBlock(id) {
  currentHighlight = id;
  timerOn == false ? Workspace.highlightBlock(id) : "";
}

// fonction pour tous réinitialiser

function resetStepUi() {
  run = false;
  init = false;

  if (typeof runInterval !== "undefined" && endProg == false) {
    clearInterval(runInterval);
    runInterval = 0;
  }

  if (typeof showTimer !== "undefined") {
    clearInterval(showTimer);
    showTimer = 0;
  }

  stepButton.innerHTML = "Step by step";
  lastStep = 0;
  nextStep = 0;

  stepButton.disabled = "";
  runButton.disabled = "";
  stopButton.disabled = "";

  init = false;

  if (typeof synth === "object") {
    //arreter le son
    synth.triggerAttackRelease();
  }

  Workspace.highlightBlock(null);
  myInterpreter = null;
}

Workspace.addChangeListener(function (event) {
  if (!event.isUiEvent) {
    // Something changed.  Interpreter needs to be reloaded.
    endProg = false; // ne pas mettre dans resetStepUi car elle est appellée en fin de programme et on veut laisser l'animation tournée
    speed = 0;
    timerOn = false;
    resetStepUi();
  }
});

/*------sauvergarde et chargement--*/

function save() {
  window.state = Blockly.serialization.workspaces.save(Workspace);
  document.getElementById("input").value = JSON.stringify(window.state);
}

function charge() {
  if (document.getElementById("input").value != "") {
    try {
      let a = JSON.parse(document.getElementById("input").value);
      Blockly.serialization.workspaces.load(a, Workspace);
    } catch (e) {
      alert(e); //error in the above string(in this case,yes)!
    }
  }
}

window.addEventListener(
  "keydown",
  (event) => {
    if (event.shiftKey && event.code == "KeyS") {
      //appuyer sur la touche s pour sauvegarder
      save();
    } else if (event.shiftKey && event.code == "KeyC") {
      //appuyer sur la taouche c pour charger
      charge();
    } else if (event.shiftKey && event.code == "KeyJ") {
      //appuyer sur la taouche c pour charger
      showCode();
    }
  },

  false
);

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d", {
  willReadFrequently: true,
});

//-------------------------------

var x = initPos[0];
var y = initPos[1];
var angle = initPos[2]; // angle du robot
var length = 50; // longuer de robot

if (Activity == 3) {
  length = 30;
}

var width = (length / 6) * 5.5; // largeur du robot
let storedTransform = ctx.getTransform(); // sauvegarde de la position x,y du robot

//-----------------------------------------------------

var leftLedColor = "#10fc08"; // couleur initial des LED
var rightLedColor = "#10fc08";

//-------------------------------------------------------

var leftSensorDetecting = false; //variable état du capteur de ligne gauche
var rightSensorDetecting = false; //variable état du capteur de ligne droit
var lineSensState = 0; //variable état du suiveur de ligne (0,1,2,3)

//------------------------------

var ultrasonicSensorList = []; // liste des points rouges pour détécter les objets en gris
var firstLineUltrasonic = length / 1.5; //position de la première rangée de point de détéction
var precision = length / 5; // précision (distance entre chaque rangée de point)
var lineDetectionAngle = 5; // en degrés
var nbLayerDetetction = 40; // nombre de rangée de détection
var nbLineDetection = 7; //nb impaire
var distDetectUltrasonic = 9999; // distance captée
var lightIntensity = 100; // luminositée captée

if (Activity == 3) {
  var firstLineUltrasonic = length / 1.5; //position de la première rangée de point de détéction
  var precision = length / 16; // précision (distance entre chaque rangée de point)
  var lineDetectionAngle = 10; // en degrés
  var nbLayerDetetction = 80; // nombre de rangée de détection
  var nbLineDetection = 3; //nb impaire
}

//-----------------

var collisionPointList = []; // point sur le robot pour détecter collision avec objet en gris

// fonction pour jouer une note

var synth = "";

function playNote(note, time) {
  //start synth
  if (synth === "") {
    synth = new Tone.Synth().toDestination();
  }

  synth.triggerAttackRelease(note, time);
}

// fonction pour dessiner les obstacles

function drawObst() {
  for (let i = 0; i < obstList.length; i++) {
    drawRect(
      obstList[i][0],
      obstList[i][1],
      obstList[i][2],
      obstList[i][3],
      obstList[i][4],
      obstList[i][5]
    );
  }
}

// fonction pour tester si les collision du robot avec objet (en gris)

function collisionPointCalculate() {
  // calcul de la position des points de collision du robot

  // moitié en haut
  //ctx.setTransform(storedTransform);
  ctx.translate(0, width / 5 + width / 5.5);
  collisionPointList[0] = new coord(ctx.getTransform().e, ctx.getTransform().f);
  ctx.translate(0, -width / 5);
  collisionPointList[1] = new coord(ctx.getTransform().e, ctx.getTransform().f);
  ctx.translate(length / 6, -width / 5.5);
  collisionPointList[2] = new coord(ctx.getTransform().e, ctx.getTransform().f);
  ctx.translate(length / 3, 0);
  collisionPointList[3] = new coord(ctx.getTransform().e, ctx.getTransform().f);
  ctx.translate(length / 6, width / 5.5);
  collisionPointList[4] = new coord(ctx.getTransform().e, ctx.getTransform().f);
  ctx.translate(length / 6, 0);
  collisionPointList[5] = new coord(ctx.getTransform().e, ctx.getTransform().f);
  ctx.translate(length / 6, 0);
  collisionPointList[6] = new coord(ctx.getTransform().e, ctx.getTransform().f);
  ctx.translate(length / 16, width / 5);
  collisionPointList[7] = new coord(ctx.getTransform().e, ctx.getTransform().f);

  // moitié en bas
  ctx.setTransform(storedTransform);
  ctx.translate(0, (4.5 * width) / 5.5 - width / 5);
  collisionPointList[8] = new coord(ctx.getTransform().e, ctx.getTransform().f);
  ctx.translate(0, width / 5);
  collisionPointList[9] = new coord(ctx.getTransform().e, ctx.getTransform().f);
  ctx.translate(length / 6, width / 5.5);
  collisionPointList[10] = new coord(
    ctx.getTransform().e,
    ctx.getTransform().f
  );
  ctx.translate(length / 3, 0);
  collisionPointList[11] = new coord(
    ctx.getTransform().e,
    ctx.getTransform().f
  );
  ctx.translate(length / 6, -width / 5.5);
  collisionPointList[12] = new coord(
    ctx.getTransform().e,
    ctx.getTransform().f
  );
  ctx.translate(length / 6, 0);
  collisionPointList[13] = new coord(
    ctx.getTransform().e,
    ctx.getTransform().f
  );
  ctx.translate(length / 6, 0);
  collisionPointList[14] = new coord(
    ctx.getTransform().e,
    ctx.getTransform().f
  );
  ctx.translate(length / 16, -width / 5);
  collisionPointList[15] = new coord(
    ctx.getTransform().e,
    ctx.getTransform().f
  );

  // calcul si collision (si un point de collision est dans le rectangle obstacle)

  for (let i = 0; i < collisionPointList.length; i++) {
    for (let j = 0; j < obstList.length; j++) {
      if (obstList[j][4] == "#9ba39d") {
        if (
          collisionPointList[i].x > obstList[j][0] - obstList[j][2] / 2 &&
          collisionPointList[i].x < obstList[j][0] + obstList[j][2] / 2 &&
          collisionPointList[i].y > obstList[j][1] - obstList[j][3] / 2 &&
          collisionPointList[i].y < obstList[j][1] + obstList[j][3] / 2
        ) {
          ctx.setTransform(storedTransform);
          return true;
        }
      }
    }
  }

  // si collision retour à la position du robot avant collision

  ctx.setTransform(storedTransform);
  return false;
}

//fonction pour dessiner le robot

function drawmBot() {
  //left wheel
  ctx.beginPath();
  ctx.rect(length / 6, 0, (length / 6) * 2, width / 5.5);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();

  //draw body
  ctx.beginPath();
  ctx.rect(0, width / 5.5, length, width / 20);
  ctx.fillStyle = "#006eff";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(length / 6, width / 5.5, (4 * length) / 6, (3.5 * width) / 5.5);
  ctx.fillStyle = "#006eff";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(0, (4.5 * width) / 5.5, length, -width / 20);
  ctx.fillStyle = "#006eff";
  ctx.fill();
  ctx.closePath();

  //draw right wheel
  ctx.beginPath();
  ctx.rect(length / 6, (width / 55) * 45, (length / 6) * 2, width / 5.5);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();

  drawLED();

  //draw ultrasonic sensor
  ctx.beginPath();
  ctx.rect(
    (length / 6) * 5,
    width / 2 - width / 20 - width / 8,
    length / 9,
    width / 8
  );
  ctx.fillStyle = "#616161";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect((length / 6) * 5, width / 2 + width / 20, length / 9, width / 8);
  ctx.fillStyle = "#616161";
  ctx.fill();
  ctx.closePath();
  //--------
}

// fonction pour changer les couleur de LED

function changeLedColor(lftclr, rgtclr) {
  lftclr.length == "" ? "" : (leftLedColor = lftclr);
  rgtclr.length == "" ? "" : (rightLedColor = rgtclr);
}

// Fonction pour dessiner les LED

function drawLED() {
  //draw electronic card
  ctx.beginPath();
  ctx.rect(
    length / 6 + length / 20,
    width / 5.5 + width / 20,
    (length / 6) * 4 - length / 10,
    (width / 55) * 35 - width / 10
  );
  ctx.fillStyle = "#dbdbdb";
  ctx.fill();
  ctx.closePath();

  if (leftLedColor != "rgb(0,0,0)") {
    //draw left LED
    ctx.beginPath();
    ctx.arc(
      (4 * length) / 6,
      width / 2 - width / 7,
      length / 13,
      0,
      Math.PI * 2,
      true
    );
    ctx.fillStyle = leftLedColor;
    ctx.fill();
    ctx.closePath();
  }

  if (rightLedColor != "rgb(0,0,0)") {
    //draw right LED
    ctx.beginPath();
    ctx.arc(
      (4 * length) / 6,
      width / 2 + width / 7,
      length / 13,
      0,
      Math.PI * 2,
      true
    );
    ctx.fillStyle = rightLedColor;
    ctx.fill();
    ctx.closePath();
  }
}

// fonction appeller par le bloc de déplacement du robot

function mBotMoveBlock(dir, spd) {
  direct = dir;

  switch (dir) {
    case "fw":
      speed = spd;
      break;
    case "bw":
      speed = -spd;
      break;
    case "lft":
      speed = -spd * distanceRotateSpeedRatio;
      break;
    case "rgt":
      speed = spd * distanceRotateSpeedRatio;
      break;
  }
}

// fonction pour dessiner le robot et les catpteurs

function drawmBotAndSensors() {
  drawmBot(); // dessine le robot
  drawBothLineSensor(); // dessinne les détecteurs de détection en rouge
  ultrasonicSensorListCalculate(); // dessine les detecteurs de ligne
  drawLightSensor(); // dessine le capteur de luminosité
}

// fonction pour redessiner tous l'environnement lorsque robot fait une  translation focntion de la vitesse

function mBotMove(moveSpeed) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawObst(); // dessine les obstavles une première fois pour détecter alpha du tunnel et calculer luminosité
  detectionLightSensor();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPath(linePath);

  ctx.setTransform(storedTransform);
  ctx.translate(moveSpeed, 0);
  storedTransform = ctx.getTransform();

  if (collisionPointCalculate()) {
    ctx.translate(-moveSpeed, 0);
    storedTransform = ctx.getTransform();
  }

  drawmBotAndSensors(); // dessin du robot et de ses capteurs
  drawObst();
}

// fonction pour redessiner tous l'environnement lorsque robot fait une rotation en focntion de la vitesse

function mBotRotate(rotateSpeed) {
  rotateSpeed = (rotateSpeed * Math.PI) / (255 * RotateSpeedRatio);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawObst(); // dessine les obstavles une première fois pour détecter alpha du tunnel et calculer luminosité
  detectionLightSensor();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPath(linePath);

  ctx.setTransform(storedTransform);
  ctx.translate(length / 2, width / 2);
  ctx.rotate(rotateSpeed);
  ctx.translate(-(length / 2), -(width / 2));
  storedTransform = ctx.getTransform();

  if (collisionPointCalculate()) {
    ctx.translate(length / 2, width / 2);
    ctx.rotate(-rotateSpeed);
    ctx.translate(-(length / 2), -(width / 2));
    storedTransform = ctx.getTransform();
  } else {
    angle += rotateSpeed;
  }

  drawmBotAndSensors(); // dessin du robot et de ses capteurs
  drawObst();
}

// fonction pour dessiner chaques lignes noires

function drawPath(linePath) {
  for (let i = 0; i < linePath.length; i++) {
    drawEachPath(linePath[i]);
  }
}

// fonction pour dessiner une lignes

function drawEachPath(thisLinePath) {
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(thisLinePath[0][1][0], thisLinePath[0][1][1]);

  for (let i = 1; i < thisLinePath.length; i++) {
    if (thisLinePath[i][0] == "l") {
      ctx.lineTo(thisLinePath[i][1][0], thisLinePath[i][1][1]);
    } else {
      var cx = 0;
      var cy = 0;

      if (thisLinePath[i - 1][1][1] < thisLinePath[i][1][1]) {
        if (thisLinePath[i - 1][1][0] < thisLinePath[i][1][0]) {
          cx = thisLinePath[i][1][0];
          cy = thisLinePath[i - 1][1][1];
        } else {
          cx = thisLinePath[i - 1][1][0];
          cy = thisLinePath[i][1][1];
        }
      } else {
        if (thisLinePath[i - 1][1][0] < thisLinePath[i][1][0]) {
          cx = thisLinePath[i - 1][1][0];
          cy = thisLinePath[i][1][1];
        } else {
          cx = thisLinePath[i][1][0];
          cy = thisLinePath[i - 1][1][1];
        }
      }

      ctx.quadraticCurveTo(
        cx,
        cy,
        thisLinePath[i][1][0],
        thisLinePath[i][1][1]
      );
    }
  }

  ctx.stroke();
}

// fonction pour dessiner obstacle

function drawRect(x, y, lh, wh, clr, alp) {
  ctx.beginPath();
  ctx.rect(x - lh / 2, y - wh / 2, lh, wh);
  ctx.fillStyle = clr;
  ctx.globalAlpha = alp;
  ctx.fill();
  ctx.closePath();
  ctx.globalAlpha = 1;
}

//ultrasonicSensorList[0] = first line detection
//ultrasonicSensorList[1] = second line detection (firstLineUltrasonic+precision)
//ultrasonicSensorList[2] = second line detection (firstLineUltrasonic+2*precision)
//...

class coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//X and Y coordinates of the central point (the origin around which the second point will be rotated). The next two parameters are the coordinates of the point that we'll be rotating. The last parameter is the angle, in degrees.

function rotatePoint(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}

// fonction pour calculer et dessiner les points de détetion en rouge

var deltaLineDetect = 0;
var deltaXYtri = [];
var deltaXYnoTri = [];

function ultrasonicSensorListCalculate() {
  var x =
    storedTransform.e +
    Math.hypot(length / 2, width / 2) *
      Math.cos(angle + Math.atan(width / length)); // x milieu du robot
  var y =
    storedTransform.f +
    Math.hypot(length / 2, width / 2) *
      Math.sin(angle + Math.atan(width / length)); // y milieu du robot

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // calcul des points aligner avec le robot

  for (var i = 0; i < nbLayerDetetction; i++) {
    deltaLineDetect = precision * i;
    ultrasonicSensorList[i] = [];
    ultrasonicSensorList[i][0] = new coord(
      x + (firstLineUltrasonic + deltaLineDetect) * Math.cos(angle),
      y + (firstLineUltrasonic + deltaLineDetect) * Math.sin(angle)
    );

    for (let k = 0; k < obstList.length; k++) {
      if (obstList[k][4] == "#9ba39d") {
        if (
          ultrasonicSensorList[i][0].x > obstList[k][0] - obstList[k][2] / 2 &&
          ultrasonicSensorList[i][0].x < obstList[k][0] + obstList[k][2] / 2 &&
          ultrasonicSensorList[i][0].y > obstList[k][1] - obstList[k][3] / 2 &&
          ultrasonicSensorList[i][0].y < obstList[k][1] + obstList[k][3] / 2
        ) {
          distDetectUltrasonic =
            (170 * (firstLineUltrasonic + deltaLineDetect)) / length -
            (8 * 170) / 18;
          ctx.setTransform(storedTransform);
          return true;
        }
      }
    }

    drawRect(
      ultrasonicSensorList[i][0].x,
      ultrasonicSensorList[i][0].y,
      3,
      3,
      "#ff0000",
      0.1
    );

    for (var j = 1; j < nbLineDetection; j += 2) {
      // rotation ligne sens trigo
      deltaXYtri = rotatePoint(
        x,
        y,
        ultrasonicSensorList[i][0].x,
        ultrasonicSensorList[i][0].y,
        ((j + 1) / 2) * lineDetectionAngle
      );

      // rotation ligne sens horaire
      deltaXYnoTri = rotatePoint(
        x,
        y,
        ultrasonicSensorList[i][0].x,
        ultrasonicSensorList[i][0].y,
        -((j + 1) / 2) * lineDetectionAngle
      );

      // ajout du point à gauche

      ultrasonicSensorList[i][j] = new coord(deltaXYtri[0], deltaXYtri[1]);

      for (let k = 0; k < obstList.length; k++) {
        if (obstList[k][4] == "#9ba39d") {
          if (
            ultrasonicSensorList[i][j].x >
              obstList[k][0] - obstList[k][2] / 2 &&
            ultrasonicSensorList[i][j].x <
              obstList[k][0] + obstList[k][2] / 2 &&
            ultrasonicSensorList[i][j].y >
              obstList[k][1] - obstList[k][3] / 2 &&
            ultrasonicSensorList[i][j].y < obstList[k][1] + obstList[k][3] / 2
          ) {
            distDetectUltrasonic =
              (170 * (firstLineUltrasonic + deltaLineDetect)) / length -
              (8 * 170) / 18;
            ctx.setTransform(storedTransform);
            return true;
          }
        }
      }

      drawRect(
        ultrasonicSensorList[i][j].x,
        ultrasonicSensorList[i][j].y,
        3,
        3,
        "#ff0000",
        0.1
      );

      // ajout du point à droite

      ultrasonicSensorList[i][j + 1] = new coord(
        deltaXYnoTri[0],
        deltaXYnoTri[1]
      );

      for (let k = 0; k < obstList.length; k++) {
        if (obstList[k][4] == "#9ba39d") {
          if (
            ultrasonicSensorList[i][j + 1].x >
              obstList[k][0] - obstList[k][2] / 2 &&
            ultrasonicSensorList[i][j + 1].x <
              obstList[k][0] + obstList[k][2] / 2 &&
            ultrasonicSensorList[i][j + 1].y >
              obstList[k][1] - obstList[k][3] / 2 &&
            ultrasonicSensorList[i][j + 1].y <
              obstList[k][1] + obstList[k][3] / 2
          ) {
            distDetectUltrasonic =
              (170 * (firstLineUltrasonic + deltaLineDetect)) / length -
              (8 * 170) / 18;
            ctx.setTransform(storedTransform);
            return true;
          }
        }
      }

      drawRect(
        ultrasonicSensorList[i][j + 1].x,
        ultrasonicSensorList[i][j + 1].y,
        3,
        3,
        "#ff0000",
        0.1
      );
    }
  }

  distDetectUltrasonic = 9999; // si aucune detection
  ctx.setTransform(storedTransform);
}

// fonction pour tester si une couleur est présente dans un tableau de pixels obtenu avec imgData

function testColor(r, g, b, alpha, imgData) {
  for (var i = 0; i < imgData.data.length; i += 4) {
    if (
      imgData.data[i + 0] == r &&
      imgData.data[i + 1] == g &&
      imgData.data[i + 2] == b &&
      imgData.data[i + 3] == alpha
    ) {
      return true;
    }
  }
  return false;
}

// fonction pour tester si capteur detect la ligne noir

function detectionLeftSensor() {
  var x = storedTransform.e; // décalage x origine dudu robot
  var y = storedTransform.f; // décalage y origine dudu robot

  const xLeftSensor = (6.2 * length) / 6;
  const yLeftSensor = width / 2 - length / 15;
  const newX =
    x +
    Math.hypot(xLeftSensor, yLeftSensor) *
      Math.cos(angle + Math.atan(yLeftSensor / xLeftSensor));
  const newY =
    y +
    Math.hypot(xLeftSensor, yLeftSensor) *
      Math.sin(angle + Math.atan(yLeftSensor / xLeftSensor));

  var imgData = ctx.getImageData(
    newX - length / 20,
    newY - length / 20,
    length / 10,
    length / 10
  );

  leftSensorDetecting = testColor(0, 0, 0, 0, imgData); //detect black color
  lineSensState = [leftSensorDetecting, rightSensorDetecting].reduce(
    (res, x) => (res << 1) | x
  ); // 0,1,2 ou 3 l'entier des capteurs de ligne
}

function detectionRightSensor() {
  //detection ligne capteur de droite
  var x = storedTransform.e; // décalage x origine dudu robot
  var y = storedTransform.f; // décalage y origine dudu robot

  const xLeftSensor = (6.2 * length) / 6;
  const yLeftSensor = width / 2 + length / 15;
  const newX =
    x +
    Math.hypot(xLeftSensor, yLeftSensor) *
      Math.cos(angle + Math.atan(yLeftSensor / xLeftSensor));
  const newY =
    y +
    Math.hypot(xLeftSensor, yLeftSensor) *
      Math.sin(angle + Math.atan(yLeftSensor / xLeftSensor));

  var imgData = ctx.getImageData(
    newX - length / 20,
    newY - length / 20,
    length / 10,
    length / 10
  );

  rightSensorDetecting = testColor(0, 0, 0, 0, imgData); //detect no color
  lineSensState = [leftSensorDetecting, rightSensorDetecting].reduce(
    (res, x) => (res << 1) | x
  ); // 0,1,2 ou 3 l'entier des capteurs de ligne
}

function detectionLightSensor() {
  //detection ligne capteur de droite
  var x = storedTransform.e; // décalage x origine dudu robot
  var y = storedTransform.f; // décalage y origine dudu robot

  const xLeftSensor = length / 1.5;
  const yLeftSensor = width / 2 - length / 15;
  const newX =
    x +
    Math.hypot(xLeftSensor, yLeftSensor) *
      Math.cos(angle + Math.atan(yLeftSensor / xLeftSensor));
  const newY =
    y +
    Math.hypot(xLeftSensor, yLeftSensor) *
      Math.sin(angle + Math.atan(yLeftSensor / xLeftSensor));

  var imgData = ctx.getImageData(newX, newY, 1, 1);

  lightIntensity = 100 * (1 - imgData.data[3] / 255); //detect no color

  //console.log(lightIntensity);
}

// fonction pour dessiner les deux detecteurs de ligne noire

function drawBothLineSensor() {
  drawLeftLineSensor();
  drawRightLineSensor();
}

// fonction pour dessiner le detecteurs de ligne noire gauche

function drawLeftLineSensor() {
  detectionLeftSensor();
  ctx.setTransform(storedTransform);
  ctx.translate((6.2 * length) / 6, width / 2);
  ctx.beginPath();
  ctx.arc(0, -length / 15, length / 20, 0, Math.PI * 2, true);
  leftSensorDetecting
    ? (ctx.fillStyle = "#00faf6")
    : (ctx.fillStyle = "#cfcfcf");
  ctx.fill();
  ctx.closePath();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// fonction pour dessiner le detecteurs de ligne noire droit

function drawRightLineSensor() {
  detectionRightSensor();
  ctx.setTransform(storedTransform);
  ctx.translate((6.2 * length) / 6, width / 2);
  ctx.beginPath();
  ctx.arc(0, length / 15, length / 20, 0, Math.PI * 2, true);
  rightSensorDetecting
    ? (ctx.fillStyle = "#00faf6")
    : (ctx.fillStyle = "#cfcfcf");
  ctx.fill();
  ctx.closePath();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// fonction pour dessiner le Détécteur de Luminosité

function drawLightSensor() {
  ctx.setTransform(storedTransform);
  ctx.translate(length / 1.5, width / 2 - length / 15);
  ctx.beginPath();
  ctx.arc(0, length / 15, 1, 0, Math.PI * 2, true);
  ctx.fillStyle = "#FF0000";
  lightIntensity != 100 ? (ctx.globalAlpha = 1) : (ctx.globalAlpha = 0);
  ctx.fill();
  ctx.closePath();
  ctx.globalAlpha = 1;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// fonction pour commander le robot avec le clavier

document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;

    if (keyName == "ArrowUp") {
      //appuyer sur la touche s pour sauvegarder
      mBotMove((4 * 255) / distanceRotateSpeedRatio);

      var x =
        ctx.getTransform().e +
        Math.hypot(length / 2, width / 2) * Math.cos(angle); // décalage x origine dudu robot
      var y =
        ctx.getTransform().f +
        Math.hypot(length / 2, width / 2) * Math.sin(angle); // décalage y origine dudu robot
    }

    if (keyName == "ArrowDown") {
      //appuyer sur la taouche c pour charger
      mBotMove((-4 * 255) / distanceRotateSpeedRatio);
    }

    if (keyName == "ArrowLeft") {
      //appuyer sur la taouche n pour charger
      mBotRotate(-4 * RotateSpeedRatio);
    }

    if (keyName == "ArrowRight") {
      //appuyer sur la taouche n pour charger
      mBotRotate(4 * RotateSpeedRatio);
    }

    if (keyName == " ") {
      //appuyer sur espace pour retour à la position initiale
      angle = initPos[2];
      initmBot(initPos[0], initPos[1], initPos[2]);
    }
  },
  false
);

// fonction pour redessiner environnement en fonction du mouvement du mBot voulu

function draw() {
  if (direct == "fw" || direct == "bw") {
    mBotMove(speed);
  } else {
    mBotRotate(speed);
  }
}

//Créer de note de musique
document.querySelector("#stepButton")?.addEventListener("click", async () => {
  await Tone.start();
});

function initmBot(x, y, angle) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawObst(); // dessine les obstavles une première fois pour détecter alpha du tunnel et calculer luminosité
  detectionLightSensor();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPath(linePath);
  ctx.translate(x, y);
  ctx.translate(length / 2, width / 2);
  ctx.rotate(angle);
  ctx.translate(-(length / 2), -(width / 2));
  storedTransform = ctx.getTransform();

  collisionPointCalculate();

  drawmBot();
  drawBothLineSensor();
  ultrasonicSensorListCalculate();
  drawLightSensor(); // dessine le capteur de luminosité
  drawObst();
}

initmBot(x, y, angle);

canvas.addEventListener("mousedown", function (e) {
  getMousePosition(canvas, e);
});

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let xMouse = Math.round(event.clientX - rect.left);
  let yMouse = Math.round(event.clientY - rect.top);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPath(linePath);
  drawObst();

  ctx.setTransform(storedTransform);
  drawmBotAndSensors();

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.font = "30px fantasy";
  ctx.fillStyle = "green";

  ctx.fillText(
    `${String.fromCharCode(8594)} ${Math.round(
      xMouse * (canvas.width / rect.width)
    )} px`,
    xMouse * (canvas.width / rect.width),
    yMouse * (canvas.height / rect.height) + 30
  );
  ctx.fillText(
    `${String.fromCharCode(8595)} ${Math.round(
      yMouse * (canvas.height / rect.height)
    )} px`,
    xMouse * (canvas.width / rect.width),
    yMouse * (canvas.height / rect.height) + 60
  );

  ctx.strokeStyle = "white";
  ctx.lineWidth = 0.5;
  ctx.strokeText(
    `${String.fromCharCode(8594)} ${Math.round(
      xMouse * (canvas.width / rect.width)
    )} px`,
    xMouse * (canvas.width / rect.width),
    yMouse * (canvas.height / rect.height) + 30
  );
  ctx.strokeText(
    `${String.fromCharCode(8595)} ${Math.round(
      yMouse * (canvas.height / rect.height)
    )} px`,
    xMouse * (canvas.width / rect.width),
    yMouse * (canvas.height / rect.height) + 60
  );
  ctx.strokeStyle = "black";
}

export { stepCode };
export { runCode };
export { stopCode };
export { save };
export { charge };
