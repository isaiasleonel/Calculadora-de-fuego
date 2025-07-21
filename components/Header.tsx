
import React from 'react';
import { FlameIcon } from './icons/FlameIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <FlameIcon className="w-12 h-12 text-brand-orange" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">
          Calculadora de Fuego
        </h1>
      </div>
      <p className="mt-4 max-w-3xl mx-auto text-slate-400 text-lg">
        Determine la <strong>carga de fuego</strong> de un área para evaluar el riesgo de incendio. Ingrese los materiales combustibles, sus pesos, poderes caloríficos y el área total.
      </p>
    </header>
  );
};

export default Header;
