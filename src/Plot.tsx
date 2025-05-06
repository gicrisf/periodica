import { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3';
import Box from '@mui/material/Box';

import useAppStore from './store';

const Plot: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const { selected } = useAppStore();
    const width = 400;
    const height = 400;
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
        const isotopeColor = d3.scaleOrdinal<string>()
            .domain(orderedIsotopes.map(iso => iso.nucleus))
            .range(d3.schemeDark2);

        const spinColor = d3.scaleOrdinal<string>()
            .domain(Array.from(spinGroups.keys()))
            .range(d3.schemePaired);

        // Pie generators
        const pie = d3.pie<any>()
            .value(d => d.isotopic_composition || d.abundance)
            .sort(null);

        // Inner ring (isotopes)
        const innerArc = d3.arc()
                           .innerRadius(radius * 0.3)
                           .outerRadius(radius * 0.6);

        // Outer ring (spin groups)
        const outerArc = d3.arc()
                           .innerRadius(radius * 0.65)
                           .outerRadius(radius * 0.9);

        // Outer ring (spin groups)
        chartGroup.selectAll(".spin-arc")
                  .data(spinArcs)
                  .enter().append("path")
                  .attr("d", outerArc)
                  .attr("fill", d => spinColor(d.data[0]));

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
                  .attr("transform", d => `translate(${outerArc.centroid(d)})`)
                  .text(d => `${d.data[0]} (${(d.data[1].total * 100).toFixed(1)}%)`)
                  .style("font-size", "10px")
                  .style("font-weight", "bold");

        // Add isotope labels (inner ring)
        chartGroup.selectAll(".isotope-label")
                  .data(isotopeArcs)
                  .enter()
                  .append("text")
                  .attr("transform", d => `translate(${innerArc.centroid(d)})`)
                  .attr("text-anchor", "middle")
                  .text(d => d.data.mass_number)
                  .style("font-size", "10px")
                  .style("font-weight", "bold");

        // Add element symbol at center
        const symbol = chartGroup.append("text")
                                 .attr("text-anchor", "middle")
                                 .attr("dy", ".3em")
                                 .style("font-size", "24px")
                                 .style("font-weight", "bold")
                                 .text(selected.symbol);

        // Add atomic number at top-left of symbol
        symbol.node()?.getBBox(); // Force layout calculation
        chartGroup.append("text")
                  .attr("x", -12)  // Small offset left from center
                  .attr("y", -10)  // Small offset up from center
                  .style("font-size", "14px")
                  .style("text-anchor", "end")  // Right-align to position
                  .text(selected.atomic_number);

    }, [selected]);

    return (
        <Box>
            <svg ref={svgRef} width={width} height={height}></svg>
        </Box>
    )
}

export default Plot;
