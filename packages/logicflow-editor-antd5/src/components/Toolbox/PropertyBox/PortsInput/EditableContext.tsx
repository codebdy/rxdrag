import React from 'react';
import { FormInstance } from 'antd/es/form';


export const EditableContext = React.createContext<FormInstance<any> | null>(null);
