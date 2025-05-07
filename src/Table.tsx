import * as React from 'react';
import { useState, useEffect } from 'react';
import useAppStore from './store';
import * as d3 from 'd3';

const ProgressBar = ({ value }: { value: number }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const maxWidth = 150;
    const scale = d3.scaleLinear().domain([0, 100]).range([0, maxWidth]);

  useEffect(() => {
    if (ref.current) {
      const width = scale(value);
      d3.select(ref.current)
        .selectAll('div')
        .data([width])
        .join('div')
        .style('width', d => `${d}%`)
        .style('height', '4px')
        .style('background', '#0074D9');
    }
  }, [value]);

  return (
    <div>
      <span>{`${value.toFixed(2)}%`}</span>
      <div ref={ref} style={{ width: `${maxWidth}px`, marginRight: '8px' }} />
    </div>
  );
};

const Table: React.FC = () => {
  const { selected } = useAppStore();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'isotopic_composition',
    direction: 'desc'
  });

  const sortedIsotopes = React.useMemo(() => {
    return [...selected.isotopes].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [selected.isotopes, sortConfig]);

  const requestSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

return (
    <div style={{
      overflowY: 'auto',
      maxWidth: '1000px',
      height: '400px'
    }}>
      <table className="ibm-inverted" style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            {['mass_number', 'relative_atomic_mass', 'spin', 'thalf', 'isotopic_composition'].map((key) => (
              <th
                key={key}
                onClick={() => key !== 'spin' && requestSort(key)}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: key !== 'spin' ? 'pointer' : 'default',
                  ':hover': key !== 'spin' ? { backgroundColor: '#e9ecef' } : {}
                }}
              >
                {key.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedIsotopes.map((isotope) => (
            <tr
              key={isotope.mass_number}
              style={{
                ':hover': { backgroundColor: '#f8f9fa' },
                borderBottom: '1px solid #e9ecef'
              }}
            >
              <td style={{ padding: '12px 16px' }}>{isotope.mass_number}</td>
              <td style={{ padding: '12px 16px' }}>{isotope.relative_atomic_mass}</td>
              <td style={{ padding: '12px 16px' }}>{isotope.spin?.label || "?"}</td>
              <td style={{ padding: '12px 16px' }}>{isotope.thalf}</td>
              <td style={{ padding: '12px 16px' }}>
                <ProgressBar value={isotope.isotopic_composition ? isotope.isotopic_composition * 100 : 0} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
