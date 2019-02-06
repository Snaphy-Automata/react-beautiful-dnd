// @flow
import type { Position, Rect } from 'css-box-model';
import type { Viewport } from '../../../types';
import getScroll from './get-scroll';
import { canScrollWindow } from '../can-scroll';

type Args = {|
  viewport: Viewport,
  subject: Rect,
  center: Position,
  dragStartTime: number,
  shouldUseTimeDampening: boolean,
  
|};

export default ({
  viewport,
  subject,
  center,
  dragStartTime,
  shouldUseTimeDampening,
  getContainerRef,
}: Args): ?Position => {
  const scroll: ?Position = getScroll({
    dragStartTime,
    container: viewport.frame,
    subject,
    center,
    shouldUseTimeDampening,
  });
  //UPDATE: 6th Feb 2019
  //ROBINS: Adding support for custom scroll ref..
  const customScrollRef  = getContainerRef?getContainerRef():null
  //Check if custom container is present or not..
  if(customScrollRef){
    if(scroll){
      const leftX = scroll.x;
      if(leftX){
        customScrollRef.scrollLeft = customScrollRef.scrollLeft + leftX;
      }
    }
    return null;
  }else{
    return scroll && canScrollWindow(viewport, scroll) ? scroll : null;
  }

};
