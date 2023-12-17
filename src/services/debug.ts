import uniq from 'lodash/uniq';

export enum Status {
  alive,
  dead
}

export class Cell {
  x: number;
  y: number;
  status: Status;
  
  constructor(x?: number, y?: number, status?: Status) {
    this.status = status || Status.dead;
    this.x = x || 0;
    this.y = y || 0;
  }
  
  setStatus(status: Status) {
    console.log('>>', status, this.x, this.y);
    this.status = status;
  }
}


export class Colony {
  cells: Cell[][];
  dimensionX: number;
  dimensionY: number;
  
  constructor(dimensionX: number, dimensionY: number) {
    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
    this.cells = [];
    
    for (let i = 0; i < dimensionX; i++) {
      this.cells[i] = [];
      for (let j = 0; j < dimensionY; j++) {
        this.cells[i][j] = new Cell(i, j);
      }
    }
  }
  
  getDimensions() {
    return {
      x: this.dimensionX,
      y: this.dimensionY
    };
  }
  
  setAlive(cells: { x: number, y: number }[]) {
    cells.forEach((cell) => {
      this.cells[cell.x][cell.y].setStatus(Status.alive);
    });
  }
  
  getAlive() {
    const alive: Cell[] = [];
    this.cells.forEach(row => {
      row.forEach(cell => {
        if (cell.status === Status.alive) {
          alive.push(cell);
        }
      });
    });
    
    return alive;
  }
  
  getNeighbours(cell: Cell) {
    const neighbours: Cell[] = [];
    for (let i = cell.x - 1; i <= cell.x + 1; i++) {
      for (let j = cell.y - 1; j <= cell.y + 1; j++) {
        if (i >= 0 && i < this.dimensionX && j >= 0 && j < this.dimensionY && !(cell.x === i && cell.y === j)) {
          neighbours.push(this.cells[i][j]);
        }
      }
    }
    
    return neighbours;
  }
  
  getAffected() {
    const affected: Cell[] = [];
    const alive = this.getAlive();
    
    alive.forEach(cell => {
      affected.push(...this.getNeighbours(cell));
      affected.push(cell);
    });
    
    return uniq(affected);
  }
  
  nextGeneration() {
    const newGeneration = this.getAffected().map(cell => {
      let newStatus = Status.dead;
      const aliveCount = this.getNeighbours(cell).reduce((count, cell) => count + Number(cell.status === Status.alive), 0);
      if (cell.status === Status.alive) {
        if (aliveCount === 2 || aliveCount === 3) {
          newStatus = Status.alive;
        }
      } else {
        if (aliveCount === 3) {
          newStatus = Status.alive;
        }
      }
      return {
        x: cell.x,
        y: cell.y,
        status: newStatus
      };
    });
    newGeneration.forEach(cell => {
      this.cells[cell.x][cell.y].setStatus(cell.status);
    });
    return this.getAlive();
  }
  
}