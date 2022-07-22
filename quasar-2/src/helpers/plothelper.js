import * as d3 from 'd3'

function LineChart(data, {
    selector = '#mySVG',
    x = ([x]) => x, // given d in data, returns the (temporal) x-value
    //y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    //y2 = ([,y]) => y,
    ys = [],
    defined, // for gaps in data
    curve = d3.curveLinear, // method of intsverpolation between points
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleUtc, // the x-scale type
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // the y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = 'dark', // stroke color of line
    strokeLinecap = 'round', // stroke line cap of the line
    strokeLinejoin = 'round', // stroke line join of the line
    strokeWidth = 1.5, // stroke width of line, in pixels
    strokeOpacity = 1, // stroke opacity of line
    lineColor = 'lemonchiffon'
  } = {}) {
    let bgColor
    //let lineColors
    let txtColor
    if (color === 'dark'){
      bgColor = '#1a2133'
      //lineColors = ['lemonchiffon', '#bd0013', 'springgreen', 'cornflowerblue', '#ff951c', '#f587cb']
      txtColor = 'mintcream'
    } else {
      bgColor = 'mintcream'
      //lineColors = ['indigo', '#ab0218', '#007d73', '#38a300','#a87b00', '#0232b5']
      txtColor = 'midnightblue'
    }
    // Compute values.
    const mapmaker = z => (d => d[z])
    const ymaps = ys.map(mapmaker)
    const X = d3.map(data, x)
    const YS = ymaps.map(ymap => d3.map(data, ymap))
    const I = d3.range(X.length)
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(YS[0][i])
    const D = d3.map(data, defined)
  
    // Compute default domains.
    if (xDomain === undefined) xDomain = d3.extent(X)
    if (yDomain === undefined){
      const max = d3.max(YS.map(Y => d3.max(Y)))
      //yDomain = [0, max];
      yDomain = [0, max]
    } 
  
    // Construct scales and axes.
    const xScale = xType(xDomain, xRange)
    const yScale = yType(yDomain, yRange)
    const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0)
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat)
  
    const lines = []
    for (const Y of YS) {
      let line = d3.line()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]))
      lines.push(line)
    }
  
    const svg = d3.select(selector)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', `max-width: 100%; height: auto; height: intrinsic; background-color: ${bgColor}`)
  
    svg.append('g')
        .attr('transform', `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .attr('style', `color:${txtColor}`)
  
    svg.append('g')
        .attr('transform', `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select('.domain').remove())
        .call(g => g.selectAll('.tick line').clone()
            .attr('x2', width - marginLeft - marginRight)
            .attr('stroke-opacity', 0.1))
            .attr('style', `color:${txtColor}`)
        .call(g => g.append('text')
            .attr('x', -marginLeft)
            .attr('y', 10)
            .attr('fill', txtColor)
            .attr('text-anchor', 'start')
            .text(yLabel))
    
    for (let i = 0; i < lines.length; i++){
      svg.append('path')
        .attr('fill', 'none')
        .attr('stroke', lineColor)
        .attr('stroke-width', strokeWidth)
        .attr('stroke-linecap', strokeLinecap)
        .attr('stroke-linejoin', strokeLinejoin)
        .attr('stroke-opacity', strokeOpacity)
        .attr('d', lines[i](I))
    }
  
  
    return svg.node()
  }

  export default LineChart