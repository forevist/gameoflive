import { Container, Stage, Text } from "@pixi/react";
import React from "react";
import { Circle } from "./components/Circle";

export const PixiMain = () => {
    return (
        <Stage options={{ backgroundColor: 0xeef1f5 }}>
            <Container x={0} y={0}>
                <Circle
                    x={100}
                    y={100}
                    r={10}
                    alpha={0.5}
                    fill={'green'}
                    stroke={'red'}
                    strokeWidth={1}
                />
                <Circle
                    x={200}
                    y={100}
                    r={10}
                    alpha={0.5}
                    fill={'green'}
                    stroke={'red'}
                    strokeWidth={1}
                />
                <Text text="Hello World" anchor={{ x: 0, y: 0 }} />
            </Container>
        </Stage>
    );
}