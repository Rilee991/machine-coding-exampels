// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import React from 'react';
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = () => {
    const data = [
        {
          "country": "AD",
          "hot dog": 189,
          "hot dogColor": "hsl(278, 70%, 50%)",
          "burger": 163,
          "burgerColor": "hsl(286, 70%, 50%)",
          "sandwich": 140,
          "sandwichColor": "hsl(51, 70%, 50%)",
          "kebab": 111,
          "kebabColor": "hsl(282, 70%, 50%)",
          "fries": 141,
          "friesColor": "hsl(120, 70%, 50%)",
          "donut": 9,
          "donutColor": "hsl(161, 70%, 50%)"
        },
        {
          "country": "AE",
          "hot dog": 138,
          "hot dogColor": "hsl(241, 70%, 50%)",
          "burger": 181,
          "burgerColor": "hsl(351, 70%, 50%)",
          "sandwich": 12,
          "sandwichColor": "hsl(94, 70%, 50%)",
          "kebab": 158,
          "kebabColor": "hsl(302, 70%, 50%)",
          "fries": 178,
          "friesColor": "hsl(302, 70%, 50%)",
          "donut": 189,
          "donutColor": "hsl(331, 70%, 50%)"
        },
        {
          "country": "AF",
          "hot dog": 170,
          "hot dogColor": "hsl(226, 70%, 50%)",
          "burger": 183,
          "burgerColor": "hsl(266, 70%, 50%)",
          "sandwich": 40,
          "sandwichColor": "hsl(126, 70%, 50%)",
          "kebab": 70,
          "kebabColor": "hsl(31, 70%, 50%)",
          "fries": 126,
          "friesColor": "hsl(179, 70%, 50%)",
          "donut": 5,
          "donutColor": "hsl(46, 70%, 50%)"
        },
        {
          "country": "AG",
          "hot dog": 76,
          "hot dogColor": "hsl(59, 70%, 50%)",
          "burger": 145,
          "burgerColor": "hsl(299, 70%, 50%)",
          "sandwich": 161,
          "sandwichColor": "hsl(311, 70%, 50%)",
          "kebab": 154,
          "kebabColor": "hsl(266, 70%, 50%)",
          "fries": 90,
          "friesColor": "hsl(324, 70%, 50%)",
          "donut": 30,
          "donutColor": "hsl(271, 70%, 50%)"
        },
        {
          "country": "AI",
          "hot dog": 113,
          "hot dogColor": "hsl(83, 70%, 50%)",
          "burger": 64,
          "burgerColor": "hsl(45, 70%, 50%)",
          "sandwich": 100,
          "sandwichColor": "hsl(235, 70%, 50%)",
          "kebab": 45,
          "kebabColor": "hsl(1, 70%, 50%)",
          "fries": 27,
          "friesColor": "hsl(267, 70%, 50%)",
          "donut": 54,
          "donutColor": "hsl(155, 70%, 50%)"
        },
        {
          "country": "AL",
          "hot dog": 89,
          "hot dogColor": "hsl(206, 70%, 50%)",
          "burger": 76,
          "burgerColor": "hsl(204, 70%, 50%)",
          "sandwich": 69,
          "sandwichColor": "hsl(286, 70%, 50%)",
          "kebab": 47,
          "kebabColor": "hsl(330, 70%, 50%)",
          "fries": 28,
          "friesColor": "hsl(99, 70%, 50%)",
          "donut": 127,
          "donutColor": "hsl(199, 70%, 50%)"
        },
        {
          "country": "AM",
          "hot dog": 63,
          "hot dogColor": "hsl(70, 70%, 50%)",
          "burger": 199,
          "burgerColor": "hsl(113, 70%, 50%)",
          "sandwich": 89,
          "sandwichColor": "hsl(93, 70%, 50%)",
          "kebab": 187,
          "kebabColor": "hsl(249, 70%, 50%)",
          "fries": 165,
          "friesColor": "hsl(301, 70%, 50%)",
          "donut": 183,
          "donutColor": "hsl(5, 70%, 50%)"
        }
      ]
    return (
        <div style={{ height: "500px"}}>
    <ResponsiveBar
        data={data}
        
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
    </div>
)}

export default MyResponsiveBar;
