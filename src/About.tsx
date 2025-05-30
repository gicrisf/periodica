import * as React from 'react';

const About: React.FC = () => {
    return (
        <div style={{
            background: 'black',
            color: 'white',
            width: '100%',
        }}>
            <h1>About Zeeman</h1>  
            Zeeman was created by Giovanni Crisalfi to solve a simple but persistent problem: the inefficiency of looking up isotopic data during spectroscopy work. Born from frustration during a Pharmaceutical Chemistry master's thesis at the University of Bologna, it evolved from a Python CLI script to this interactive visualization tool.

            <h1>Data Credits</h1>
            <ul>
                <li>Atomic weights & isotopic compositions: NIST Physical Measurement Laboratory  
                </li>
                <li>Nuclear spins: Hand-compiled from spectroscopy literature/scraped from Wikipedia</li>
            </ul>

            <b>Special Thanks</b> to the open-source community for the libraries that made it possible.  

            <h1>Your Turn</h1> 
            Found an error? Have a feature request? Contribute or report issues at <a href="https://github.com/gicrisf/zeeman">Zeeman Github repo</a>
        </div>
    )
}

export default About;
