import React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { AnimatedTooltip } from './AnimatedToolTip';

interface ScrollAreaDemoProps {
  children:React.ReactNode,
  className:string;
  containerClassName?:string;
}

const ScrollAreaDemo: React.FC<ScrollAreaDemoProps> = ({ children,className,containerClassName}) => (
  <ScrollArea.Root className={`  text-white rounded overflow-hidden  bg-black ${className}`}>
    <ScrollArea.Viewport className={`     h-full rounded  ${containerClassName}`}>
      {
        children
      }
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="flex-1 bg-[#333] rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-[#333] transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="horizontal"
    >
      <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="bg-blackA5" />
  </ScrollArea.Root>
);

export default ScrollAreaDemo;
