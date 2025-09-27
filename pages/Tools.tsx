import React, { useState } from 'react';
import { ToolSuite } from '../components/ToolSuite';
import { ToolId } from '../types';

export const Tools: React.FC = () => {
    const [activeTool, setActiveTool] = useState<ToolId>('textImage');
    return (
        <ToolSuite activeTool={activeTool} setActiveTool={setActiveTool} />
    );
};


