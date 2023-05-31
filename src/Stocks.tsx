import React from 'react'
import { useState, useEffect } from 'react'
import AlphaVantage, {
    Interval,
    DataType,
    StockTimeSeries,
  } from 'alphavantage-wrapper-ts';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {Line} from 'react-chartjs-2'
import.meta.env.VITE_AV_KEY

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const av = new AlphaVantage({ apikey: import.meta.env.VITE_AV_KEY });


/////////functional component///////////
function Stocks() {

    const [chartData, setChartData] = useState<{[key: string]: any} | null >(null)
    const [chartLabels, setChartLabels] = useState<string[]>([])
    const [chartDataPoints, setChartDataPoints] = useState<string[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [ticker, setTicker] = useState<string>('MSFT')

    const date = new Date();
    date.setDate(date.getDate() - 4);
    
    const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    console.log(formattedDate); 

    const options = {
        //chart options
        responsive: true,
    };

    //transform data to be able to plot with react-chartjs-2 
    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: 'MSFT',
                data: chartDataPoints,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };


    //create useEffect to call API and set state
    useEffect(() => {
        const getData = async function intraday(){
            try{
            console.log('CALLING!!');
                const response = await av.stockTimeSeries.intraday({
                    symbol: ticker,
                    interval: Interval.FIFTEEN_MIN,
                    });
        
            setChartData(response);
            console.log(response);

            for (const key in response['timeSeries']) {
                //convert key to formatted date like i did above
                const date = new Date(key);
                const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                //push formatted date to chartLabels
                chartLabels.push(formattedDate);
                //push response['timeSeries'][key]['close'] to chartDataPoints
                chartDataPoints.push(response['timeSeries'][key]['close']);

                //reverse chartLabels and chartDataPoints
                chartLabels.reverse();
                chartDataPoints.reverse();

                //set state for chartLabels and chartDataPoints
                setChartLabels(chartLabels);
                setChartDataPoints(chartDataPoints);
            }

            } catch (error) {
                    console.error('Error fetching data:', error);
                }
        };

        //call getdata function 
        getData();
        
        
    }, [])

    //create useEffect to record renders
    useEffect(() => {
        console.log('RENDER!!');
    }, [chartData])



  return (
    <div>
        <button className='button' onClick={() => {
            

            setOpen(true)
            

        }}>Show MSFT 15min</button>

        {open && data ? (
        <Line data={data} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}

    
    
    </div>
  )
}

export default Stocks