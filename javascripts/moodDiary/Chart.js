/**
 * @description Creating charts
 * @param Labels located at the bottom of the chart
 * @param datasets composed of the array of different each data consists of [label, backgroundColor, borderColor, data]
 * @param appendToElement id of element to append the data to
 */
export function ChartJS(labels, datasets, type, appendToElement) {
    const data = {
       labels: labels,
       datasets: datasets
     };
    
    const config = {
       type: 'line',
       data: data,
       options: {}
    };
    
    const chart = new Chart(
        appendToElement,
        config
    );
}
