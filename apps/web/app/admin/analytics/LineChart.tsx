'use client';

import { useTranslation } from '../../../lib/i18n-client';

interface LineChartData {
  _id: string;
  count: number;
  revenue: number;
}

interface LineChartProps {
  data: Array<LineChartData>;
}

export function LineChart({ data }: LineChartProps) {
  const { t } = useTranslation();

  if (!data || data.length === 0) return null;

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('hy-AM', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const maxCount = Math.max(...data.map(d => d.count), 1);
  const width = 800;
  const height = 300;
  const padding = { top: 30, right: 40, bottom: 50, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = data.map((d, i) => {
    const x = padding.left + (i / (data.length - 1 || 1)) * chartWidth;
    const y = padding.top + chartHeight - (d.count / maxCount) * chartHeight;
    return { x, y, ...d };
  });

  // Smooth curve using quadratic bezier
  const getSmoothPath = (points: Array<{ x: number; y: number }>) => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      if (next) {
        const cp1x = prev.x + (curr.x - prev.x) * 0.5;
        const cp1y = prev.y;
        const cp2x = curr.x - (next.x - curr.x) * 0.5;
        const cp2y = curr.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else {
        path += ` L ${curr.x} ${curr.y}`;
      }
    }
    
    return path;
  };

  const smoothPath = getSmoothPath(points);
  const areaPath = `${smoothPath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  // Y-axis values
  const yAxisSteps = 5;
  const yAxisValues = Array.from({ length: yAxisSteps + 1 }, (_, i) => {
    const value = Math.round((maxCount / yAxisSteps) * (yAxisSteps - i));
    const y = padding.top + (chartHeight / yAxisSteps) * i;
    return { value, y };
  });

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-64" preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Modern gradient for area */}
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          
          {/* Gradient for line */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          
          {/* Shadow filter for depth */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Glow effect for points */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background grid lines - subtle and modern */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1={padding.left}
            y1={padding.top + chartHeight * ratio}
            x2={width - padding.right}
            y2={padding.top + chartHeight * ratio}
            stroke="#f1f5f9"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
        
        {/* Y-axis grid lines */}
        {points.map((point, i) => {
          if (i === 0 || i === points.length - 1) return null;
          return (
            <line
              key={`y-grid-${i}`}
              x1={point.x}
              y1={padding.top}
              x2={point.x}
              y2={padding.top + chartHeight}
              stroke="#f1f5f9"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.5"
            />
          );
        })}
        
        {/* Area under line with gradient */}
        <path
          d={areaPath}
          fill="url(#chartGradient)"
          opacity="0.6"
        />
        
        {/* Main line with gradient and shadow */}
        <path
          d={smoothPath}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#shadow)"
        />
        
        {/* Y-axis labels */}
        {yAxisValues.map(({ value, y }, i) => (
          <g key={`y-label-${i}`}>
            <line
              x1={padding.left - 5}
              y1={y}
              x2={padding.left}
              y2={y}
              stroke="#64748b"
              strokeWidth="1"
            />
            <text
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              fontSize="11"
              fill="#64748b"
              fontWeight="500"
            >
              {value}
            </text>
          </g>
        ))}
        
        {/* Data points with hover effect */}
        {points.map((point, i) => (
          <g key={i} className="cursor-pointer group">
            {/* Hover circle (invisible but interactive) */}
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="transparent"
              className="hover:fill-blue-100 hover:fill-opacity-30 transition-all duration-200"
            />
            
            {/* Outer glow circle */}
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#3b82f6"
              opacity="0.3"
              className="group-hover:opacity-0.6 group-hover:r-7 transition-all duration-200"
            />
            
            {/* Main point */}
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke="#3b82f6"
              strokeWidth="3"
              className="group-hover:r-5 group-hover:stroke-[#6366f1] transition-all duration-200"
              filter="url(#glow)"
            />
            
            {/* Inner dot */}
            <circle
              cx={point.x}
              cy={point.y}
              r="2"
              fill="#3b82f6"
              className="group-hover:fill-[#6366f1] transition-all duration-200"
            />
            
            {/* Tooltip on hover */}
            <title>
              {formatDateShort(point._id)}: {t('admin.analytics.ordersLabel').replace('{count}', point.count.toString())}, {formatCurrency(point.revenue)}
            </title>
          </g>
        ))}
        
        {/* X-axis line */}
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={width - padding.right}
          y2={padding.top + chartHeight}
          stroke="#cbd5e1"
          strokeWidth="2"
        />
      </svg>
      
      {/* X-axis labels - Modern styling */}
      <div className="flex justify-between mt-4 px-2">
        {data.length <= 10 ? (
          data.map((d, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xs font-medium text-gray-600 transform -rotate-45 origin-center whitespace-nowrap">
                {formatDateShort(d._id)}
              </span>
            </div>
          ))
        ) : (
          <>
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-gray-600">
                {formatDateShort(data[0]._id)}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-gray-600">
                {formatDateShort(data[Math.floor(data.length / 2)]._id)}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-gray-600">
                {formatDateShort(data[data.length - 1]._id)}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}



