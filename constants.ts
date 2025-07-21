
// Poder calorífico inferior de la madera como referencia en Kcal/kg.
export const WOOD_CALORIFIC_VALUE_KCAL_KG = 4400;

export const RISK_LEVELS = {
    LOW: { threshold: 100, label: 'Bajo', color: 'text-green-400', bgColor: 'bg-green-500/20' },
    MEDIUM: { threshold: 200, label: 'Medio', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
    HIGH: { threshold: 400, label: 'Alto', color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
    EXTREME: { threshold: Infinity, label: 'Extremo', color: 'text-red-400', bgColor: 'bg-red-500/20' },
};
