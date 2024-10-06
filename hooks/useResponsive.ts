import { useMediaQuery } from "react-responsive";

export const useResponsive = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 800 });
  return {
    isSmallScreen: isSmallScreen,
  };
};
