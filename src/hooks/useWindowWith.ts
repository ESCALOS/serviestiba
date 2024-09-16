import { useEffect, useState } from "react";

export default function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup: elimina el listener cuando el componente se desmonta
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // El array vacío significa que este efecto solo se ejecuta una vez, al montar.
  
    return windowWidth;
  }