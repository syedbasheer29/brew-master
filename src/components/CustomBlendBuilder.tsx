import React, { useState } from 'react';
import { Coffee, Flag, Settings, Droplet, ShoppingCart, Save } from 'lucide-react';
import { useCart } from '../context/CartContext';

type RoastLevel = 'light' | 'medium' | 'dark';
type Origin = 'ethiopia' | 'colombia' | 'brazil' | 'guatemala' | 'kenya';
type GrindSize = 'whole' | 'coarse' | 'medium' | 'fine';
type Flavor = 'vanilla' | 'caramel' | 'hazelnut' | 'chocolate' | 'none';

interface BlendConfig {
  roastLevel: RoastLevel | null;
  origin: Origin | null;
  grindSize: GrindSize | null;
  flavors: Flavor[];
}

const ROAST_LEVELS = {
  light: {
    name: 'Light Roast',
    description: 'Bright, acidic with fruity notes',
    image: 'https://images.unsplash.com/photo-1587734195342-5605b1b1d3e9?w=500',
    price: 14.99
  },
  medium: {
    name: 'Medium Roast',
    description: 'Balanced, sweet with caramel notes',
    image: 'https://images.unsplash.com/photo-1587734195342-5605b1b1d3e9?w=500',
    price: 15.99
  },
  dark: {
    name: 'Dark Roast',
    description: 'Bold, rich with chocolate notes',
    image: 'https://images.unsplash.com/photo-1587734195342-5605b1b1d3e9?w=500',
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

const FLAVORS = {
  vanilla: {
    name: 'Vanilla',
    icon: '🍶',
    price: 1.00
  },
  caramel: {
    name: 'Caramel',
    icon: '🍯',
    price: 1.00
  },
  hazelnut: {
    name: 'Hazelnut',
    icon: '🌰',
    price: 1.00
  },
  chocolate: {
    name: 'Chocolate',
    icon: '🍫',
    price: 1.00
  },
  none: {
    name: 'No Flavors',
    icon: '✨',
    price: 0
  }
};

export default function CustomBlendBuilder() {
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [blend, setBlend] = useState<BlendConfig>({
    roastLevel: null,
    origin: null,
    grindSize: null,
    flavors: []
  });

  const calculatePrice = () => {
    let total = 0;
    if (blend.roastLevel) total += ROAST_LEVELS[blend.roastLevel].price;
    if (blend.origin) total += ORIGINS[blend.origin].price;
    if (blend.grindSize) total += GRIND_SIZES[blend.grindSize].price;
    blend.flavors.forEach(flavor => {
      total += FLAVORS[flavor].price;
    });
    return total;
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const addToCart = () => {
    const blendName = `Custom ${blend.roastLevel} Roast ${blend.origin} Blend`;
    addItem({
      id: Date.now().toString(),
      name: blendName,
      price: calculatePrice(),
      image: ROAST_LEVELS[blend.roastLevel!].image,
      type: 'blend'
    });
  };

  return (
    <div id="custom-blend-section" className="min-h-screen bg-white pt-20">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-1/4 text-center ${
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
              style={{ width: `${(currentStep / 4) * 100}%` }}
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
                    <img
                      src={roast.image}
                      alt={roast.name}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-bold mb-2">{roast.name}</h3>
                    <p className="text-sm text-gray-600">{roast.description}</p>
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
                      handleNext();
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
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Add Flavors (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(FLAVORS).map(([key, flavor]) => (
                  <button
                    key={key}
                    onClick={() => {
                      if (key === 'none') {
                        setBlend({ ...blend, flavors: [] });
                      } else {
                        const newFlavors = blend.flavors.includes(key as Flavor)
                          ? blend.flavors.filter(f => f !== key)
                          : [...blend.flavors, key as Flavor];
                        setBlend({ ...blend, flavors: newFlavors });
                      }
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      blend.flavors.includes(key as Flavor) || (key === 'none' && blend.flavors.length === 0)
                        ? 'border-brown-600 bg-brown-50'
                        : 'border-gray-200 hover:border-brown-400'
                    }`}
                  >
                    <span className="text-4xl mb-2">{flavor.icon}</span>
                    <h3 className="font-bold">{flavor.name}</h3>
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
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-full bg-brown-600 text-white hover:bg-brown-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={addToCart}
                className="px-6 py-2 rounded-full bg-brown-600 text-white hover:bg-brown-700 flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart (${calculatePrice().toFixed(2)})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Price Calculator - Moved higher up */}
      <div className="fixed top-32 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="h-5 w-5 text-brown-600" />
          <h3 className="font-bold text-lg">Blend Summary</h3>
        </div>
        <div className="space-y-3 text-sm">
          {blend.roastLevel && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Roast Level:</span>
              <span className="font-medium">${ROAST_LEVELS[blend.roastLevel].price.toFixed(2)}</span>
            </div>
          )}
          {blend.origin && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Origin:</span>
              <span className="font-medium">${ORIGINS[blend.origin].price.toFixed(2)}</span>
            </div>
          )}
          {blend.grindSize && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Grinding:</span>
              <span className="font-medium">${GRIND_SIZES[blend.grindSize].price.toFixed(2)}</span>
            </div>
          )}
          {blend.flavors.length > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Flavors:</span>
              <span className="font-medium">
                ${blend.flavors.reduce((acc, flavor) => acc + FLAVORS[flavor].price, 0).toFixed(2)}
              </span>
            </div>
          )}
          <div className="border-t pt-3 mt-3 font-bold flex justify-between items-center text-base">
            <span>Total:</span>
            <span className="text-brown-600">${calculatePrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}