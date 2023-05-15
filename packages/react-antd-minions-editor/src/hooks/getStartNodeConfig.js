const STROKE_WIDTH = 2;
export const getStartNodeConfig = (nodeMeta, token) => {
    return {
        id: nodeMeta.id,
        shape: 'circle',
        x: 90,
        y: 60,
        width: 20,
        height: 20,
        ...nodeMeta.x6Node,
        label: nodeMeta.label,
        data: { meta: nodeMeta },
        attrs: {
            body: {
                fill: token.colorBgContainer,
                stroke: token.colorText,
                strokeWidth: STROKE_WIDTH,
                magnet: true,
                class: "start-node",
            },
            label: {
                refX: '-10',
                refY: 0.5,
                textAnchor: 'end',
                textVerticalAnchor: 'middle',
                fill: token.colorTextSecondary,
            },
        },
    };
};
