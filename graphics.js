function drawGraph(data) {

if (isNaN(parseFloat(data.y1.value)) || !isFinite(data.y1.value) || data.y1.value.indexOf(".") != -1 || Number(data.y1.value) < 0 ||
isNaN(parseFloat(data.y2.value)) || !isFinite(data.y2.value)||data.y2.value.indexOf(".") != -1|| Number(data.y2.value) < 0)
alert("Неверно введен диапазон! Оба числа должны быть целыми и положительными!");
else {
let table = Array.from(document.getElementById("tbl").rows).slice(1);
let arrGraph = [];
let x, y, y1;
let groupObj;
switch(data.graph.value) {
    case '2':
        groupObj = d3.group(table, d => d.cells[0].innerHTML);
        for(let entry of groupObj) {

        let sum = d3.sum(entry[1].map(d => Number(d.cells[2].innerHTML)));
        let elementGroup = {
        "x" : entry[0],
        "y" : sum
        };
        arrGraph.push(elementGroup);

        }
        break;
    default:
        table.sort(compData);
       function compData(a, b) {
            let d1 = Number(a.cells[1].innerHTML.substring(6, 10));
            let d2 =  Number(b.cells[1].innerHTML.substring(6, 10));
            if (d1 < d2) return -1;
            else if (d1 > d2) return 1;
            else return 0;
            }
        groupObj = d3.group(table, d => d.cells[1].innerHTML.substring(6, 10));
        for(let entry of groupObj) {
        let sum = d3.sum(entry[1].map(d => Number(d.cells[2].innerHTML)));
        let elementGroup = {
        "x" : entry[0],
        "y" : sum
        };
        arrGraph.push(elementGroup);
        }
}
//alert(x);
let marginX = 300;
let marginY = 75;
let height = 500;
let width = 1500;
let svg = d3.select("svg")
            .attr("height", height)
            .attr("width", width);
// очищаем svg перед построением
svg.selectAll("*").remove();
//// определяем минимальное и максимальное значение по оси OY
let min = d3.min(arrGraph.map(d => d.y))*0.95; //0;
let max = d3.max(arrGraph.map(d => d.y))*1.05;

//let a = d3.min(arrGraph.map(d => d.x));
//let b = d3.max(arrGraph.map(d => d.x));

let xAxisLen = width - 2 * marginX;
let yAxisLen = height - 2 * marginY;

// определяем шкалы для осей
let scaleY = d3.scaleLinear()
               .domain([max, min])
               .range([0, yAxisLen]);
let scaleX = d3.scaleBand()
               .domain(arrGraph.map(function(d) {
               return d.x;
               })
               )
               .range([0, xAxisLen],1);
// создаем оси
let axisX = d3.axisBottom(scaleX); // горизонтальная
let axisY = d3.axisLeft(scaleY); // вертикальная

svg.append("g")
.attr("transform",
`translate(${marginX}, ${height - marginY-50})`)
.call(axisX)
.selectAll("text")
.style("text-anchor", "end")
.attr("dx", "-.8em")
.attr("dy", ".15em")
.attr("transform", function (d) {
return "rotate(-45)";
});
svg.append("g")
.attr("transform",
`translate(${marginX}, ${marginY-50})`)
.call(axisY);

//
let lineF = d3.line()
.x(function(d) {
return scaleX(d.x)+scaleX.bandwidth()/2;
})
.y(function(d) {
return scaleY(d.y);
});

if (data.graph.value == '0') {
svg.append("path") // добавляем путь
// созданному пути добавляются данные массива arrGraph в качестве атрибута
.datum(arrGraph)
// вычисляем координаты концов линий с помощью функции lineF
.attr("d", lineF)
// помемещаем путь из линий в область построения
.attr("transform", `translate(${marginX}, ${marginY-50})`)
// задаем стиль линии графика
.style("stroke-width", "2")
.style("fill", "none")
.style("stroke", "red");
svg.append("line")
.attr("x1", marginX)
.attr("y1",height-marginY-50)
.attr("x2", marginX+scaleX.bandwidth()/2)
.attr("y2", marginY+scaleY(arrGraph[0].y)-50)
.style("stroke-width", "2")
.style("stroke", "red");

}
else {
g =svg.append("g")
.attr("transform",
`translate(${ marginX}, ${ marginY-50})`)
.selectAll(".rect")
.data(arrGraph)
.enter()
.append("rect")
.attr("x", function(d) {
return scaleX(d.x)+2.5;
})
.attr("width", scaleX.bandwidth()-5)
.attr("y", function(d) {
return scaleY(d.y);
})
.attr("height", function(d) {
return yAxisLen - scaleY(d.y);
})
.attr("fill", "blue");
}
}
}


document.addEventListener("DOMContentLoaded", () => {
    drawGraph(document.getElementById('form3'));
  });