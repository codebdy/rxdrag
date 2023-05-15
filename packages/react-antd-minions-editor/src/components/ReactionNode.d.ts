import { Node } from '@antv/x6';
import '@antv/x6-react-shape';
import { IActivityMaterial } from '@rxdrag/schema';
import { GlobalToken } from 'antd/es/theme/interface';
import { INodeData } from '../interfaces/interfaces';
export interface NodeViewParams extends INodeData {
    material: IActivityMaterial;
    token: GlobalToken;
    width: number;
    height: number;
    subLabel?: string;
    inputCounts?: number;
    outputCounts?: number;
}
export declare const ReactionNode: (props: {
    node?: Node;
}) => JSX.Element;
