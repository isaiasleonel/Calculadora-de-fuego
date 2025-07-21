
import React, { useMemo } from 'react';
import { RISK_LEVELS } from '../constants';
import { RiskLevel } from '../types';

interface ResultCardProps {
  fireLoad: number | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ fireLoad }) => {
  const riskInfo = useMemo(() => {
    if (fireLoad === null || isNaN(fireLoad)) return null;

    if (fireLoad < RISK_LEVELS.LOW.threshold) {
      return RISK_LEVELS.LOW;
    }
    if (fireLoad < RISK_LEVELS.MEDIUM.threshold) {
      return RISK_LEVELS.MEDIUM;
    }
    if (fireLoad < RISK_LEVELS.HIGH.threshold) {
      return RISK_LEVELS.HIGH;
    }
    return RISK_LEVELS.EXTREME;
  }, [fireLoad]);

  if (fireLoad === null || !riskInfo) {
    return null;
  }

  return (
    <div className={`mt-10 p-6 rounded-xl border ${riskInfo.bgColor} border-gray-700 shadow-2xl transition-all duration-500 transform scale-100`}>
      <h3 className="text-xl font-bold text-slate-200 mb-2">Resultado del Cálculo</h3>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-5xl font-black text-white">{fireLoad.toFixed(2)}</p>
          <p className="text-slate-400 text-lg">kg/m² (equivalente en madera)</p>
        </div>
        <div className={`text-center rounded-lg px-6 py-3 ${riskInfo.bgColor}`}>
          <p className="text-lg font-medium text-slate-300">Nivel de Riesgo</p>
          <p className={`text-3xl font-bold ${riskInfo.color}`}>{riskInfo.label}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
