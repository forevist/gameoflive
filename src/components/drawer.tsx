import find from 'lodash/find';
import clsx from 'clsx';

import { Cell } from '../services/debug';

import './styles.css';

type DrawerProps = {
  x: number;
  y: number;
  cells: Cell[];
}
export const Drawer = ({ x, y, cells }: DrawerProps) => {
  const lineDrawer = () => {
    const result = [];
    for (let i = 0; i < x; i++) {
      let line = [];
      for (let j = 0; j < y; j++) {
        const live = find(cells, (cell) => {
          return cell.x === i && cell.y === j;
        });
        const classes = clsx('cell', { live });
        line.push(<div className={classes} key={`${i}_${j}`}></div>);
      }
      result.push(<div className="line" key={`line${i}`}>{line}</div>);
    }
    return <div className="table">{result}</div>;
  };
  return <>{lineDrawer()}</>;
};