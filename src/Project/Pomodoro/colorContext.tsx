import React from 'react';
import { useState, createContext } from 'react';

interface ColorContextProps {
  background: string;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  color1: () => void;
  color2: () => void;
  color3: () => void;
  color4: () => void;
  color5: () => void;
  color6: () => void;
  color7: () => void;
  color8: () => void;
}

const ColorContext = createContext<ColorContextProps>({
  background: 'color-1',
  setBackground: () => {},
  color1: () => {},
  color2: () => {},
  color3: () => {},
  color4: () => {},
  color5: () => {},
  color6: () => {},
  color7: () => {},
  color8: () => {},
});

const ColorProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [background, setBackground] = useState<string>('bgcolor-1');

  const color1 = () => {
    setBackground('bgcolor-1');
  };
  const color2 = () => {
    setBackground('bgcolor-2');
  };
  const color3 = () => {
    setBackground('bgcolor-3');
  };
  const color4 = () => {
    setBackground('bgcolor-4');
  };
  const color5 = () => {
    setBackground('bgcolor-5');
  };
  const color6 = () => {
    setBackground('bgcolor-6');
  };
  const color7 = () => {
    setBackground('bgcolor-7');
  };
  const color8 = () => {
    setBackground('bgcolor-8');
  };

  const colorValue: ColorContextProps = {
    background,
    setBackground,
    color1,
    color2,
    color3,
    color4,
    color5,
    color6,
    color7,
    color8,
  };
  return (
    <ColorContext.Provider value={colorValue}>{children}</ColorContext.Provider>
  );
};

export { ColorProvider, ColorContext };
