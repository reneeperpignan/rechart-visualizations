
import FilledLineChart from "./filledlinechart.js"
import RechartsLine from './RechartsLine.jsx'
import ChartsLine from './ChartsLine.jsx'
import ChartsBar from "./ChartsBar.jsx"

export default function Home() {
  return (
    <>
    {/* <LineChart/> */}
    <FilledLineChart/>
    {RechartsLine()} 
    {ChartsBar()} 
    {ChartsLine()}
    </>
  )
}
