$(function() {

    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2010 Q1',
            a: 10000,
            ab: null,
            abc: 1111
        }, {
            period: '2010 Q2',
            a: 2778,
            ab: 2294,
            abc: 2441
        }, {
            period: '2010 Q3',
            a: 4912,
            ab: 1969,
            abc: 2501
        }, {
            period: '2010 Q4',
            a: 3767,
            ab: 3597,
            abc: 5689
        }, {
            period: '2011 Q1',
            a: 6810,
            ab: 1914,
            abc: 2293
        }, {
            period: '2011 Q2',
            a: 5670,
            ab: 4293,
            abc: 1881
        }, {
            period: '2011 Q3',
            a: 4820,
            ab: 3795,
            abc: 1588
        }, {
            period: '2011 Q4',
            a: 15073,
            ab: 5967,
            abc: 5175
        }, {
            period: '2012 Q1',
            a: 10687,
            ab: 4460,
            abc: 2028
        }, {
            period: '2012 Q2',
            a: 8432,
            ab: 5713,
            abc: 1791
        }],
        xkey: 'period',
        ykeys: ['a', 'ab', 'abc'],
        labels: ['a', 'ab', 'abc'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Download Sales",
            value: 12
        }, {
            label: "In-Store Sales",
            value: 30
        }, {
            label: "Mail-Order Sales",
            value: 20
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true
    });

});
