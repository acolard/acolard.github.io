https://acolard.github.io/mBot_Simul/index.html?a=0

Changer a=0 (A0.js), par a=1 (A1.js) ou a=2 (A2.js), ...

=== Exemple de nouvelle activité A4 ===
  
  A la fin du fichie activité (A4.js) mettre ->
    
    export { envParamA4 }
  
  Ajouter au debut du script.js ->
    
    import { envParamA4 } from "./A4.js"
  
    ActivityList[4] = envParamA4;
                                    
