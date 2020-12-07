/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[100.0, 10.0]], "isOverall": false, "label": "/5-home_default/today-is-a-good-day-framed-poster.jpg-24", "isController": false}, {"data": [[1200.0, 2.0], [1400.0, 3.0], [1500.0, 2.0], [1600.0, 1.0], [1700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-3.jpg-9", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/8-home_default/mug-today-is-a-good-day.jpg-14", "isController": false}, {"data": [[300.0, 2.0], [100.0, 8.0]], "isOverall": false, "label": "/themes/classic/assets/css/082a71677e756fb75817e8f262a07cb4.svg-26", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [700.0, 2.0], [800.0, 3.0], [400.0, 1.0], [200.0, 8.0], [900.0, 2.0]], "isOverall": false, "label": "/en/-1", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/modules/blockreassurance/img/ic_local_shipping_black_36dp_1x.png-24", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/14-home_default/hummingbird-cushion.jpg-48", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "/modules/ps_imageslider/css/homeslider.css-10", "isController": false}, {"data": [[700.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "/5-home_default/today-is-a-good-day-framed-poster.jpg-5", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/modules/ps_searchbar/ps_searchbar.js-13", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/themes/classic/assets/css/custom.css-7", "isController": false}, {"data": [[600.0, 5.0], [700.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "/en/order-51", "isController": false}, {"data": [[300.0, 1.0], [200.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "/submit/telemetry/0f5e4abd-963d-498d-b345-8b6ec4207cba/event/Firefox/82.0.3/release/20201108180448?v=4-63", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/jquery.ui.theme.min.css-2", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/3-home_default/the-best-is-yet-to-come-framed-poster.jpg-23", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/2-small_default/hummingbird-printed-t-shirt.jpg-37", "isController": false}, {"data": [[600.0, 5.0], [700.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "/submit/telemetry/44ba5925-461b-421c-a9f9-c327a447017c/main/Firefox/82.0.3/release/20201108180448?v=4-61", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/themes/classic/assets/js/custom.js-9", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/8-home_default/mug-today-is-a-good-day.jpg-27", "isController": false}, {"data": [[300.0, 2.0], [200.0, 8.0]], "isOverall": false, "label": "/submit/telemetry/7c5636f0-176f-4895-9cea-6bbeb04e7713/health/Firefox/82.0.3/release/20201108180448?v=4-62", "isController": false}, {"data": [[300.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "/themes/classic/assets/css/99db8adec61e4fcf5586e1afa549b432.svg-30", "isController": false}, {"data": [[600.0, 5.0], [300.0, 1.0], [700.0, 4.0]], "isOverall": false, "label": "/submit/telemetry/0ab56bcc-adbf-4f72-b7e3-577889d38978/modules/Firefox/82.0.3/release/20201108180448?v=4-64", "isController": false}, {"data": [[100.0, 9.0], [500.0, 1.0]], "isOverall": false, "label": "/img/m/1.jpg-23", "isController": false}, {"data": [[600.0, 1.0], [100.0, 8.0], [200.0, 1.0]], "isOverall": false, "label": "/themes/classic/assets/css/8b05d51ede908907d65695558974d86f.svg-27", "isController": false}, {"data": [[300.0, 1.0], [100.0, 8.0], [200.0, 1.0]], "isOverall": false, "label": "/themes/classic/assets/css/e049aeb07a2ae1627933e8e58d3886d2.svg-28", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [700.0, 3.0], [800.0, 1.0], [900.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-1.jpg-16", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "/img/logo.png-2", "isController": false}, {"data": [[300.0, 3.0], [200.0, 3.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "/js/jquery/ui/jquery-ui.min.js-14", "isController": false}, {"data": [[700.0, 2.0], [800.0, 4.0], [900.0, 2.0], [1000.0, 2.0]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53", "isController": false}, {"data": [[300.0, 1.0], [200.0, 9.0]], "isOverall": false, "label": "/submit/telemetry/11692f32-fa2d-4e6e-8866-e9be92ef83b6/health/Firefox/82.0.3/release/20201108180448?v=4-65", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "/modules/ps_facetedsearch/views/dist/front.js-38", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/themes/classic/assets/js/custom.js-13", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 2.0], [1200.0, 2.0], [2400.0, 1.0], [1300.0, 1.0], [3000.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-3.jpg-21", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/3-home_default/the-best-is-yet-to-come-framed-poster.jpg-10", "isController": false}, {"data": [[300.0, 3.0], [200.0, 7.0]], "isOverall": false, "label": "/en/order-51-2", "isController": false}, {"data": [[200.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "/en/order-51-1", "isController": false}, {"data": [[100.0, 4.0], [200.0, 6.0]], "isOverall": false, "label": "/en/order-51-0", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/modules/ps_facetedsearch/views/dist/front.css-37", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "/modules/blockreassurance/img/ic_swap_horiz_black_36dp_1x.png-25", "isController": false}, {"data": [[200.0, 8.0], [400.0, 2.0]], "isOverall": false, "label": "/en/order-36-2", "isController": false}, {"data": [[600.0, 2.0], [1200.0, 1.0], [700.0, 2.0], [400.0, 2.0], [900.0, 1.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-2.jpg-20", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/themes/classic/assets/css/ffddcb3736980b23405b31142a324b62.svg-29", "isController": false}, {"data": [[300.0, 1.0], [200.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "/submit/telemetry/d85dd93e-37cb-4d6b-80bd-92960bff2ef9/health/Firefox/82.0.3/release/20201108180448?v=4-59", "isController": false}, {"data": [[100.0, 8.0], [200.0, 2.0]], "isOverall": false, "label": "/en/order-36-0", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "/modules/blockreassurance/img/ic_verified_user_black_36dp_1x.png-22", "isController": false}, {"data": [[100.0, 7.0], [200.0, 3.0]], "isOverall": false, "label": "/en/order-36-1", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [1500.0, 2.0], [800.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "/modules/ps_banner/img/sale70.png-28", "isController": false}, {"data": [[300.0, 2.0], [200.0, 6.0], [400.0, 2.0]], "isOverall": false, "label": "/en/men/1-1-hummingbird-printed-t-shirt.html-20", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/img/logo.png-17", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [200.0, 1.0], [400.0, 3.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "/en/3-clothes-41", "isController": false}, {"data": [[100.0, 6.0], [200.0, 4.0]], "isOverall": false, "label": "/en/order?id_address=0-45-1", "isController": false}, {"data": [[300.0, 3.0], [400.0, 5.0], [500.0, 2.0]], "isOverall": false, "label": "/en/3-clothes-40", "isController": false}, {"data": [[300.0, 5.0], [400.0, 5.0]], "isOverall": false, "label": "/en/order?id_address=0-45-0", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/2-cart_default/hummingbird-printed-t-shirt.jpg-35", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "/submit/telemetry/3d914e07-e1ed-416e-8f87-87ed47595331/health/Firefox/82.0.3/release/20201108180448?v=4-58", "isController": false}, {"data": [[300.0, 2.0], [200.0, 8.0]], "isOverall": false, "label": "/en/order?id_address=0-45-2", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/21-home_default/brown-bear-printed-sweater.jpg-19", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "/submit/telemetry/781aec33-5a41-4872-964e-94872f69d409/health/Firefox/82.0.3/release/20201108180448?v=4-60", "isController": false}, {"data": [[300.0, 4.0], [400.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "/-34-1", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/6-home_default/mug-the-best-is-yet-to-come.jpg-25", "isController": false}, {"data": [[100.0, 7.0], [200.0, 3.0]], "isOverall": false, "label": "/-34-0", "isController": false}, {"data": [[300.0, 1.0], [100.0, 7.0], [200.0, 2.0]], "isOverall": false, "label": "/21-home_default/brown-bear-printed-sweater.jpg-6", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/images/ui-bg_flat_75_ffffff_40x100.png-32", "isController": false}, {"data": [[1100.0, 2.0], [700.0, 1.0], [1800.0, 1.0], [900.0, 1.0], [500.0, 2.0], [1000.0, 3.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-2.jpg-7", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "/submit/telemetry/4caa950e-2003-4f14-b479-b157a3b7b1a4/health/Firefox/82.0.3/release/20201108180448?v=4-57", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [800.0, 2.0], [1700.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "/modules/ps_banner/img/sale70.png-15", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/c/8-category_default/home-accessories.jpg-50", "isController": false}, {"data": [[300.0, 2.0], [200.0, 3.0], [100.0, 3.0], [400.0, 2.0]], "isOverall": false, "label": "/themes/classic/assets/css/570eb83859dc23dd0eec423a49e147fe.woff2-17", "isController": false}, {"data": [[300.0, 4.0], [200.0, 3.0], [100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "/themes/core.js-6", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [100.0, 8.0]], "isOverall": false, "label": "/4-home_default/the-adventure-begins-framed-poster.jpg-22", "isController": false}, {"data": [[200.0, 5.0], [100.0, 5.0]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-2", "isController": false}, {"data": [[300.0, 1.0], [200.0, 9.0]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-3", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [400.0, 3.0], [500.0, 4.0]], "isOverall": false, "label": "/en/8-home-accessories-46", "isController": false}, {"data": [[100.0, 3.0], [200.0, 7.0]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-0", "isController": false}, {"data": [[200.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-1", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [400.0, 7.0]], "isOverall": false, "label": "/submit/telemetry/2c5aba75-7ef0-46e6-81a6-c1f29fc88318/event/Firefox/82.0.3/release/20201108180448?v=4-56", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [1300.0, 1.0], [700.0, 3.0], [800.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "/themes/classic/assets/css/19c1b868764c0e4d15a45d3f61250488.woff2-16", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "/c/5-category_default/women.jpg-43", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 3.0], [700.0, 1.0], [400.0, 3.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "/themes/classic/assets/css/199038f07312bfc6f0aabd3ed6a2b64d.woff2-29", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "/submit/telemetry/5a6c2505-eb12-4591-9ac2-980d170db91e/health/Firefox/82.0.3/release/20201108180448?v=4-55", "isController": false}, {"data": [[300.0, 1.0], [100.0, 3.0], [200.0, 5.0], [400.0, 1.0]], "isOverall": false, "label": "/themes/classic/assets/js/theme.js-3", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "/10-home_default/mountain-fox-cushion.jpg-47", "isController": false}, {"data": [[300.0, 5.0], [400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "/en/8-home-accessories-55", "isController": false}, {"data": [[300.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "/22-home_default/customizable-mug.jpg-51", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [700.0, 1.0], [400.0, 1.0], [800.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "/en/8-home-accessories-54", "isController": false}, {"data": [[600.0, 1.0], [400.0, 5.0], [500.0, 4.0]], "isOverall": false, "label": "/en/8-home-accessories-53", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/img/s/2.jpg-47", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "/success.txt-50", "isController": false}, {"data": [[300.0, 2.0], [200.0, 6.0], [400.0, 2.0]], "isOverall": false, "label": "/themes/classic/assets/css/theme.css-11", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/images/ui-bg_flat_75_ffffff_40x100.png-19", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "/c/3-category_default/clothes.jpg-39", "isController": false}, {"data": [[300.0, 2.0], [1300.0, 1.0], [400.0, 5.0], [500.0, 2.0]], "isOverall": false, "label": "/en/5-women-42", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/modules/ps_imageslider/js/homeslider.js-8", "isController": false}, {"data": [[300.0, 3.0], [200.0, 5.0], [500.0, 2.0]], "isOverall": false, "label": "/en/5-women-45", "isController": false}, {"data": [[300.0, 3.0], [200.0, 4.0], [500.0, 3.0]], "isOverall": false, "label": "/en/5-women-44", "isController": false}, {"data": [[600.0, 4.0], [700.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "/-34", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "/2-home_default/hummingbird-printed-t-shirt.jpg-4", "isController": false}, {"data": [[600.0, 1.0], [100.0, 3.0], [200.0, 6.0]], "isOverall": false, "label": "/en/module/ps_shoppingcart/ajax-33", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/modules/ps_imageslider/js/responsiveslides.min.js-5", "isController": false}, {"data": [[100.0, 8.0], [200.0, 2.0]], "isOverall": false, "label": "/2-home_default/hummingbird-printed-t-shirt.jpg-18", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/modules/ps_shoppingcart/ps_shoppingcart.js-12", "isController": false}, {"data": [[300.0, 1.0], [100.0, 8.0], [200.0, 1.0]], "isOverall": false, "label": "/themes/classic/assets/css/570eb83859dc23dd0eec423a49e147fe.woff2-31", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0], [400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "/en/3-clothes-36", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/23-home_default/pack-mug-framed-poster.jpg-52", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/12-home_default/brown-bear-cushion.jpg-49", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [800.0, 2.0], [1600.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-1.jpg-3", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/themes/classic/assets/css/b1db819132e64a3e01911a1413c33acf.svg-31", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [700.0, 2.0], [400.0, 3.0], [500.0, 3.0]], "isOverall": false, "label": "/themes/classic/assets/css/7a3ebca0cba2e2c6090e84e1d77e0f94.woff2-38", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "/success.txt-40", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "/success.txt-41", "isController": false}, {"data": [[700.0, 4.0], [800.0, 2.0], [900.0, 4.0]], "isOverall": false, "label": "/en/order?id_address=0-45", "isController": false}, {"data": [[5800.0, 5.0], [6100.0, 1.0], [6000.0, 1.0], [5900.0, 1.0], [7500.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "/-44", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "/success.txt-48", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "/success.txt-49", "isController": false}, {"data": [[100.0, 7.0], [200.0, 3.0]], "isOverall": false, "label": "/img/favicon.ico-33", "isController": false}, {"data": [[600.0, 5.0], [700.0, 1.0], [800.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "/en/order-36", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/7-home_default/mug-the-adventure-begins.jpg-26", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/6-home_default/mug-the-best-is-yet-to-come.jpg-8", "isController": false}, {"data": [[100.0, 9.0], [1600.0, 1.0]], "isOverall": false, "label": "/4-home_default/the-adventure-begins-framed-poster.jpg-11", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/jquery-ui.min.css-4", "isController": false}, {"data": [[400.0, 4.0], [500.0, 6.0]], "isOverall": false, "label": "/en/8-home-accessories-56", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [400.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "/en/order-42-0", "isController": false}, {"data": [[100.0, 6.0], [200.0, 4.0]], "isOverall": false, "label": "/modules/ps_emailsubscription/views/js/ps_emailsubscription.js-15", "isController": false}, {"data": [[100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "/en/order-42-1", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "/en/order-42-2", "isController": false}, {"data": [[0.0, 9.0], [100.0, 1.0]], "isOverall": false, "label": "/success.txt-39", "isController": false}, {"data": [[700.0, 2.0], [400.0, 1.0], [800.0, 4.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "/themes/classic/assets/css/199038f07312bfc6f0aabd3ed6a2b64d.woff2-18", "isController": false}, {"data": [[600.0, 1.0], [700.0, 4.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "/themes/classic/assets/css/19c1b868764c0e4d15a45d3f61250488.woff2-30", "isController": false}, {"data": [[100.0, 10.0]], "isOverall": false, "label": "/7-home_default/mug-the-adventure-begins.jpg-12", "isController": false}, {"data": [[100.0, 8.0], [200.0, 2.0]], "isOverall": false, "label": "/en/cart-32", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "/en/cart-34", "isController": false}, {"data": [[600.0, 1.0], [100.0, 8.0], [200.0, 1.0]], "isOverall": false, "label": "/2-large_default/hummingbird-printed-t-shirt.jpg-21", "isController": false}, {"data": [[800.0, 6.0], [900.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "/en/order-42", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 7700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 87.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1064.0, "series": [{"data": [[0.0, 1064.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 199.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 87.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 9.488294314381273, "minX": 1.6073796E12, "maxY": 10.0, "series": [{"data": [[1.6073796E12, 10.0], [1.60737966E12, 9.488294314381273]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.60737966E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 6250.7, "series": [{"data": [[10.0, 157.9]], "isOverall": false, "label": "/5-home_default/today-is-a-good-day-framed-poster.jpg-24", "isController": false}, {"data": [[10.0, 157.9]], "isOverall": false, "label": "/5-home_default/today-is-a-good-day-framed-poster.jpg-24-Aggregated", "isController": false}, {"data": [[10.0, 1545.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-3.jpg-9", "isController": false}, {"data": [[10.0, 1545.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-3.jpg-9-Aggregated", "isController": false}, {"data": [[10.0, 152.9]], "isOverall": false, "label": "/8-home_default/mug-today-is-a-good-day.jpg-14", "isController": false}, {"data": [[10.0, 152.9]], "isOverall": false, "label": "/8-home_default/mug-today-is-a-good-day.jpg-14-Aggregated", "isController": false}, {"data": [[10.0, 194.6]], "isOverall": false, "label": "/themes/classic/assets/css/082a71677e756fb75817e8f262a07cb4.svg-26", "isController": false}, {"data": [[10.0, 194.6]], "isOverall": false, "label": "/themes/classic/assets/css/082a71677e756fb75817e8f262a07cb4.svg-26-Aggregated", "isController": false}, {"data": [[10.0, 537.15]], "isOverall": false, "label": "/en/-1", "isController": false}, {"data": [[10.0, 537.15]], "isOverall": false, "label": "/en/-1-Aggregated", "isController": false}, {"data": [[10.0, 150.70000000000002]], "isOverall": false, "label": "/modules/blockreassurance/img/ic_local_shipping_black_36dp_1x.png-24", "isController": false}, {"data": [[10.0, 150.70000000000002]], "isOverall": false, "label": "/modules/blockreassurance/img/ic_local_shipping_black_36dp_1x.png-24-Aggregated", "isController": false}, {"data": [[10.0, 149.10000000000002]], "isOverall": false, "label": "/14-home_default/hummingbird-cushion.jpg-48", "isController": false}, {"data": [[10.0, 149.10000000000002]], "isOverall": false, "label": "/14-home_default/hummingbird-cushion.jpg-48-Aggregated", "isController": false}, {"data": [[10.0, 158.7]], "isOverall": false, "label": "/modules/ps_imageslider/css/homeslider.css-10", "isController": false}, {"data": [[10.0, 158.7]], "isOverall": false, "label": "/modules/ps_imageslider/css/homeslider.css-10-Aggregated", "isController": false}, {"data": [[10.0, 209.89999999999998]], "isOverall": false, "label": "/5-home_default/today-is-a-good-day-framed-poster.jpg-5", "isController": false}, {"data": [[10.0, 209.89999999999998]], "isOverall": false, "label": "/5-home_default/today-is-a-good-day-framed-poster.jpg-5-Aggregated", "isController": false}, {"data": [[10.0, 144.8]], "isOverall": false, "label": "/modules/ps_searchbar/ps_searchbar.js-13", "isController": false}, {"data": [[10.0, 144.8]], "isOverall": false, "label": "/modules/ps_searchbar/ps_searchbar.js-13-Aggregated", "isController": false}, {"data": [[10.0, 147.2]], "isOverall": false, "label": "/themes/classic/assets/css/custom.css-7", "isController": false}, {"data": [[10.0, 147.2]], "isOverall": false, "label": "/themes/classic/assets/css/custom.css-7-Aggregated", "isController": false}, {"data": [[10.0, 665.2]], "isOverall": false, "label": "/en/order-51", "isController": false}, {"data": [[10.0, 665.2]], "isOverall": false, "label": "/en/order-51-Aggregated", "isController": false}, {"data": [[4.0, 432.0], [10.0, 238.8], [5.0, 313.0], [6.0, 431.5]], "isOverall": false, "label": "/submit/telemetry/0f5e4abd-963d-498d-b345-8b6ec4207cba/event/Firefox/82.0.3/release/20201108180448?v=4-63", "isController": false}, {"data": [[7.5, 323.40000000000003]], "isOverall": false, "label": "/submit/telemetry/0f5e4abd-963d-498d-b345-8b6ec4207cba/event/Firefox/82.0.3/release/20201108180448?v=4-63-Aggregated", "isController": false}, {"data": [[10.0, 160.4]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/jquery.ui.theme.min.css-2", "isController": false}, {"data": [[10.0, 160.4]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/jquery.ui.theme.min.css-2-Aggregated", "isController": false}, {"data": [[10.0, 152.70000000000002]], "isOverall": false, "label": "/3-home_default/the-best-is-yet-to-come-framed-poster.jpg-23", "isController": false}, {"data": [[10.0, 152.70000000000002]], "isOverall": false, "label": "/3-home_default/the-best-is-yet-to-come-framed-poster.jpg-23-Aggregated", "isController": false}, {"data": [[10.0, 153.89999999999998]], "isOverall": false, "label": "/2-small_default/hummingbird-printed-t-shirt.jpg-37", "isController": false}, {"data": [[10.0, 153.89999999999998]], "isOverall": false, "label": "/2-small_default/hummingbird-printed-t-shirt.jpg-37-Aggregated", "isController": false}, {"data": [[4.0, 738.5], [2.0, 661.0], [10.0, 724.75], [6.0, 665.5], [3.0, 428.0]], "isOverall": false, "label": "/submit/telemetry/44ba5925-461b-421c-a9f9-c327a447017c/main/Firefox/82.0.3/release/20201108180448?v=4-61", "isController": false}, {"data": [[6.499999999999999, 679.5999999999999]], "isOverall": false, "label": "/submit/telemetry/44ba5925-461b-421c-a9f9-c327a447017c/main/Firefox/82.0.3/release/20201108180448?v=4-61-Aggregated", "isController": false}, {"data": [[10.0, 147.29999999999998]], "isOverall": false, "label": "/themes/classic/assets/js/custom.js-9", "isController": false}, {"data": [[10.0, 147.29999999999998]], "isOverall": false, "label": "/themes/classic/assets/js/custom.js-9-Aggregated", "isController": false}, {"data": [[10.0, 150.9]], "isOverall": false, "label": "/8-home_default/mug-today-is-a-good-day.jpg-27", "isController": false}, {"data": [[10.0, 150.9]], "isOverall": false, "label": "/8-home_default/mug-today-is-a-good-day.jpg-27-Aggregated", "isController": false}, {"data": [[4.0, 270.5], [10.0, 256.0], [5.0, 302.0], [6.0, 230.0], [3.0, 249.0]], "isOverall": false, "label": "/submit/telemetry/7c5636f0-176f-4895-9cea-6bbeb04e7713/health/Firefox/82.0.3/release/20201108180448?v=4-62", "isController": false}, {"data": [[6.8, 257.59999999999997]], "isOverall": false, "label": "/submit/telemetry/7c5636f0-176f-4895-9cea-6bbeb04e7713/health/Firefox/82.0.3/release/20201108180448?v=4-62-Aggregated", "isController": false}, {"data": [[10.0, 170.5]], "isOverall": false, "label": "/themes/classic/assets/css/99db8adec61e4fcf5586e1afa549b432.svg-30", "isController": false}, {"data": [[10.0, 170.5]], "isOverall": false, "label": "/themes/classic/assets/css/99db8adec61e4fcf5586e1afa549b432.svg-30-Aggregated", "isController": false}, {"data": [[8.0, 659.0], [4.0, 346.0], [2.0, 640.0], [1.0, 663.0], [9.0, 673.0], [10.0, 719.0], [5.0, 613.0], [6.0, 734.0], [3.0, 703.0], [7.0, 707.0]], "isOverall": false, "label": "/submit/telemetry/0ab56bcc-adbf-4f72-b7e3-577889d38978/modules/Firefox/82.0.3/release/20201108180448?v=4-64", "isController": false}, {"data": [[5.5, 645.6999999999999]], "isOverall": false, "label": "/submit/telemetry/0ab56bcc-adbf-4f72-b7e3-577889d38978/modules/Firefox/82.0.3/release/20201108180448?v=4-64-Aggregated", "isController": false}, {"data": [[10.0, 191.4]], "isOverall": false, "label": "/img/m/1.jpg-23", "isController": false}, {"data": [[10.0, 191.4]], "isOverall": false, "label": "/img/m/1.jpg-23-Aggregated", "isController": false}, {"data": [[10.0, 209.79999999999998]], "isOverall": false, "label": "/themes/classic/assets/css/8b05d51ede908907d65695558974d86f.svg-27", "isController": false}, {"data": [[10.0, 209.79999999999998]], "isOverall": false, "label": "/themes/classic/assets/css/8b05d51ede908907d65695558974d86f.svg-27-Aggregated", "isController": false}, {"data": [[10.0, 173.7]], "isOverall": false, "label": "/themes/classic/assets/css/e049aeb07a2ae1627933e8e58d3886d2.svg-28", "isController": false}, {"data": [[10.0, 173.7]], "isOverall": false, "label": "/themes/classic/assets/css/e049aeb07a2ae1627933e8e58d3886d2.svg-28-Aggregated", "isController": false}, {"data": [[10.0, 939.4]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-1.jpg-16", "isController": false}, {"data": [[10.0, 939.4]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-1.jpg-16-Aggregated", "isController": false}, {"data": [[10.0, 160.6]], "isOverall": false, "label": "/img/logo.png-2", "isController": false}, {"data": [[10.0, 160.6]], "isOverall": false, "label": "/img/logo.png-2-Aggregated", "isController": false}, {"data": [[10.0, 280.9]], "isOverall": false, "label": "/js/jquery/ui/jquery-ui.min.js-14", "isController": false}, {"data": [[10.0, 280.9]], "isOverall": false, "label": "/js/jquery/ui/jquery-ui.min.js-14-Aggregated", "isController": false}, {"data": [[10.0, 896.75], [6.0, 831.5]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53", "isController": false}, {"data": [[9.2, 883.7]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-Aggregated", "isController": false}, {"data": [[4.0, 260.0], [9.0, 233.0], [10.0, 234.25], [5.0, 296.5], [6.0, 249.0]], "isOverall": false, "label": "/submit/telemetry/11692f32-fa2d-4e6e-8866-e9be92ef83b6/health/Firefox/82.0.3/release/20201108180448?v=4-65", "isController": false}, {"data": [[7.300000000000001, 253.2]], "isOverall": false, "label": "/submit/telemetry/11692f32-fa2d-4e6e-8866-e9be92ef83b6/health/Firefox/82.0.3/release/20201108180448?v=4-65-Aggregated", "isController": false}, {"data": [[10.0, 167.7]], "isOverall": false, "label": "/modules/ps_facetedsearch/views/dist/front.js-38", "isController": false}, {"data": [[10.0, 167.7]], "isOverall": false, "label": "/modules/ps_facetedsearch/views/dist/front.js-38-Aggregated", "isController": false}, {"data": [[10.0, 152.4]], "isOverall": false, "label": "/themes/classic/assets/js/custom.js-13", "isController": false}, {"data": [[10.0, 152.4]], "isOverall": false, "label": "/themes/classic/assets/js/custom.js-13-Aggregated", "isController": false}, {"data": [[10.0, 1582.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-3.jpg-21", "isController": false}, {"data": [[10.0, 1582.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-3.jpg-21-Aggregated", "isController": false}, {"data": [[10.0, 152.8]], "isOverall": false, "label": "/3-home_default/the-best-is-yet-to-come-framed-poster.jpg-10", "isController": false}, {"data": [[10.0, 152.8]], "isOverall": false, "label": "/3-home_default/the-best-is-yet-to-come-framed-poster.jpg-10-Aggregated", "isController": false}, {"data": [[10.0, 261.09999999999997]], "isOverall": false, "label": "/en/order-51-2", "isController": false}, {"data": [[10.0, 261.09999999999997]], "isOverall": false, "label": "/en/order-51-2-Aggregated", "isController": false}, {"data": [[10.0, 194.4]], "isOverall": false, "label": "/en/order-51-1", "isController": false}, {"data": [[10.0, 194.4]], "isOverall": false, "label": "/en/order-51-1-Aggregated", "isController": false}, {"data": [[10.0, 209.3]], "isOverall": false, "label": "/en/order-51-0", "isController": false}, {"data": [[10.0, 209.3]], "isOverall": false, "label": "/en/order-51-0-Aggregated", "isController": false}, {"data": [[10.0, 149.4]], "isOverall": false, "label": "/modules/ps_facetedsearch/views/dist/front.css-37", "isController": false}, {"data": [[10.0, 149.4]], "isOverall": false, "label": "/modules/ps_facetedsearch/views/dist/front.css-37-Aggregated", "isController": false}, {"data": [[10.0, 154.1]], "isOverall": false, "label": "/modules/blockreassurance/img/ic_swap_horiz_black_36dp_1x.png-25", "isController": false}, {"data": [[10.0, 154.1]], "isOverall": false, "label": "/modules/blockreassurance/img/ic_swap_horiz_black_36dp_1x.png-25-Aggregated", "isController": false}, {"data": [[10.0, 278.6]], "isOverall": false, "label": "/en/order-36-2", "isController": false}, {"data": [[10.0, 278.6]], "isOverall": false, "label": "/en/order-36-2-Aggregated", "isController": false}, {"data": [[10.0, 885.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-2.jpg-20", "isController": false}, {"data": [[10.0, 885.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-2.jpg-20-Aggregated", "isController": false}, {"data": [[10.0, 146.6]], "isOverall": false, "label": "/themes/classic/assets/css/ffddcb3736980b23405b31142a324b62.svg-29", "isController": false}, {"data": [[10.0, 146.6]], "isOverall": false, "label": "/themes/classic/assets/css/ffddcb3736980b23405b31142a324b62.svg-29-Aggregated", "isController": false}, {"data": [[10.0, 234.33333333333331], [6.0, 358.25]], "isOverall": false, "label": "/submit/telemetry/d85dd93e-37cb-4d6b-80bd-92960bff2ef9/health/Firefox/82.0.3/release/20201108180448?v=4-59", "isController": false}, {"data": [[8.399999999999999, 283.9]], "isOverall": false, "label": "/submit/telemetry/d85dd93e-37cb-4d6b-80bd-92960bff2ef9/health/Firefox/82.0.3/release/20201108180448?v=4-59-Aggregated", "isController": false}, {"data": [[10.0, 195.2]], "isOverall": false, "label": "/en/order-36-0", "isController": false}, {"data": [[10.0, 195.2]], "isOverall": false, "label": "/en/order-36-0-Aggregated", "isController": false}, {"data": [[10.0, 161.1]], "isOverall": false, "label": "/modules/blockreassurance/img/ic_verified_user_black_36dp_1x.png-22", "isController": false}, {"data": [[10.0, 161.1]], "isOverall": false, "label": "/modules/blockreassurance/img/ic_verified_user_black_36dp_1x.png-22-Aggregated", "isController": false}, {"data": [[10.0, 188.0]], "isOverall": false, "label": "/en/order-36-1", "isController": false}, {"data": [[10.0, 188.0]], "isOverall": false, "label": "/en/order-36-1-Aggregated", "isController": false}, {"data": [[10.0, 1190.8]], "isOverall": false, "label": "/modules/ps_banner/img/sale70.png-28", "isController": false}, {"data": [[10.0, 1190.8]], "isOverall": false, "label": "/modules/ps_banner/img/sale70.png-28-Aggregated", "isController": false}, {"data": [[10.0, 314.4]], "isOverall": false, "label": "/en/men/1-1-hummingbird-printed-t-shirt.html-20", "isController": false}, {"data": [[10.0, 314.4]], "isOverall": false, "label": "/en/men/1-1-hummingbird-printed-t-shirt.html-20-Aggregated", "isController": false}, {"data": [[10.0, 148.1]], "isOverall": false, "label": "/img/logo.png-17", "isController": false}, {"data": [[10.0, 148.1]], "isOverall": false, "label": "/img/logo.png-17-Aggregated", "isController": false}, {"data": [[10.0, 573.3000000000001]], "isOverall": false, "label": "/en/3-clothes-41", "isController": false}, {"data": [[10.0, 573.3000000000001]], "isOverall": false, "label": "/en/3-clothes-41-Aggregated", "isController": false}, {"data": [[10.0, 194.8]], "isOverall": false, "label": "/en/order?id_address=0-45-1", "isController": false}, {"data": [[10.0, 194.8]], "isOverall": false, "label": "/en/order?id_address=0-45-1-Aggregated", "isController": false}, {"data": [[10.0, 451.09999999999997]], "isOverall": false, "label": "/en/3-clothes-40", "isController": false}, {"data": [[10.0, 451.09999999999997]], "isOverall": false, "label": "/en/3-clothes-40-Aggregated", "isController": false}, {"data": [[10.0, 380.5]], "isOverall": false, "label": "/en/order?id_address=0-45-0", "isController": false}, {"data": [[10.0, 380.5]], "isOverall": false, "label": "/en/order?id_address=0-45-0-Aggregated", "isController": false}, {"data": [[10.0, 145.5]], "isOverall": false, "label": "/2-cart_default/hummingbird-printed-t-shirt.jpg-35", "isController": false}, {"data": [[10.0, 145.5]], "isOverall": false, "label": "/2-cart_default/hummingbird-printed-t-shirt.jpg-35-Aggregated", "isController": false}, {"data": [[9.0, 219.0], [10.0, 245.8], [5.0, 267.5], [6.0, 245.0]], "isOverall": false, "label": "/submit/telemetry/3d914e07-e1ed-416e-8f87-87ed47595331/health/Firefox/82.0.3/release/20201108180448?v=4-58", "isController": false}, {"data": [[8.1, 247.3]], "isOverall": false, "label": "/submit/telemetry/3d914e07-e1ed-416e-8f87-87ed47595331/health/Firefox/82.0.3/release/20201108180448?v=4-58-Aggregated", "isController": false}, {"data": [[10.0, 268.9]], "isOverall": false, "label": "/en/order?id_address=0-45-2", "isController": false}, {"data": [[10.0, 268.9]], "isOverall": false, "label": "/en/order?id_address=0-45-2-Aggregated", "isController": false}, {"data": [[10.0, 149.39999999999998]], "isOverall": false, "label": "/21-home_default/brown-bear-printed-sweater.jpg-19", "isController": false}, {"data": [[10.0, 149.39999999999998]], "isOverall": false, "label": "/21-home_default/brown-bear-printed-sweater.jpg-19-Aggregated", "isController": false}, {"data": [[4.0, 246.5], [10.0, 231.8], [6.0, 250.0]], "isOverall": false, "label": "/submit/telemetry/781aec33-5a41-4872-964e-94872f69d409/health/Firefox/82.0.3/release/20201108180448?v=4-60", "isController": false}, {"data": [[7.6, 240.2]], "isOverall": false, "label": "/submit/telemetry/781aec33-5a41-4872-964e-94872f69d409/health/Firefox/82.0.3/release/20201108180448?v=4-60-Aggregated", "isController": false}, {"data": [[10.0, 428.8]], "isOverall": false, "label": "/-34-1", "isController": false}, {"data": [[10.0, 428.8]], "isOverall": false, "label": "/-34-1-Aggregated", "isController": false}, {"data": [[10.0, 149.7]], "isOverall": false, "label": "/6-home_default/mug-the-best-is-yet-to-come.jpg-25", "isController": false}, {"data": [[10.0, 149.7]], "isOverall": false, "label": "/6-home_default/mug-the-best-is-yet-to-come.jpg-25-Aggregated", "isController": false}, {"data": [[10.0, 200.1]], "isOverall": false, "label": "/-34-0", "isController": false}, {"data": [[10.0, 200.1]], "isOverall": false, "label": "/-34-0-Aggregated", "isController": false}, {"data": [[10.0, 187.70000000000002]], "isOverall": false, "label": "/21-home_default/brown-bear-printed-sweater.jpg-6", "isController": false}, {"data": [[10.0, 187.70000000000002]], "isOverall": false, "label": "/21-home_default/brown-bear-printed-sweater.jpg-6-Aggregated", "isController": false}, {"data": [[10.0, 155.4]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/images/ui-bg_flat_75_ffffff_40x100.png-32", "isController": false}, {"data": [[10.0, 155.4]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/images/ui-bg_flat_75_ffffff_40x100.png-32-Aggregated", "isController": false}, {"data": [[10.0, 1017.4999999999999]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-2.jpg-7", "isController": false}, {"data": [[10.0, 1017.4999999999999]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-2.jpg-7-Aggregated", "isController": false}, {"data": [[9.0, 234.0], [10.0, 244.0], [6.0, 240.33333333333334]], "isOverall": false, "label": "/submit/telemetry/4caa950e-2003-4f14-b479-b157a3b7b1a4/health/Firefox/82.0.3/release/20201108180448?v=4-57", "isController": false}, {"data": [[8.7, 241.89999999999998]], "isOverall": false, "label": "/submit/telemetry/4caa950e-2003-4f14-b479-b157a3b7b1a4/health/Firefox/82.0.3/release/20201108180448?v=4-57-Aggregated", "isController": false}, {"data": [[10.0, 1204.7]], "isOverall": false, "label": "/modules/ps_banner/img/sale70.png-15", "isController": false}, {"data": [[10.0, 1204.7]], "isOverall": false, "label": "/modules/ps_banner/img/sale70.png-15-Aggregated", "isController": false}, {"data": [[10.0, 147.3]], "isOverall": false, "label": "/c/8-category_default/home-accessories.jpg-50", "isController": false}, {"data": [[10.0, 147.3]], "isOverall": false, "label": "/c/8-category_default/home-accessories.jpg-50-Aggregated", "isController": false}, {"data": [[10.0, 290.3]], "isOverall": false, "label": "/themes/classic/assets/css/570eb83859dc23dd0eec423a49e147fe.woff2-17", "isController": false}, {"data": [[10.0, 290.3]], "isOverall": false, "label": "/themes/classic/assets/css/570eb83859dc23dd0eec423a49e147fe.woff2-17-Aggregated", "isController": false}, {"data": [[10.0, 297.3]], "isOverall": false, "label": "/themes/core.js-6", "isController": false}, {"data": [[10.0, 297.3]], "isOverall": false, "label": "/themes/core.js-6-Aggregated", "isController": false}, {"data": [[10.0, 179.89999999999998]], "isOverall": false, "label": "/4-home_default/the-adventure-begins-framed-poster.jpg-22", "isController": false}, {"data": [[10.0, 179.89999999999998]], "isOverall": false, "label": "/4-home_default/the-adventure-begins-framed-poster.jpg-22-Aggregated", "isController": false}, {"data": [[10.0, 216.875], [6.0, 181.0]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-2", "isController": false}, {"data": [[9.2, 209.7]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-2-Aggregated", "isController": false}, {"data": [[10.0, 250.875], [6.0, 223.5]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-3", "isController": false}, {"data": [[9.2, 245.4]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-3-Aggregated", "isController": false}, {"data": [[10.0, 482.3]], "isOverall": false, "label": "/en/8-home-accessories-46", "isController": false}, {"data": [[10.0, 482.3]], "isOverall": false, "label": "/en/8-home-accessories-46-Aggregated", "isController": false}, {"data": [[10.0, 202.37499999999997], [6.0, 209.0]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-0", "isController": false}, {"data": [[9.2, 203.7]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-0-Aggregated", "isController": false}, {"data": [[10.0, 225.75], [6.0, 217.5]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-1", "isController": false}, {"data": [[9.2, 224.1]], "isOverall": false, "label": "/en/module/ps_checkpayment/validation-53-1-Aggregated", "isController": false}, {"data": [[10.0, 421.85714285714283], [6.0, 502.0]], "isOverall": false, "label": "/submit/telemetry/2c5aba75-7ef0-46e6-81a6-c1f29fc88318/event/Firefox/82.0.3/release/20201108180448?v=4-56", "isController": false}, {"data": [[8.799999999999999, 445.9]], "isOverall": false, "label": "/submit/telemetry/2c5aba75-7ef0-46e6-81a6-c1f29fc88318/event/Firefox/82.0.3/release/20201108180448?v=4-56-Aggregated", "isController": false}, {"data": [[10.0, 829.6]], "isOverall": false, "label": "/themes/classic/assets/css/19c1b868764c0e4d15a45d3f61250488.woff2-16", "isController": false}, {"data": [[10.0, 829.6]], "isOverall": false, "label": "/themes/classic/assets/css/19c1b868764c0e4d15a45d3f61250488.woff2-16-Aggregated", "isController": false}, {"data": [[10.0, 161.49999999999997]], "isOverall": false, "label": "/c/5-category_default/women.jpg-43", "isController": false}, {"data": [[10.0, 161.49999999999997]], "isOverall": false, "label": "/c/5-category_default/women.jpg-43-Aggregated", "isController": false}, {"data": [[10.0, 651.2]], "isOverall": false, "label": "/themes/classic/assets/css/199038f07312bfc6f0aabd3ed6a2b64d.woff2-29", "isController": false}, {"data": [[10.0, 651.2]], "isOverall": false, "label": "/themes/classic/assets/css/199038f07312bfc6f0aabd3ed6a2b64d.woff2-29-Aggregated", "isController": false}, {"data": [[10.0, 254.66666666666666], [5.0, 268.5], [6.0, 236.5]], "isOverall": false, "label": "/submit/telemetry/5a6c2505-eb12-4591-9ac2-980d170db91e/health/Firefox/82.0.3/release/20201108180448?v=4-55", "isController": false}, {"data": [[8.2, 253.8]], "isOverall": false, "label": "/submit/telemetry/5a6c2505-eb12-4591-9ac2-980d170db91e/health/Firefox/82.0.3/release/20201108180448?v=4-55-Aggregated", "isController": false}, {"data": [[10.0, 247.89999999999998]], "isOverall": false, "label": "/themes/classic/assets/js/theme.js-3", "isController": false}, {"data": [[10.0, 247.89999999999998]], "isOverall": false, "label": "/themes/classic/assets/js/theme.js-3-Aggregated", "isController": false}, {"data": [[10.0, 154.29999999999998]], "isOverall": false, "label": "/10-home_default/mountain-fox-cushion.jpg-47", "isController": false}, {"data": [[10.0, 154.29999999999998]], "isOverall": false, "label": "/10-home_default/mountain-fox-cushion.jpg-47-Aggregated", "isController": false}, {"data": [[10.0, 419.7]], "isOverall": false, "label": "/en/8-home-accessories-55", "isController": false}, {"data": [[10.0, 419.7]], "isOverall": false, "label": "/en/8-home-accessories-55-Aggregated", "isController": false}, {"data": [[10.0, 171.6]], "isOverall": false, "label": "/22-home_default/customizable-mug.jpg-51", "isController": false}, {"data": [[10.0, 171.6]], "isOverall": false, "label": "/22-home_default/customizable-mug.jpg-51-Aggregated", "isController": false}, {"data": [[10.0, 733.5]], "isOverall": false, "label": "/en/8-home-accessories-54", "isController": false}, {"data": [[10.0, 733.5]], "isOverall": false, "label": "/en/8-home-accessories-54-Aggregated", "isController": false}, {"data": [[10.0, 502.29999999999995]], "isOverall": false, "label": "/en/8-home-accessories-53", "isController": false}, {"data": [[10.0, 502.29999999999995]], "isOverall": false, "label": "/en/8-home-accessories-53-Aggregated", "isController": false}, {"data": [[10.0, 147.2]], "isOverall": false, "label": "/img/s/2.jpg-47", "isController": false}, {"data": [[10.0, 147.2]], "isOverall": false, "label": "/img/s/2.jpg-47-Aggregated", "isController": false}, {"data": [[10.0, 37.199999999999996]], "isOverall": false, "label": "/success.txt-50", "isController": false}, {"data": [[10.0, 37.199999999999996]], "isOverall": false, "label": "/success.txt-50-Aggregated", "isController": false}, {"data": [[10.0, 326.5]], "isOverall": false, "label": "/themes/classic/assets/css/theme.css-11", "isController": false}, {"data": [[10.0, 326.5]], "isOverall": false, "label": "/themes/classic/assets/css/theme.css-11-Aggregated", "isController": false}, {"data": [[10.0, 157.3]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/images/ui-bg_flat_75_ffffff_40x100.png-19", "isController": false}, {"data": [[10.0, 157.3]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/images/ui-bg_flat_75_ffffff_40x100.png-19-Aggregated", "isController": false}, {"data": [[10.0, 156.2]], "isOverall": false, "label": "/c/3-category_default/clothes.jpg-39", "isController": false}, {"data": [[10.0, 156.2]], "isOverall": false, "label": "/c/3-category_default/clothes.jpg-39-Aggregated", "isController": false}, {"data": [[10.0, 540.4]], "isOverall": false, "label": "/en/5-women-42", "isController": false}, {"data": [[10.0, 540.4]], "isOverall": false, "label": "/en/5-women-42-Aggregated", "isController": false}, {"data": [[10.0, 148.7]], "isOverall": false, "label": "/modules/ps_imageslider/js/homeslider.js-8", "isController": false}, {"data": [[10.0, 148.7]], "isOverall": false, "label": "/modules/ps_imageslider/js/homeslider.js-8-Aggregated", "isController": false}, {"data": [[10.0, 349.2]], "isOverall": false, "label": "/en/5-women-45", "isController": false}, {"data": [[10.0, 349.2]], "isOverall": false, "label": "/en/5-women-45-Aggregated", "isController": false}, {"data": [[10.0, 364.20000000000005]], "isOverall": false, "label": "/en/5-women-44", "isController": false}, {"data": [[10.0, 364.20000000000005]], "isOverall": false, "label": "/en/5-women-44-Aggregated", "isController": false}, {"data": [[10.0, 629.7]], "isOverall": false, "label": "/-34", "isController": false}, {"data": [[10.0, 629.7]], "isOverall": false, "label": "/-34-Aggregated", "isController": false}, {"data": [[10.0, 165.5]], "isOverall": false, "label": "/2-home_default/hummingbird-printed-t-shirt.jpg-4", "isController": false}, {"data": [[10.0, 165.5]], "isOverall": false, "label": "/2-home_default/hummingbird-printed-t-shirt.jpg-4-Aggregated", "isController": false}, {"data": [[10.0, 249.8]], "isOverall": false, "label": "/en/module/ps_shoppingcart/ajax-33", "isController": false}, {"data": [[10.0, 249.8]], "isOverall": false, "label": "/en/module/ps_shoppingcart/ajax-33-Aggregated", "isController": false}, {"data": [[10.0, 148.7]], "isOverall": false, "label": "/modules/ps_imageslider/js/responsiveslides.min.js-5", "isController": false}, {"data": [[10.0, 148.7]], "isOverall": false, "label": "/modules/ps_imageslider/js/responsiveslides.min.js-5-Aggregated", "isController": false}, {"data": [[10.0, 170.8]], "isOverall": false, "label": "/2-home_default/hummingbird-printed-t-shirt.jpg-18", "isController": false}, {"data": [[10.0, 170.8]], "isOverall": false, "label": "/2-home_default/hummingbird-printed-t-shirt.jpg-18-Aggregated", "isController": false}, {"data": [[10.0, 150.79999999999998]], "isOverall": false, "label": "/modules/ps_shoppingcart/ps_shoppingcart.js-12", "isController": false}, {"data": [[10.0, 150.79999999999998]], "isOverall": false, "label": "/modules/ps_shoppingcart/ps_shoppingcart.js-12-Aggregated", "isController": false}, {"data": [[10.0, 186.8]], "isOverall": false, "label": "/themes/classic/assets/css/570eb83859dc23dd0eec423a49e147fe.woff2-31", "isController": false}, {"data": [[10.0, 186.8]], "isOverall": false, "label": "/themes/classic/assets/css/570eb83859dc23dd0eec423a49e147fe.woff2-31-Aggregated", "isController": false}, {"data": [[10.0, 370.90000000000003]], "isOverall": false, "label": "/en/3-clothes-36", "isController": false}, {"data": [[10.0, 370.90000000000003]], "isOverall": false, "label": "/en/3-clothes-36-Aggregated", "isController": false}, {"data": [[10.0, 146.3]], "isOverall": false, "label": "/23-home_default/pack-mug-framed-poster.jpg-52", "isController": false}, {"data": [[10.0, 146.3]], "isOverall": false, "label": "/23-home_default/pack-mug-framed-poster.jpg-52-Aggregated", "isController": false}, {"data": [[10.0, 154.29999999999998]], "isOverall": false, "label": "/12-home_default/brown-bear-cushion.jpg-49", "isController": false}, {"data": [[10.0, 154.29999999999998]], "isOverall": false, "label": "/12-home_default/brown-bear-cushion.jpg-49-Aggregated", "isController": false}, {"data": [[10.0, 1193.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-1.jpg-3", "isController": false}, {"data": [[10.0, 1193.0]], "isOverall": false, "label": "/modules/ps_imageslider/images/sample-1.jpg-3-Aggregated", "isController": false}, {"data": [[10.0, 142.50000000000003]], "isOverall": false, "label": "/themes/classic/assets/css/b1db819132e64a3e01911a1413c33acf.svg-31", "isController": false}, {"data": [[10.0, 142.50000000000003]], "isOverall": false, "label": "/themes/classic/assets/css/b1db819132e64a3e01911a1413c33acf.svg-31-Aggregated", "isController": false}, {"data": [[10.0, 638.6]], "isOverall": false, "label": "/themes/classic/assets/css/7a3ebca0cba2e2c6090e84e1d77e0f94.woff2-38", "isController": false}, {"data": [[10.0, 638.6]], "isOverall": false, "label": "/themes/classic/assets/css/7a3ebca0cba2e2c6090e84e1d77e0f94.woff2-38-Aggregated", "isController": false}, {"data": [[10.0, 53.099999999999994]], "isOverall": false, "label": "/success.txt-40", "isController": false}, {"data": [[10.0, 53.099999999999994]], "isOverall": false, "label": "/success.txt-40-Aggregated", "isController": false}, {"data": [[10.0, 49.699999999999996]], "isOverall": false, "label": "/success.txt-41", "isController": false}, {"data": [[10.0, 49.699999999999996]], "isOverall": false, "label": "/success.txt-41-Aggregated", "isController": false}, {"data": [[10.0, 844.6999999999999]], "isOverall": false, "label": "/en/order?id_address=0-45", "isController": false}, {"data": [[10.0, 844.6999999999999]], "isOverall": false, "label": "/en/order?id_address=0-45-Aggregated", "isController": false}, {"data": [[10.0, 6250.7]], "isOverall": false, "label": "/-44", "isController": false}, {"data": [[10.0, 6250.7]], "isOverall": false, "label": "/-44-Aggregated", "isController": false}, {"data": [[10.0, 36.3]], "isOverall": false, "label": "/success.txt-48", "isController": false}, {"data": [[10.0, 36.3]], "isOverall": false, "label": "/success.txt-48-Aggregated", "isController": false}, {"data": [[10.0, 36.900000000000006]], "isOverall": false, "label": "/success.txt-49", "isController": false}, {"data": [[10.0, 36.900000000000006]], "isOverall": false, "label": "/success.txt-49-Aggregated", "isController": false}, {"data": [[10.0, 197.79999999999998]], "isOverall": false, "label": "/img/favicon.ico-33", "isController": false}, {"data": [[10.0, 197.79999999999998]], "isOverall": false, "label": "/img/favicon.ico-33-Aggregated", "isController": false}, {"data": [[10.0, 662.5]], "isOverall": false, "label": "/en/order-36", "isController": false}, {"data": [[10.0, 662.5]], "isOverall": false, "label": "/en/order-36-Aggregated", "isController": false}, {"data": [[10.0, 148.20000000000002]], "isOverall": false, "label": "/7-home_default/mug-the-adventure-begins.jpg-26", "isController": false}, {"data": [[10.0, 148.20000000000002]], "isOverall": false, "label": "/7-home_default/mug-the-adventure-begins.jpg-26-Aggregated", "isController": false}, {"data": [[10.0, 156.8]], "isOverall": false, "label": "/6-home_default/mug-the-best-is-yet-to-come.jpg-8", "isController": false}, {"data": [[10.0, 156.8]], "isOverall": false, "label": "/6-home_default/mug-the-best-is-yet-to-come.jpg-8-Aggregated", "isController": false}, {"data": [[10.0, 299.8]], "isOverall": false, "label": "/4-home_default/the-adventure-begins-framed-poster.jpg-11", "isController": false}, {"data": [[10.0, 299.8]], "isOverall": false, "label": "/4-home_default/the-adventure-begins-framed-poster.jpg-11-Aggregated", "isController": false}, {"data": [[10.0, 154.3]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/jquery-ui.min.css-4", "isController": false}, {"data": [[10.0, 154.3]], "isOverall": false, "label": "/js/jquery/ui/themes/base/minified/jquery-ui.min.css-4-Aggregated", "isController": false}, {"data": [[10.0, 501.40000000000003]], "isOverall": false, "label": "/en/8-home-accessories-56", "isController": false}, {"data": [[10.0, 501.40000000000003]], "isOverall": false, "label": "/en/8-home-accessories-56-Aggregated", "isController": false}, {"data": [[10.0, 487.09999999999997]], "isOverall": false, "label": "/en/order-42-0", "isController": false}, {"data": [[10.0, 487.09999999999997]], "isOverall": false, "label": "/en/order-42-0-Aggregated", "isController": false}, {"data": [[10.0, 192.29999999999998]], "isOverall": false, "label": "/modules/ps_emailsubscription/views/js/ps_emailsubscription.js-15", "isController": false}, {"data": [[10.0, 192.29999999999998]], "isOverall": false, "label": "/modules/ps_emailsubscription/views/js/ps_emailsubscription.js-15-Aggregated", "isController": false}, {"data": [[10.0, 184.10000000000002]], "isOverall": false, "label": "/en/order-42-1", "isController": false}, {"data": [[10.0, 184.10000000000002]], "isOverall": false, "label": "/en/order-42-1-Aggregated", "isController": false}, {"data": [[10.0, 237.39999999999998]], "isOverall": false, "label": "/en/order-42-2", "isController": false}, {"data": [[10.0, 237.39999999999998]], "isOverall": false, "label": "/en/order-42-2-Aggregated", "isController": false}, {"data": [[10.0, 81.7]], "isOverall": false, "label": "/success.txt-39", "isController": false}, {"data": [[10.0, 81.7]], "isOverall": false, "label": "/success.txt-39-Aggregated", "isController": false}, {"data": [[10.0, 748.9000000000001]], "isOverall": false, "label": "/themes/classic/assets/css/199038f07312bfc6f0aabd3ed6a2b64d.woff2-18", "isController": false}, {"data": [[10.0, 748.9000000000001]], "isOverall": false, "label": "/themes/classic/assets/css/199038f07312bfc6f0aabd3ed6a2b64d.woff2-18-Aggregated", "isController": false}, {"data": [[10.0, 642.6999999999999]], "isOverall": false, "label": "/themes/classic/assets/css/19c1b868764c0e4d15a45d3f61250488.woff2-30", "isController": false}, {"data": [[10.0, 642.6999999999999]], "isOverall": false, "label": "/themes/classic/assets/css/19c1b868764c0e4d15a45d3f61250488.woff2-30-Aggregated", "isController": false}, {"data": [[10.0, 153.79999999999998]], "isOverall": false, "label": "/7-home_default/mug-the-adventure-begins.jpg-12", "isController": false}, {"data": [[10.0, 153.79999999999998]], "isOverall": false, "label": "/7-home_default/mug-the-adventure-begins.jpg-12-Aggregated", "isController": false}, {"data": [[10.0, 202.4]], "isOverall": false, "label": "/en/cart-32", "isController": false}, {"data": [[10.0, 202.4]], "isOverall": false, "label": "/en/cart-32-Aggregated", "isController": false}, {"data": [[10.0, 244.60000000000002]], "isOverall": false, "label": "/en/cart-34", "isController": false}, {"data": [[10.0, 244.60000000000002]], "isOverall": false, "label": "/en/cart-34-Aggregated", "isController": false}, {"data": [[10.0, 213.1]], "isOverall": false, "label": "/2-large_default/hummingbird-printed-t-shirt.jpg-21", "isController": false}, {"data": [[10.0, 213.1]], "isOverall": false, "label": "/2-large_default/hummingbird-printed-t-shirt.jpg-21-Aggregated", "isController": false}, {"data": [[10.0, 909.5]], "isOverall": false, "label": "/en/order-42", "isController": false}, {"data": [[10.0, 909.5]], "isOverall": false, "label": "/en/order-42-Aggregated", "isController": false}, {"data": [[10.0, 0.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[10.0, 0.0]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 4411.383333333333, "minX": 1.6073796E12, "maxY": 637846.6666666666, "series": [{"data": [[1.6073796E12, 637846.6666666666], [1.60737966E12, 244171.65]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6073796E12, 4411.383333333333], [1.60737966E12, 14155.616666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.60737966E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

    }
};