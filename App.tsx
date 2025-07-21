
import React, { useState, useCallback, useMemo } from 'react';
import { Material } from './types';
import { WOOD_CALORIFIC_VALUE_KCAL_KG } from './constants';
import Header from './components/Header';
import MaterialInputRow from './components/MaterialInputRow';
import ResultCard from './components/ResultCard';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([
    { id: crypto.randomUUID(), name: 'Madera', weight: '150', calorificValue: '4400' },
    { id: crypto.randomUUID(), name: 'Papel y cartón', weight: '50', calorificValue: '4000' },
  ]);
  const [area, setArea] = useState<string>('50');
  const [fireLoad, setFireLoad] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMaterialChange = useCallback((id: string, field: keyof Omit<Material, 'id'>, value: string) => {
    setMaterials(currentMaterials =>
      currentMaterials.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
    setFireLoad(null);
  }, []);

  const addMaterial = useCallback(() => {
    setMaterials(current => [...current, { id: crypto.randomUUID(), name: '', weight: '', calorificValue: '' }]);
  }, []);

  const removeMaterial = useCallback((id: string) => {
    setMaterials(current => current.filter(m => m.id !== id));
    setFireLoad(null);
  }, []);

  const handleCalculate = useCallback(() => {
    setError(null);
    setFireLoad(null);

    const parsedArea = parseFloat(area);
    if (isNaN(parsedArea) || parsedArea <= 0) {
      setError('El área debe ser un número positivo.');
      return;
    }

    let totalHeat = 0;
    for (const material of materials) {
      const weight = parseFloat(material.weight);
      const calorificValue = parseFloat(material.calorificValue);

      if (material.name.trim() === '' && (isNaN(weight) || weight === 0)) continue;

      if (material.name.trim() === '') {
        setError(`El material con ID ${material.id} no tiene nombre.`);
        return;
      }
      if (isNaN(weight) || weight < 0) {
        setError(`El peso del material "${material.name}" es inválido.`);
        return;
      }
      if (isNaN(calorificValue) || calorificValue < 0) {
        setError(`El poder calorífico del material "${material.name}" es inválido.`);
        return;
      }
      totalHeat += weight * calorificValue;
    }

    if (totalHeat === 0 && materials.length > 0 && materials.some(m => m.name !== '')) {
      setError('No hay materiales con peso o poder calorífico para calcular.');
      return;
    }
    
    const equivalentWoodWeight = totalHeat / WOOD_CALORIFIC_VALUE_KCAL_KG;
    const calculatedFireLoad = equivalentWoodWeight / parsedArea;
    setFireLoad(calculatedFireLoad);

  }, [area, materials]);

  const isCalculateDisabled = useMemo(() => {
    const parsedArea = parseFloat(area);
    if (isNaN(parsedArea) || parsedArea <= 0) return true;
    return materials.every(m => m.weight === '' || m.calorificValue === '');
  }, [area, materials]);


  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />

        <main className="mt-8">
          <div className="bg-slate-800/50 rounded-lg p-6 shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">1. Materiales Combustibles</h2>
            <div className="space-y-4">
              {materials.map((material, index) => (
                <MaterialInputRow
                  key={material.id}
                  material={material}
                  onUpdate={handleMaterialChange}
                  onRemove={removeMaterial}
                  isFirst={index === 0}
                />
              ))}
            </div>
            <button
              onClick={addMaterial}
              className="mt-6 flex items-center gap-2 text-brand-orange hover:text-brand-yellow font-semibold transition-colors duration-200"
            >
              <PlusIcon />
              Añadir Material
            </button>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-6 shadow-lg border border-slate-700 mt-8">
             <h2 className="text-2xl font-bold text-white mb-4">2. Área del Sector</h2>
             <label htmlFor="area" className="block text-slate-400 mb-2">
                Superficie total del sector de incendio (m²)
             </label>
             <input
                id="area"
                type="number"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                  setFireLoad(null);
                }}
                placeholder="Ej: 100"
                className="w-full bg-slate-900 border border-slate-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition"
             />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <button
              onClick={handleCalculate}
              disabled={isCalculateDisabled}
              className="w-full max-w-sm bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg transition-all duration-300 transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
            >
              Calcular Carga de Fuego
            </button>

            {error && <p className="mt-4 text-red-400 bg-red-500/20 px-4 py-2 rounded-md">{error}</p>}
          </div>

          <ResultCard fireLoad={fireLoad} />

        </main>
      </div>
    </div>
  );
};

export default App;
