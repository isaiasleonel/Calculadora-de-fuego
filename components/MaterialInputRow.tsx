
import React from 'react';
import type { Material } from '../types';
import { TrashIcon } from './icons/TrashIcon';

interface MaterialInputRowProps {
  material: Material;
  onUpdate: (id: string, field: keyof Omit<Material, 'id'>, value: string) => void;
  onRemove: (id: string) => void;
  isFirst: boolean;
}

const MaterialInputRow: React.FC<MaterialInputRowProps> = ({ material, onUpdate, onRemove, isFirst }) => {
  const handleInputChange = <K extends keyof Omit<Material, 'id'>>(field: K, value: string) => {
    onUpdate(material.id, field, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in">
      <div className="md:col-span-5">
        {isFirst && <label className="block text-sm font-medium text-slate-400 mb-1">Material</label>}
        <input
          type="text"
          value={material.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Ej: Madera, Plástico, Tela"
          className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none transition"
        />
      </div>
      <div className="md:col-span-3">
        {isFirst && <label className="block text-sm font-medium text-slate-400 mb-1">Peso (kg)</label>}
        <input
          type="number"
          value={material.weight}
          onChange={(e) => handleInputChange('weight', e.target.value)}
          placeholder="Ej: 10"
          className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none transition"
        />
      </div>
      <div className="md:col-span-3">
        {isFirst && <label className="block text-sm font-medium text-slate-400 mb-1">Poder Calorífico (Kcal/kg)</label>}
        <input
          type="number"
          value={material.calorificValue}
          onChange={(e) => handleInputChange('calorificValue', e.target.value)}
          placeholder="Ej: 4400"
          className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none transition"
        />
      </div>
      <div className="md:col-span-1 flex items-end justify-center h-full">
        {isFirst && <div className="h-[1.125rem] w-full md:block hidden" />}
        <button
          onClick={() => onRemove(material.id)}
          className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/20 rounded-full transition-colors duration-200"
          aria-label="Eliminar material"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default MaterialInputRow;
