import React, { useState } from 'react';
import { Coffee, Flag, Settings, Droplet, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

type RoastLevel = 'light' | 'medium' | 'dark';
type Origin = 'ethiopia' | 'colombia' | 'brazil' | 'guatemala' | 'kenya';
type GrindSize = 'whole' | 'coarse' | 'medium' | 'fine';

interface BlendConfig {
  roastLevel: RoastLevel | null;
  origin: Origin | null;
  grindSize: GrindSize | null;
}

const ROAST_LEVELS = {
  light: {
    name: 'Light Roast',
    description: 'Bright, acidic with fruity notes',
    price: 14.99
  },
  medium: {
    name: 'Medium Roast',
    description: 'Balanced, sweet with caramel notes',
    price: 15.99
  },
  dark: {
    name: 'Dark Roast',
    description: 'Bold, rich with chocolate notes',
    price: 16.99
  }
};

const ORIGINS = {
  ethiopia: {
    name: 'Ethiopia',
    description: 'Fruity & Bright',
    flag: '🇪🇹',
    price: 2.00
  },
  colombia: {
    name: 'Colombia',
    description: 'Balanced & Sweet',
    flag: '🇨🇴',
    price: 1.50
  },
  brazil: {
    name: 'Brazil',
    description: 'Nutty & Sweet',
    flag: '🇧🇷',
    price: 1.00
  },
  guatemala: {
    name: 'Guatemala',
    description: 'Complex & Spicy',
    flag: '🇬🇹',
    price: 1.75
  },
  kenya: {
    name: 'Kenya',
    description: 'Wine-like & Fruity',
    flag: '🇰🇪',
    price: 2.25
  }
};

const GRIND_SIZES = {
  whole: {
    name: 'Whole Beans',
    description: 'For grinding at home',
    icon: '☕',
    price: 0
  },
  coarse: {
    name: 'Coarse',
    description: 'Perfect for French Press',
    icon: '🫖',
    price: 0.50
  },
  medium: {
    name: 'Medium',
    description: 'Ideal for Drip Coffee',
    icon: '⏳',
    price: 0.50
  },
  fine: {
    name: 'Fine',
    description: 'Best for Espresso',
    icon: '💨',
    price: 0.50
  }
};

export default function CustomBlendBuilder() {
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [blend, setBlend] = useState<BlendConfig>({
    roastLevel: null,
    origin: null,
    grindSize: null
  });

  const calculatePrice = () => {
    let total = 0;
    if (blend.roastLevel) total += ROAST_LEVELS[blend.roastLevel].price;
    if (blend.origin) total += ORIGINS[blend.origin].price;
    if (blend.grindSize) total += GRIND_SIZES[blend.grindSize].price;
    return total;
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const addToCart = () => {
    if (!blend.roastLevel || !blend.origin || !blend.grindSize) return;

    const blendName = `Custom ${ROAST_LEVELS[blend.roastLevel].name} ${ORIGINS[blend.origin].name} Blend`;
    addItem({
      id: Date.now().toString(),
      name: blendName,
      price: calculatePrice(),
      quantity: 1
    });
  };

  return (
    <div id="custom-blend-section" className="min-h-screen bg-brown-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-1/3 text-center ${
                  step === currentStep ? 'text-brown-600 font-bold' : 'text-gray-400'
                }`}
              >
                Step {step}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-brown-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Choose Your Roast Level</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(ROAST_LEVELS).map(([key, roast]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setBlend({ ...blend, roastLevel: key as RoastLevel });
                      handleNext();
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      blend.roastLevel === key
                        ? 'border-brown-600 bg-brown-50'
                        : 'border-gray-200 hover:border-brown-400'
                    }`}
                  >
                    <Coffee className="w-8 h-8 mb-2 text-brown-600" />
                    <h3 className="font-bold mb-2">{roast.name}</h3>
                    <p className="text-sm text-gray-600">{roast.description}</p>
                    <p className="text-brown-600 font-bold mt-2">${roast.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Select Bean Origin</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(ORIGINS).map(([key, origin]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setBlend({ ...blend, origin: key as Origin });
                      handleNext();
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      blend.origin === key
                        ? 'border-brown-600 bg-brown-50'
                        : 'border-gray-200 hover:border-brown-400'
                    }`}
                  >
                    <span className="text-4xl mb-2">{origin.flag}</span>
                    <h3 className="font-bold mb-2">{origin.name}</h3>
                    <p className="text-sm text-gray-600">{origin.description}</p>
                    <p className="text-brown-600 font-bold mt-2">+${origin.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Choose Grind Size</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(GRIND_SIZES).map(([key, grind]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setBlend({ ...blend, grindSize: key as GrindSize });
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      blend.grindSize === key
                        ? 'border-brown-600 bg-brown-50'
                        : 'border-gray-200 hover:border-brown-400'
                    }`}
                  >
                    <span className="text-4xl mb-2">{grind.icon}</span>
                    <h3 className="font-bold mb-2">{grind.name}</h3>
                    <p className="text-sm text-gray-600">{grind.description}</p>
                    <p className="text-brown-600 font-bold mt-2">
                      {grind.price > 0 ? `+$${grind.price.toFixed(2)}` : 'Free'}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              className={`px-6 py-2 rounded-full ${
                currentStep === 1
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-brown-600 text-white hover:bg-brown-700'
              }`}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-full bg-brown-600 text-white hover:bg-brown-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={addToCart}
                disabled={!blend.roastLevel || !blend.origin || !blend.grindSize}
                className="px-6 py-2 rounded-full bg-brown-600 text-white hover:bg-brown-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart (${calculatePrice().toFixed(2)})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 