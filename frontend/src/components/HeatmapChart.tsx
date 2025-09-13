import React from 'react';

interface HeatmapData {
  [key: string]: number | string;
}

interface HeatmapChartProps {
  data: HeatmapData[];
  title: string;
  rowKey: string;
  columns: string[];
  height?: number;
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ 
  data, 
  title, 
  rowKey, 
  columns, 
  height = 300 
}) => {
  const getIntensityColor = (value: number, maxValue: number) => {
    const intensity = value / maxValue;
    const opacity = Math.max(0.1, intensity);
    return `rgba(59, 130, 246, ${opacity})`;
  };

  const maxValue = Math.max(
    ...data.flatMap(row => 
      columns.map(col => typeof row[col] === 'number' ? row[col] as number : 0)
    )
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <div 
          className="grid gap-1"
          style={{ 
            gridTemplateColumns: `120px repeat(${columns.length}, 1fr)`,
            height: `${height}px`
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-center bg-gray-50 rounded font-medium text-sm text-gray-600">
            {rowKey}
          </div>
          {columns.map((col, index) => (
            <div 
              key={col}
              className="flex items-center justify-center bg-gray-50 rounded font-medium text-sm text-gray-600"
            >
              {col}
            </div>
          ))}
          
          {/* Data rows */}
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div className="flex items-center justify-center bg-gray-50 rounded font-medium text-sm text-gray-700">
                {row[rowKey]}
              </div>
              {columns.map((col, colIndex) => {
                const value = typeof row[col] === 'number' ? row[col] as number : 0;
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="flex items-center justify-center rounded text-sm font-medium text-gray-800"
                    style={{
                      backgroundColor: getIntensityColor(value, maxValue),
                      minHeight: '40px'
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;
