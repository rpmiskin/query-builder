/* global venn */
/* global d3 */
import React, { Component } from 'react';
import './App.css';

function mapTermsToSets(terms) {
    const defaultSize = 100;
    const sets = [];
    for(let i = 0; i < terms.length; i+=1) {
       sets.push({sets:[terms[i]], size: defaultSize}); 
        for(let j = i+1; j < terms.length; j+=1) {
           sets.push({sets:[terms[i], terms[j]], size: defaultSize/2}); 
        }
    }
    return sets;
}

class VennDiagram extends Component {
    constructor(props) {
        super(props);
        this.createVennDiagram = this.createVennDiagram.bind(this);
    }

    componentDidMount() {
        this.createVennDiagram();
    }

    componentDidUpdate() {
        this.createVennDiagram();
    }

    createVennDiagram() {
        console.log(JSON.stringify(this.props));

        var sets = mapTermsToSets(this.props.terms || []);
	console.log(sets);
	if (!sets || sets.length === 0) {
	  // TODO The Venn diagram layout code does not like  empty sets!
          return;
	}
                    
        var chart = venn.VennDiagram();
        d3.select(this.node)
            .datum(sets)
            .call(chart);

        d3.select(this.node).selectAll('.venn-circle path').style('fill-opacity', 0.4).style('stroke-width', 4).style('stroke', 'black');
        d3.select(this.node).selectAll('text').style('fill', 'white');
    d3.select(this.node).selectAll('.venn-area').on('mouseover', (d,i)=>console.log(`${JSON.stringify(d)} - ${JSON.stringify(i)}`));
    d3.select(this.node).selectAll('.venn-area').on('click', (d,i)=>console.log(`${JSON.stringify(d)} - ${JSON.stringify(i)}`));
    }

    render() {
        return <div ref={node=>this.node=node} ></div>;
    }
}

export default VennDiagram;
