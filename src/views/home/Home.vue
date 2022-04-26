<template lang="pug">
.head
.content
  .column 左盒子
  .column
    .map
      .map-item(v-for="(item, index) in 4" :key="index" :class="{chart: index === 3}")
  .column 右盒子
</template>

<script setup>
import { getCurrentInstance, onMounted } from "vue";
import { chinaMap } from "common/chinaMap.js";
import { geoCoordMap } from "common/geoCoordMap.js";
import { XXData, JJData, XJData } from "common/activeData.js"
let { proxy } = getCurrentInstance();
let planePath = $ref('path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705');
let color = $ref(['#3ed4ff', '#ffa022', '#a6c84c'])
onMounted(() => {
  let myChart = proxy.$echarts.init(document.querySelector(".map .chart"));

  proxy.$echarts.registerMap("chinaMap", chinaMap);

  let convertData = function (data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i];
      let fromCoord = geoCoordMap[dataItem[0].name];
      let toCoord = geoCoordMap[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push([{
          coord: fromCoord
        }, {
          coord: toCoord
        }]);
      }
    }
    return res;
  };

  let series = []
  let aData = [
    ['新乡', XXData],
    ['九江', JJData],
    ['新疆', XJData]
  ]

  aData.forEach((item, i) => {
    series.push(
      {
        name: item[0] + ' Top10',
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: '#fff',
          symbolSize: 3
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 0,
            curveness: 0.2
          }
        },
        data: convertData(item[1])
      },
      {
        name: item[0] + ' Top10',
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 15
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 1,
            opacity: 0.4,
            curveness: 0.2
          }
        },
        data: convertData(item[1])
      },
      {
        name: item[0] + ' Top10',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}'
          }
        },
        symbolSize: function (val) {
          return val[2] / 8;
        },
        itemStyle: {
          normal: {
            color: color[i]
          }
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
          };
        })
    })
  })

  let option = {
    backgroundColor: "rgba(0, 0, 0, .5)", // 背景色，默认无背景
    color: [], // 调色盘颜色列表
    title: {}, // 标题组件，包含主标题和副标题
    legend: {}, // 图例组件
    tooltip: {}, // 提示框组件
    geo: {
      show: true, // 是否显示地理坐标系组件
      map: "chinaMap", // 注册的地图名称
      roam: true, // 是否开启鼠标缩放和平移漫游，可选值'scale' 或者 'move'
      selectedMode: "single", // 选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
      // zoom: 1.2, // 缩放地图比例
      label: {}, // 图形上的文本标签
      itemStyle: {
        areaColor: "rgba(20, 41, 87,0.6)", // 地图区域的颜色
        borderColor: "#195BB9", // 图形的描边颜色
      }, // 地图区域的多边形图形样式
      emphasis: {
        // disabled: true, // 否关闭高亮状态
        // focus: 'self', // 在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果
        label: {}, // 高亮状态下的文本标签
        itemStyle: {
          areaColor: "#2B91B7",
        }, // 高亮状态下地图区域的多边形图形样式
      }, // 高亮状态下的多边形和标签样式
      select: {}, // 选中状态下的多边形和标签样式
      blur: {}, // 淡出状态下的多边形和标签样式
    },
    series: series,
    // series: {
    //   type: "effectScatter",
    //   coordinateSystem: "geo", // 使用的坐标系'cartesian2d'使用二维的直角坐,'polar'使用极坐标系标系,'geo'使用地理坐标系
    //   rippleEffect: {
    //     color: "#f00", // 涟漪的颜色，默认为散点的颜色。
    //     number: 3, // 波纹的数量
    //     period: 4, // 动画的周期，秒数
    //     scale: 2.5, // 动画中波纹的最大缩放比例
    //     brushType: "fill", // 波纹的绘制方式可选 'stroke' 和 'fill'
    //   }, // 涟漪特效相关配置
    //   symbol: "circle", // 标记的图形(string Function) 可选值'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none', 也可以通过 'image://url' 设置为图片，也可以通过 'path://'设置为svg
    //   symbolSize: 10, // 标记的大小(number Array Function)
    //   label: {},
    // }, // 配置带有涟漪特效动画的散点（气泡）图
  };
  option && myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
});
</script>

<style lang="stylus" scoped>
.head
  width 100%
  height .5208rem
  line-height .5208rem
  text-align center
  font-size .2083rem
  color #fff
  background url(../../assets/images/logo.png) no-repeat top center
  background-size 100%, 100%
.content
  display flex
  margin .0521rem auto
  .column
    flex 3
    &:nth-child(1), &:nth-child(3)
      background-color #f00
    &:nth-child(2)
      flex 5
      .map
        position relative
        height 4.2188rem
        .map-item
          &:nth-child(1)
            width 2.7083rem
            height 2.7083rem
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            background url(../../assets/images/map.png)
            background-size 100% 100%
            opacity 0.3
          &:nth-child(2)
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 3.1rem
            height 3.1rem
            background url(../../assets/images/lbx.png)
            animation rotate1 15s linear infinite
            opacity 0.6
            background-size 100% 100%
          &:nth-child(3)
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 2.9479rem
            height 2.9479rem
            background url(../../assets/images/jt.png)
            animation rotate2 10s linear infinite
            opacity 0.6
            background-size 100% 100%
.chart
  position absolute
  top 0
  left 0
  width 100%
  height 4.2188rem
@keyframes rotate1
  form
    transform translate(-50%, -50%) rotate(0deg)
  to
    transform translate(-50%, -50%) rotate(360deg)
@keyframes rotate2
  form
    transform translate(-50%, -50%) rotate(0deg)
  to
    transform translate(-50%, -50%) rotate(-360deg)
</style>
