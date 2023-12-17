import { Graphics } from '@pixi/graphics';
import { PixiComponent } from '@pixi/react';
import { propUpdated } from '../utils/propUpdated';
import { ColorSource } from '@pixi/color/lib/Color';

type CircleProps = {
  x: number;
  y: number;
  r: number;
  fill: ColorSource;
  stroke: ColorSource;
  strokeWidth: number;
  alpha: number;
}

export const Circle = PixiComponent('Circle', {
  create: () => new Graphics(),
  applyProps: (instance: Graphics, oldProps: CircleProps, props: CircleProps) => {
    const { x, y, r, fill, stroke, strokeWidth, alpha } = props;
    if (
      propUpdated(props, oldProps, [
        'x',
        'y',
        'stroke',
        'strokeWidth',
        'r',
        'fill'
      ])
    ) {
      instance.clear();
      instance.lineStyle({ width: strokeWidth, color: stroke });
      instance.beginFill(fill);
      instance.drawCircle(x || 0, y || 0, r);
      instance.endFill();
    }
    if (propUpdated(props, oldProps, ['alpha'])) {
      instance.alpha = alpha;
    }
  }
});
