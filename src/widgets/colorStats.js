import * as d3 from "d3";
class ColorStats {

    constructor() {
    }

    buildStats(element, my_data = []){
        element.innerHTML='';
        const data = my_data;
        
        /*const data = [
            { color: 'White', count: 15 },
            { color: 'Blue', count: 12 },
            { color: 'Black', count: 8 },
            { color: 'Red', count: 10 },
            { color: 'Green', count: 18 },
            { color: 'Colorless', count: 7 }
        ];*/

        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.color))
            .range(['#F0E68C', '#4682B4', '#2F4F4F', '#B22222', '#228B22', '#A9A9A9']);

        const pie = d3.pie()
            .value(d => d.count)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);
        const label = document.createElement('label')
        label.textContent = "Deck Mana Color Distribution";
        label.classList.add("colorLabel");
        element.appendChild(label)
        const svg = d3.select(element)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const arcs = svg.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.color));

    }

}
export { ColorStats };