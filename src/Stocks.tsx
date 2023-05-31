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
    const [ticker, setTicker] = useState<string>('TSLA')

    const options = {
        //chart options
        responsive: true,
    };

    //transform data to be able to plot with react-chartjs-2 
    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: 'TSLA',
                data: chartDataPoints,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    function formatData(timeseries: {[key: string]: any}) {
      for (const key in timeseries['timeSeries']) {
        //convert key to formatted date like i did above but keep hours and minutes
        const date = new Date(key);
        const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        //push formatted date to chartLabels
        chartLabels.push(formattedDate);
        //push response['timeSeries'][key]['close'] to chartDataPoints
        chartDataPoints.push(timeseries['timeSeries'][key]['close']);

        //keep all labels and datapoints of ONLY the most recent day
        // const dayArr = []
        // const recentDay = chartLabels[0].split(',')[0]
        // for (const label in chartLabels) {
        //   if(label.split(',')[0] == recentDay){
        //     dayArr.push(label)
        //   }
        // }
        // console.log(dayArr)
        // console.log(recentDay)

        // for(const point in chartDataPoints){
        //   if(chartDataPoints.length > dayArr.length){
        //     chartDataPoints.pop()
        //   }
        // }

        //rearrage data so that it is in chronological order
        chartLabels.reverse();
        chartDataPoints.reverse();
      



        //set state for chartLabels and chartDataPoints
        setChartLabels(chartLabels);
        setChartDataPoints(chartDataPoints);
    }
    }


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

            formatData(response);

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
    <div className='stock-card'>
        <button className='button' onClick={() => {
            

            setOpen(true)
            

        }}>{ticker}</button>
        <button className='button'>15MIN</button>
        <button className='button'>SMA</button>

        {open && data ? (
        <Line 
        data={data} 
        options={options} 
        />
      ) : (
        <p>Loading chart data...</p>
      )}

    
    
    </div>
  )
}

export default Stocks