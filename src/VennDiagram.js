/* global venn */
/* global d3 */
import React, { Component } from 'react';
import padleft from 'lodash.padleft';
import './App.css';


// For an array of terms that are (2^n)-1 combinations
// available. One way of working these out is to count from
// 1 to 2^n, converting to binary and choosing any element
// where  the binary is '1'.
function mapTermsToSets(terms) {
    const sets = [];
    const combinations = Math.pow(2, terms.length);
    for (let i = 1; i < combinations; i++) {
        const binaryString = padleft(i.toString(2), terms.length, '0');
        console.log(`${i}_${binaryString}`);
        const currentSet =[];
        for (let j = binaryString.length -1; j > -1; j--) {
            if (binaryString[j]==='1') {
                currentSet.push(terms[j]);
            }
        }
        let size = Math.max(10, Math.round(100/currentSet.length));
        sets.push({sets: currentSet, size});
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
        if (!this.chart){
          this.chart = venn.VennDiagram();
        }
        d3.select(this.node)
            .datum(sets)
            .call(this.chart);

//        d3.select(this.node).selectAll('.venn-circle path').style('fill-opacity', 0.4).style('stroke-width', 4).style('stroke', 'black');
 //       d3.select(this.node).selectAll('text').style('fill', 'white');
 //   d3.select(this.node).selectAll('.venn-area').on('mouseover', (d,i)=>console.log(`${JSON.stringify(d)} - ${JSON.stringify(i)}`));
 //   d3.select(this.node).selectAll('.venn-area').on('click', (d,i)=>console.log(`${JSON.stringify(d)} - ${JSON.stringify(i)}`));

        d3.select(this.node)
          .selectAll('g path')
          .on('mouseup', function(d, i) {console.log(JSON.stringify(d));});
    }

    render() {
        return <div ref={node=>this.node=node} ></div>;
    }
}

export default VennDiagram;
