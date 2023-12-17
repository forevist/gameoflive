import { Colony } from '../services/debug';
import { Drawer } from './drawer';
import { useState } from 'react';

const testColony = new Colony(10, 10);
testColony.setAlive([{ x: 3, y: 5 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }]);
const { x, y } = testColony.getDimensions();

export const Debug = () => {
  const [cells, setCells] = useState(testColony.getAlive());
  const onClick = () => {
    const newCells = testColony.nextGeneration();
    setCells(newCells);
  };
  
  return <>
    <div onClick={onClick}>debug</div>
    <Drawer x={x} y={y} cells={cells}/>
  </>;
};