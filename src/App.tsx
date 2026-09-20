import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OurVibeAndSourcing } from './components/OurVibeAndSourcing';
import { ShopJuices } from './components/ShopJuices';
import { BuildABox } from './components/BuildABox';
import { FlavorQuiz } from './components/FlavorQuiz';
import { DropLab } from './components/DropLab';
import { CartDrawer } from './components/CartDrawer';
import { VibeCheckDrawer } from './components/VibeCheckDrawer';
import {
  SearchModal,
  VipModal,
  ReturnPouchModal,
  ProductDetailModal,
} from './components/Modals';
import { CartItem, JuiceProduct, ScreenId } from './types';
import { JUICE_PRODUCTS } from './data/juiceData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('our-vibe-and-sourcing');

  // Initial cart starts with 3 bottles to match the design reference!
  const [cart, setCart] = useState<CartItem[]>([
    { product: JUICE_PRODUCTS[0], quantity: 1 }, // Electric Yuzu
    { product: JUICE_PRODUCTS[1], quantity: 1 }, // Dragon Blood
    { product: JUICE_PRODUCTS[2], quantity: 1 }, // Emerald Matcha
  ]);

  const [bottleCreditsEarned, setBottleCreditsEarned] = useState<number>(20.0);

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVipOpen, setIsVipOpen] = useState(false);
  const [isReturnPouchOpen, setIsReturnPouchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<JuiceProduct | null>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: JuiceProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleAddCrateToCart = (
    bottles: { product: JuiceProduct; count: number }[],
    _boxType: '6-pack' | '12-pack'
  ) => {
    setCart((prev) => {
      let updated = [...prev];
      bottles.forEach(({ product, count }) => {
        const found = updated.find((i) => i.product.id === product.id);
        if (found) {
          updated = updated.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + count } : i
          );
        } else {
          updated.push({ product, quantity: count });
        }
      });
      return updated;
    });
  };

  const handleAddPrescribedPack = (bottles: JuiceProduct[]) => {
    setCart((prev) => {
      let updated = [...prev];
      bottles.forEach((product) => {
        const found = updated.find((i) => i.product.id === product.id);
        if (found) {
          updated = updated.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          updated.push({ product, quantity: 1 });
        }
      });
      return updated;
    });
  };

  const handleBottleReturned = () => {
    setBottleCreditsEarned((prev) => prev + 10);
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body-md antialiased selection:bg-tertiary-fixed selection:text-on-tertiary-fixed">
      {/* Header with Navigation & Cart */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenVip={() => setIsVipOpen(true)}
      />

      {/* Main Content Area (offset by fixed header height) */}
      <main className="flex-1 pt-28">
        {currentScreen === 'our-vibe-and-sourcing' && (
          <OurVibeAndSourcing
            onNavigate={handleNavigate}
            onRequestReturnPouch={() => setIsReturnPouchOpen(true)}
            onBottleReturned={handleBottleReturned}
          />
        )}

        {currentScreen === 'shop-juices' && (
          <ShopJuices
            onAddToCart={handleAddToCart}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'build-a-box' && (
          <BuildABox
            onAddCrateToCart={handleAddCrateToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentScreen === 'flavor-quiz' && (
          <FlavorQuiz
            onAddPrescribedPack={handleAddPrescribedPack}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {currentScreen === 'drop-lab' && <DropLab />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Slideover Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onNavigate={handleNavigate}
        bottleCreditsEarned={bottleCreditsEarned}
      />

      {/* Floating Bottom-Right Support Concierge */}
      <VibeCheckDrawer />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      <VipModal
        isOpen={isVipOpen}
        onClose={() => setIsVipOpen(false)}
        bottleCredits={bottleCreditsEarned}
      />

      <ReturnPouchModal
        isOpen={isReturnPouchOpen}
        onClose={() => setIsReturnPouchOpen(false)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
