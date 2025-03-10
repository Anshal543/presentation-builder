import React from "react";

interface TableComponentProps {
  content: string[][];
  onChange: (newContent: string[][]) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  initialRowSize?: number;
  initialColSize?: number;
}

const TableComponent = (props: Props) => {
  return <div>TableComponent</div>;
};

export default TableComponent;
