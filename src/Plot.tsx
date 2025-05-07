import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3';

import useAppStore from './store';

const Plot: React.FC = () => {
  const { selected } = useAppStore();
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height: Math.min(height, width * 0.5) });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const width = dimensions.width;
  const height = dimensions.height;
  const radius = Math.min(width, height) / 2;

  useEffect(() => {
    if (!selected || !svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // 1. Group isotopes by spin (unsorted)
    const spinGroups = d3.rollups(
      selected.isotopes.filter(iso => iso.isotopic_composition > 0 && iso.spin?.label),
      v => ({
        total: d3.sum(v, d => d.isotopic_composition),
        isotopes: v.sort((a, b) => a.mass_number - b.mass_number) // Sort isotopes by mass within group
      }),
      d => d.spin.label
    );

    // 2. Sort spin groups by descending abundance (for outer ring)
    spinGroups.sort((a, b) => b[1].total - a[1].total);

    console.log(spinGroups);

    // 3. Create flattened isotope array IN SPIN GROUP ORDER
    const orderedIsotopes = spinGroups.flatMap(
      ([spinLabel, group]) => group.isotopes
    );

    console.log(orderedIsotopes);

    const spinPie = d3.pie<typeof spinGroups[0]>()
      .value(d => d[1].total)
      .sort(null);

    const isotopePie = d3.pie<typeof validIsotopes[0]>()
      .value(d => d.isotopic_composition)
      .sort(null);

    const spinArcs = spinPie(spinGroups);
    const isotopeArcs = isotopePie(orderedIsotopes);

    // 4. Draw the chart
    const svg = d3.select(svgRef.current);
    const chartGroup = svg.append("g")
                          .attr("transform", `translate(${width/2},${height/2})`);

    // Color scales
    const neonPalette = [
      "#FF0D72", // Hot pink
      "#0DFF72", // Acid green
      "#FF8C0D", // Orange
      "#0D72FF", // Electric blue
      "#8C0DFF"  // Purple
    ];

    const brutalCyber = [
      "#FF0000", // Pure red
      "#00FF00", // Pure green
      "#0000FF", // Pure blue
      "#FF00FF", // Magenta (red+blue clash)
      "#FFFF00", // Yellow (red+green clash)
      "#00FFFF"  // Cyan (green+blue clash)
    ];

    // High-contrast brutalist accents (no neutrals)
    const brutalistAccents = [
      "#FF4136", // Vivid red
      "#0074D9", // Strong blue
      "#FFDC00", // Electric yellow
      "#2ECC40", // Bold green
      "#B10DC9", // Deep purple
      "#FF851B", // Bright orange
      "#F012BE", // Hot pink
      "#39CCCC"  // Cyan
    ];

    const isotopeColor = d3.scaleOrdinal<string>()
      .domain(orderedIsotopes.map(iso => iso.nucleus))
      .range(brutalistAccents);

    // Pie generators
    const pie = d3.pie<any>()
      .value(d => d.isotopic_composition || d.abundance)
      .sort(null);

    // Inner ring (isotopes)
    const innerArc = d3.arc()
                       .innerRadius(radius * 0.4)
                       .outerRadius(radius * 0.6);

    // Outer ring (spin groups)
    const outerArc = d3.arc()
                       .innerRadius(radius * 0.70)
                       .outerRadius(radius * 0.71);

    // Create corner arc generator
    const cornerArc = d3.arc()
                        .innerRadius(radius * 0.65)  // Start of corner curve
                        .outerRadius(radius * 0.70)   // Your original outer radius
                        .cornerRadius(10);           // Adjust for desired roundness

    // Draw just the corners for each segment
    chartGroup.selectAll(".spin-corner")
              .data(spinArcs)
              .enter().append("path")
              .attr("d", d => {
                // Create small arcs just for the start and end corners
                const startCorner = {
                  startAngle: d.startAngle - 0.001,  // Small angle before
                  endAngle: d.startAngle + 0.001     // Small angle after
                };
                const endCorner = {
                  startAngle: d.endAngle - 0.005,
                  endAngle: d.endAngle + 0.005
                };
                return cornerArc(startCorner) + cornerArc(endCorner);
              })
              .attr("fill", "black")
              .attr("stroke", "black")
              .attr("stroke-width", 1);


    // Outer ring (spin groups)
    chartGroup.selectAll(".spin-arc")
              .data(spinArcs)
              .enter().append("path")
              .attr("d", outerArc)
              .attr("fill", "black")
              .attr("stroke", "black")
              .attr("stroke-width", 1);

    // Inner isotope ring
    chartGroup.selectAll(".isotope-arc")
              .data(isotopeArcs)
              .enter().append("path")
              .attr("d", innerArc)
              .attr("fill", d => isotopeColor(d.data.nucleus));

    // Add labels with proper data access
    chartGroup.selectAll(".spin-label")
              .data(spinArcs)
              .enter().append("text")
              .attr("transform", d => {
                // Position labels slightly outside the arcs
                const pos = outerArc.centroid(d);
                const midAngle = Math.atan2(pos[1], pos[0]);
                const x = Math.cos(midAngle) * (radius * 0.80);
                const y = Math.sin(midAngle) * (radius * 0.80);
                return `translate(${x},${y})`;
              })
              .attr("text-anchor", d => {
                // Smart label positioning based on angle
                const pos = outerArc.centroid(d);
                return pos[0] > 0 ? "start" : "end";
              })
              .text(d => `${d.data[0]} (${(d.data[1].total * 100).toFixed(1)}%)`)
              .style("font-size", "11px")
              .style("font-weight", "bold");

    // Add isotope labels (inner ring)
    chartGroup.selectAll(".isotope-label")
              .data(isotopeArcs)
              .enter()
              .append("text")
              .attr("transform", d => `translate(${innerArc.centroid(d)})`)
              .attr("text-anchor", "middle")
              .text(d => d.data.mass_number)
              .style("font-size", "11px")
              .style("font-weight", "bold");

    // Add element symbol at center
    const symbol = chartGroup.append("text")
                             .attr("text-anchor", "middle")
                             .attr("dy", ".3em")
                             .style("font-size", "34px")
                             .style("font-weight", "bold")
                             .text(selected.symbol);

    // Add atomic number at top-left of symbol
    symbol.node()?.getBBox(); // Force layout calculation
    chartGroup.append("text")
              .attr("x", -20)  // Small offset left from center
              .attr("y", -12)  // Small offset up from center
              .style("font-size", "12px")
              .style("text-anchor", "end")  // Right-align to position
              .text(selected.atomic_number);

  }, [selected, dimensions]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height}></svg>
    </div>
  )
}

export default Plot;
