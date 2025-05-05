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

        // Prepare data
        const isotopes = selected.isotopes
                                 .filter(iso => iso.isotopic_composition > 0)
                                 .sort((a, b) => a.mass_number - b.mass_number);



        // Generate data by grouping isotopes by spin
        const spinGroups = new Map<string, number>();
        selected.isotopes.forEach(iso => {
            const spinLabel = iso.spin?.label || 'unknown';
            const current = spinGroups.get(spinLabel) || 0;
            spinGroups.set(spinLabel, current + iso.isotopic_composition);
        });

        // Convert to array format for D3
        const data = Array.from(spinGroups.entries())
                          .map(([spin, abundance]) => ({ spin, abundance }));

        // Clear previous chart
        d3.select(svgRef.current).selectAll("*").remove();

        // Setup chart
        const svg = d3.select(svgRef.current);
        const chartGroup = svg.append("g")
                              .attr("transform", `translate(${width/2},${height/2})`);

        // Color scales
        const isotopeColor = d3.scaleOrdinal<string>()
            .domain(isotopes.map(iso => iso.nucleus))
            .range(d3.schemeTableau10);

        const spinColor = d3.scaleOrdinal<string>()
            .domain(Array.from(spinGroups.keys()))
            .range(d3.schemeDark2);

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

        // Draw inner ring (isotopes)
        chartGroup.selectAll(".inner-arc")
                  .data(pie(isotopes))
                  .enter()
                  .append("path")
                  .attr("d", innerArc)
                  .attr("fill", d => isotopeColor(d.data.nucleus))
                  .attr("stroke", "white")
                  .style("stroke-width", "1px");

        // Draw outer ring (spin groups)
        chartGroup.selectAll(".outer-arc")
                  .data(pie(Array.from(spinGroups.entries()).map(([spin, abundance]) => ({ spin, abundance }))))
                  .enter()
                  .append("path")
                  .attr("d", outerArc)
                  .attr("fill", d => spinColor(d.data.spin))
                  .attr("stroke", "white")
                  .style("stroke-width", "1px");

        // Add isotope labels (inner ring)
        chartGroup.selectAll(".inner-label")
                  .data(pie(isotopes))
                  .enter()
                  .append("text")
                  .attr("transform", d => `translate(${innerArc.centroid(d)})`)
                  .attr("text-anchor", "middle")
                  .text(d => d.data.mass_number)
                  .style("font-size", "10px")
                  .style("font-weight", "bold");

        const spinData = Array.from(spinGroups.entries()).map(([spin, abundance]) => ({
            spin,
            abundance // not using that rn
        }));

        chartGroup.selectAll(".outer-label")
                  .data(pie(spinData))
                  .enter()
                  .append("text")
                  .attr("transform", d => `translate(${outerArc.centroid(d)})`)
                  .text(d => `${d.data.spin}`)
                  .style("font-size", "10px")
                  .style("font-weight", "bold");

    }, [selected]);

    return (
        <Box>
            <svg ref={svgRef} width={width} height={height}></svg>
        </Box>
    )
}

export default Plot;
