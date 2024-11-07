<!-- 这是地图组件 -->
<template>
  <div class="content">
    <div class="amap-wrapper">
      <!--
      amap-manager： 地图管理对象
      vid：地图容器节点的ID
      zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默
              认范围[3-19]，取值范围[3-19]
      center： 地图中心点坐标值
      plugin：地图使用的插件
      events： 事件
      -->
	  
	  <div>
		  
	  </div>
	  
      <el-amap ref="map" vid="amapDemo" class="amap-box" 
	  :zoom="zoom" :center="center" 
	  :events="events" :plugin="plugin">
        <!--  :map-style="mapStyle" -->
        <!-- 多边形 -->
        <el-amap-polygon
          v-for="(polygon, index) in polygons"
          :key="'polygons'+ index"
          :ref="`polygon_${index}`"
          :vid="index"
          :path="polygon.path"
          :draggable="polygon.draggable"
          stroke-style="dashed"
          stroke-color="#FF0000"
          stroke-weight="1"
          fill-opacity="0.5"
          fill-color="#FF0000"
          :events="polygon.events"
        />

        <!-- 圆形 -->
        <el-amap-circle
          v-for="(circle,index) in circles"
          :key="'circles'+index"
          :ref="`circle_${index}`"
          editable="true"
          :vid="index"
          :center="circle.center"
          :radius="circle.radius"
          fill-opacity="0.5"
          fill-color="#FF0000"
          stroke-style="dashed"
          stroke-color="#FF0000"
          stroke-weight="1"
          :events="circle.events"
        />
        <!-- <el-amap-polyline :editable="polyline.editable" :path="polyline.path" :events="polyline.events" /> -->

        <!-- 点标记在地图上显示的位置，默认为地图中心点， -->
        <el-amap-marker
          :position="marker.position"
          :events="marker.events"
          :visible="marker.visible"
          :label="marker.label"
          :icon="marker.icon"
        />
      </el-amap>
    </div>

    <div style="width: 190px;position: absolute; top: 20px;left:20px">
      <el-card class="box-card">
        <el-table :data="circles" border size="mini" style="width: 100%" height="150px">
          <el-table-column align="center" label="圆形围栏">
            <template slot-scope="scope">
              <div v-if="scope.row.isEdit">{{ scope.row.areaName }}</div>
              <div v-else>
                <el-input v-model="scope.row.areaName " />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="85">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editCircle(scope.$index)">{{ scope.row.isEdit?'编辑':"结束" }}</el-button>
              <!-- <el-button type="text" size="small" @click="finishCircle(scope.$index)">结束</el-button> -->
              <el-button type="text" size="small" @click="delCircle(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div style="width: 190px;position: absolute; top: 260px;left:20px">
      <el-card class="box-card">
        <el-table :data="polygons" border size="mini" style="width: 100%" height="150px">
          <el-table-column align="center" label="多边形围栏">
            <template slot-scope="scope">
              <div v-if="scope.row.isEdit">{{ scope.row.areaName }}</div>
              <div v-else>
                <el-input v-model="scope.row.areaName " />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="85">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editPolygon(scope.$index)">{{ scope.row.isEdit?'编辑':"结束" }}</el-button>
              <!-- <el-button type="text" size="small" @click="finishPolygon(scope.$index)">结束</el-button> -->
              <el-button type="text" size="small" @click="delPolygon(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <div class="imgBg" style="margin-top:10px;position: absolute;top: 10px;right: 20px;z-index: 999999999;">
      <div>
        <!-- 多边形 -->
        <img src="@/assets/map/ploybg.png" 
		style="width:30px;height:30px;cursor: pointer;" 
		@click="addArea" />
      </div>
      <div>
        <!-- 圆形 -->
        <img src="@/assets/map/circlebg.png" 
		style="width:30px;height:30px;cursor: pointer;" @click="addCirle" />
      </div>
      <!-- <el-button type="primary" >添加多边形</el-button>
      <el-button type="primary" >添加圆形</el-button>-->
    </div>
  </div>
</template>
<script>
	
import { AMapManager } from 'vue-amap'
export default {
  props: {
    path: {
      type: Array,
      default: () => {
        return []
      }
    },
    name: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      center: [116.41, 39.92], // 地图中心点坐标
      marker: {
        // 标点的图标
        icon: require('@/assets/map/position.png'),
        draggable: true,
        //   position: [118.054927, 36.813487], //坐标
        position: [116.41, 39.92], // 坐标
        label: { content: '标记点', offset: [-15, -40] },
        events: {
          click: e => {
            console.log('点击maker', e)
            this.marker = null
          },
          // 点标记拖拽移动结束触发事件
          dragend: e => {
            console.log('---event---: dragend', e)
            this.marker.position = [e.lnglat.lng, e.lnglat.lat]
          }
        }
      },
      // mapStyle: 'amap://styles/8b6be8ec497009e17a708205348b899a', // 设置地图样式
      isEdit: false,
      pIdx: 0,
      zoom: 17,
      events: {
        init: o => {},
        click: e => {
          // const { lng, lat } = e.lnglat
          // if (_this.isDraw) {
          //   const arr = [e.lnglat.lng, e.lnglat.lat]
          //   _this.polygons[_this.pIdx].path.push(arr)
          // }
        }
      },
      // 多边形
      polygons: [],
      // 圆形
      circles: [],
      polygonEditor: [],
      circleEditor: [],
      isDraw: false,
      plugin: [
        {
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          //   timeout: 100, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: 'RB', // 定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: 'all',
          pName: 'Geolocation'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    // 清除数据
    clearAllMap() {
      this.polygons = []
      // 圆形
      this.circles = []
      this.polygonEditor = []
      this.circleEditor = []
      if (this.$refs.map.$$getInstance()) {
        // 移除覆盖物
        this.$refs.map.$$getInstance().remove(['circle', 'polygon'])
      }
      this.center = [116.41, 39.92] // 地图中心点坐标
      this.marker.position = [116.41, 39.92] // 标点坐标
    },
    // 用于外部调用，改变标点的
    changeLocation(location, formattedAddress) {
      this.center = [location.split(',')[0], location.split(',')[1]]
      this.marker.position = [location.split(',')[0], location.split(',')[1]]
      // this.marker.label = {
      //   content: formattedAddress,
      //   offset: [-50, -40]
      // }
      console.log(this.marker)
    },
    //  编辑多边形
    editPolygon(index) {
      if (this.polygons[index].isEdit) {
        setTimeout(() => {
          this.polygons[index].draggable = true
          const vm = this
          const map = vm.$refs.map.$$getInstance()
          const polygon = vm.$refs['polygon_' + index][0].$$getInstance()
          // 缩放地图到合适的视野级别
          map.setFitView([polygon])
          // 构造圆形编辑对象，并开启圆形的编辑状态
          const polygonEditor = new AMap.PolyEditor(map, polygon)

          const res = this.polygonEditor.filter(item => item.num === index)
          // 说明没有，那就添加
          if (res.length === 0) {
            this.polygonEditor.push({
              num: index,
              obj: polygonEditor
            })
          } else {
            // 替换
            this.polygonEditor[index] = {
              num: index,
              obj: polygonEditor
            }
          }
          // console.log(this.polygonEditor)

          polygonEditor.open()
          this.polygons[index].isEdit = false
        }, 200)
      } else {
        this.finishPolygon(index)
        this.polygons[index].isEdit = true
      }
    },
    // 结束编辑多边形
    finishPolygon(index) {
      this.polygons[index].draggable = false
      // 结束编辑多边形的时候赋值
      // console.log(this.$refs['polygon_' + index][0].$$getPath())
      this.polygons[index].path = this.$refs['polygon_' + index][0].$$getPath()
		console.log("便捷式",this.polygons);
      this.polygonEditor.map(o => {
        if (o.num === index) {
          o.obj.close()
        }
      })
    },
    // 删除多边形
    delPolygon(index) {
      this.$confirm('此操作将删除该围栏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 结束编辑
        this.finishPolygon(index)
        // 删除
        this.polygons.splice(index, 1)
        this.polygonEditor.map((item, index1) => {
          if (item.num === index) {
            this.polygonEditor.splice(index1, 1)
          }
        })
      })
    },

    // 编辑圆形
    editCircle(index) {
      if (this.circles[index].isEdit) {
        // 去除样式
        const vm = this
        const map = vm.$refs.map.$$getInstance()
        // 编辑选中的圆形
        setTimeout(() => {
          const circle = vm.$refs['circle_' + index][0].$$getInstance()
          // 缩放地图到合适的视野级别
          map.setFitView([circle])
          // 构造圆形编辑对象，并开启圆形的编辑状态
          const circleEditor = new AMap.CircleEditor(map, circle)
          if (this.circleEditor.length === 0) {
            this.circleEditor.push({
              num: index,
              obj: circleEditor
            })
          }
          const res = this.circleEditor.filter(item => item.num === index)
          // 说明没有，那就添加
          if (res.length === 0) {
            this.circleEditor.push({
              num: index,
              obj: circleEditor
            })
          } else {
            // 替换
            this.circleEditor[index] = {
              num: index,
              obj: circleEditor
            }
          }
          console.log(this.circleEditor)

          circleEditor.on('move', event => {
            // 实时修改圆的中心坐标
            this.circles[index].center = [event.lnglat.lng, event.lnglat.lat]
            console.log('触发事件：move')
          })

          circleEditor.on('adjust', event => {
            // 实时修改圆的半径
            this.circles[index].radius = event.radius
            console.log('触发事件：adjust')
          })

          circleEditor.on('end', event => {
            console.log('触发事件： end')
            // event.target 即为编辑后的圆形对象
          })
          this.circles[index].isEdit = false
          // vm.polygonEditor = polygonEditor
          circleEditor.open()
          // console.log(this.circles)
        }, 200)
      } else {
        this.finishCircle(index)
        this.circles[index].isEdit = true
      }
    },
    // 结束编辑圆形
    finishCircle(index) {
      this.circleEditor.map(o => {
        if (o.num === index) {
          o.obj.close()
        }
      })
    },
    // 删除圆形
    delCircle(index) {
      this.$confirm('此操作将删除该围栏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 结束编辑
        this.finishCircle(index)
        // 删除
        this.circles.splice(index, 1)
        this.circleEditor.map((item, index1) => {
          if (item.num === index) {
            this.circleEditor.splice(index1, 1)
          }
        })
      })
    },
    // 添加圆形
    addCirle() {
      // 默认添加一个圆形的电子围栏
	  
      const obj = {
        center: this.marker.position,
        radius: 100,
        isEdit: true,
        areaName: '默认围栏',
        events: {
          click: () => {
            console.log('圆形')
          }
        }
      }
	  
	  console.log("添加圆形",obj,this.marker.position);
      this.circles.push(obj)
    },
    // 添加多边形区域
    addArea() {
      // 默认添加一个多边形的电子围栏
      const initDate = this.marker.position
	  console.log("添加多边形",initDate);
      const obj = {
        path: [
          [initDate[0], initDate[1]],
          [initDate[0] - 0.001, initDate[1]],
          [initDate[0] - 0.001, initDate[1] - 0.001],
          [initDate[0], initDate[1] - 0.001]
        ],
        draggable: false,
        areaName: '默认围栏',
        isEdit: true,
        events: {
          click(e) {
            //  _this.clickEdit(_this, this)
          }
        }
      }
      this.polygons.push(obj)
    }
    // 获取地图上的覆盖物
    // getAllOverlays() {
    //   const vm = this
    //   const map = vm.$refs.map.$$getInstance()
    //   console.log(map.getAllOverlays('circle'))
    //   console.log(map.getAllOverlays('polygon'))
    // }
  }
}
</script>
<style scoped lang="scss">
.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}
.amap-wrapper {
  width: 100%;
  height: 550px;
  position: relative;
}

/* 图标大小修改 */
.amap-wrapper ::v-deep .amap-icon img {
  max-width: 2rem !important;
  max-height: 2rem !important;
}

// .amap-wrapper ::v-deep .amap-marker-label {
//   width: 65px !important;
//   text-align: center !important;
//   overflow: hidden !important;
//   text-overflow: ellipsis !important;
//   white-space: nowrap !important;
// }

.amap-wrapper ::v-deep .amap-marker-label {
  position: absolute;
  z-index: 2;
  border: 1px solid #1890ff;
  background-color: white;
  white-space: nowrap;
  cursor: default;
  padding: 8px;
  font-size: 10px;
  line-height: 12px;
  border-radius: 16px;
}

.box-card ::v-deep .el-card__body {
  padding: 10px;
}

.box-card ::v-deep .el-table .el-table__header-wrapper th,
.el-table .el-table__fixed-header-wrapper th {
  line-height: 8px !important;
}
</style>
