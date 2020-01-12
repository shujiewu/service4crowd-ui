<template>
  <div>
    <el-table height="600" size='mini' ref="metaTable" :data="metaData" tooltip-effect="dark"
              style="white-space: nowrap;"
              highlight-current-row
              stripe
              @current-change="handleCurrentMetaChange">
      <el-table-column :label="$t('table.name')">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('table.createTime')">
        <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')">
        <template slot-scope="scope">
          <i style="cursor : pointer" class="el-icon-delete" @click="handleDeleteMeta(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <div class="block">
        <el-pagination
          @current-change="handleMetaPageChange"
          :current-page.sync="customListQuery.page"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="metaListTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { parseTime } from '@/utils'
  import { getCustomDataList } from '@/api/data/customData'
  export default {
    name: 'custom-data',
    created() {
      this.getCustomDataList()
    },
    data() {
      return {
        customListQuery: {
          page: 1,
          limit: 10
        },
        metaListTotal: 0,
        currentMeta: null,
        metaData: []
      }
    },
    filters: {
      parseTime(time, cFormat) {
        return parseTime(time, cFormat)
      }
    },
    methods: {
      handleCurrentMetaChange(val) {
        this.currentMeta = val
        console.log(this.currentMeta)
        this.$emit('currentSelectionChange', this.currentMeta)
      },
      getCustomDataList() {
        getCustomDataList(this.customListQuery).then(response => {
          if (response.status === 200) {
            this.metaData = response.data.rows
            this.metaListTotal = response.data.total
          }
        })
      },
      handleMetaPageChange(val) {
        // 当前页改变
        this.customListQuery.page = val
        this.getCustomDataList()
      }
    }
  }
</script>

<style scoped>

</style>
