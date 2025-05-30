import * as React from 'react';

const About: React.FC = () => {
    return (
        <div style={{
            background: 'black',
            color: 'white',
            width: '100%',
        }}>
            <h1>About Zeeman</h1>  
            Zeeman was created by Giovanni Crisalfi to solve a simple but persistent problem: the inefficiency of looking up isotopic data during spectroscopy work.
            What began as a Python script during pharmaceutical chemistry research at the University of Bologna has evolved into this interactive visualization tool.

            <h1>Data Credits</h1>
            <ul>
                <li>Atomic weights & isotopic compositions: NIST Physical Measurement Laboratory</li>
                <li>Nuclear spins: Hand-compiled from literature</li>
            </ul>

            <b>Thanks</b> to the open-source community for the libraries that made it possible, especially:
            <ul>
                <li><a href="https://d3js.org/">D3.js</a></li>
                <li><a href="https://zustand.docs.pmnd.rs/">Zustand</a></li>
                <li><a href="https://react.dev/">React</a></li>
            </ul>

            <h1>Your Turn</h1>
            Found an error? Have a feature request? Contribute or report issues at <a href="https://github.com/gicrisf/zeeman">Zeeman Github repo</a>
        </div>
    )
}

export default About;
