<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:dialogVisible'],
  methods: {
    handleUpdateVisible(val) {
      this.$emit('update:dialogVisible', val)
    },
  },
}
</script>

<template>
  <el-dialog
    :visible="dialogVisible"
    title="提示"
    width="30%"
    append-to-body
    @update:visible="handleUpdateVisible"
  >
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleUpdateVisible(false)">取 消</el-button>
        <el-button type="primary" @click="handleUpdateVisible(false)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
