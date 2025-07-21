
export interface Material {
  id: string;
  name: string;
  weight: string;
  calorificValue: string; 
}

export enum RiskLevel {
    Bajo = 'Bajo',
    Medio = 'Medio',
    Alto = 'Alto',
    Extremo = 'Extremo',
}
