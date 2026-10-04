import { useEffect, useState } from "react";
import FavoritesContext from "./favoritesStore";

function readSavedFavorites() {
  try {
    const savedFavorites = localStorage.getItem("velora-favorites");
    const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch (error) {
    console.error("Unable to read saved favorites.", error);
    return [];
  }
}

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readSavedFavorites);

  useEffect(() => {
    try {
      localStorage.setItem("velora-favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Unable to save favorites.", error);
    }
  }, [favorites]);

  function toggleFavorite(product) {
    setFavorites((currentFavorites) => {
      const isSaved = currentFavorites.some((item) => item.id === product.id);
      return isSaved
        ? currentFavorites.filter((item) => item.id !== product.id)
        : [...currentFavorites, product];
    });
  }

  function isFavorite(productId) {
    return favorites.some((product) => product.id === productId);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
