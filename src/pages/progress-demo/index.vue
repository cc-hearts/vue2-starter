<script>
import { ProgressLoader } from '@/components'

export default {
  name: 'SimpleTest',
  components: {
    ProgressLoader
  },
  data() {
    return {
      status: 'pending',
      uniqueId: 1,
      lastEvent: '等待测试...',
      successStartTime: null,
      timingResults: []
    }
  },
  methods: {
    startPending() {
      this.status = 'pending'
      this.lastEvent = '开始 Pending 测试'
      this.successStartTime = null
      console.log('Starting pending test')
    },

    setSuccess() {
      this.successStartTime = Date.now()
      this.status = 'success'
      this.lastEvent = `切换到 Success (开始时间: ${new Date(this.successStartTime).toLocaleTimeString()})`
      console.log('Switching to success at:', this.successStartTime)
    },

    setFail() {
      this.status = 'fail'
      this.lastEvent = '切换到 Fail'
      this.successStartTime = null
      console.log('Switching to fail')
    },

    changeId() {
      this.uniqueId = this.uniqueId + 1
      this.lastEvent = `ID 更改为 ${this.uniqueId}`
      this.successStartTime = null
      console.log('Changed ID to:', this.uniqueId)
    },

    onComplete(event) {
      const completeTime = Date.now()
      let timingInfo = ''

      if (this.successStartTime && event.status === 'success') {
        const duration = completeTime - this.successStartTime
        timingInfo = ` (耗时: ${duration}ms = ${(duration/1000).toFixed(2)}秒)`

        // 记录时间测量结果
        this.timingResults.unshift({
          startTime: new Date(this.successStartTime).toLocaleTimeString(),
          endTime: new Date(completeTime).toLocaleTimeString(),
          duration: duration,
          durationSeconds: (duration/1000).toFixed(2)
        })

        // 只保留最近5次记录
        if (this.timingResults.length > 5) {
          this.timingResults = this.timingResults.slice(0, 5)
        }

        console.log(`Success progress completed in ${duration}ms (${(duration/1000).toFixed(2)}s)`)
      }

      this.lastEvent = `完成: ${event.status}, ID: ${event.uniqueId}${timingInfo}`
      console.log('Progress completed:', event)
    },

    clearTimingResults() {
      this.timingResults = []
      this.lastEvent = '时间记录已清空'
    }
  }
}
</script>

<template>
  <div class="simple-test">
    <h2>进度条简单测试</h2>

    <div class="controls">
      <el-button @click="startPending" type="primary">开始 Pending 测试</el-button>
      <el-button @click="setSuccess" type="success">切换到 Success</el-button>
      <el-button @click="setFail" type="danger">切换到 Fail</el-button>
      <el-button @click="changeId" type="info">更改 ID</el-button>
      <el-button @click="clearTimingResults" type="warning" size="small">清空时间记录</el-button>
    </div>

    <div class="status">
      <p>状态: {{ status }}</p>
      <p>ID: {{ uniqueId }}</p>
      <p>事件: {{ lastEvent }}</p>
    </div>

    <div v-if="timingResults.length > 0" class="timing-results">
      <h4>时间测量结果 (Success到Complete的时间差)</h4>
      <div class="timing-table">
        <div class="timing-header">
          <span>开始时间</span>
          <span>结束时间</span>
          <span>耗时(ms)</span>
          <span>耗时(秒)</span>
        </div>
        <div v-for="(result, index) in timingResults" :key="index" class="timing-row">
          <span>{{ result.startTime }}</span>
          <span>{{ result.endTime }}</span>
          <span>{{ result.duration }}</span>
          <span>{{ result.durationSeconds }}s</span>
        </div>
      </div>
      <p class="timing-note">
        <strong>预期时间:</strong> 约6秒 (5秒进度条动画 + 1秒等待时间)
      </p>
    </div>

    <div class="test-container">
      <h3>测试区域</h3>
      <p>这里会显示进度条</p>

      <ProgressLoader
        :status="status"
        :unique-id="uniqueId"
        @progressComplete="onComplete"
      />
    </div>
  </div>
</template>

<style scoped>
.simple-test {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.controls {
  margin: 20px 0;
}

.controls .el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.status {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
}

.status p {
  margin: 5px 0;
  font-family: monospace;
}

.test-container {
  position: relative;
  background: white;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  padding: 20px;
  min-height: 200px;
}

.test-container h3 {
  margin: 0 0 10px 0;
}

.timing-results {
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.timing-results h4 {
  margin: 0 0 15px 0;
  color: #0369a1;
}

.timing-table {
  background: white;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.timing-header {
  display: grid;
  grid-template-columns: 1fr 1fr 100px 80px;
  background: #f9fafb;
  font-weight: bold;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.timing-row {
  display: grid;
  grid-template-columns: 1fr 1fr 100px 80px;
  padding: 10px 12px;
  border-bottom: 1px solid #f3f4f6;
}

.timing-row:last-child {
  border-bottom: none;
}

.timing-row:nth-child(even) {
  background: #f9fafb;
}

.timing-note {
  margin: 15px 0 0 0;
  padding: 10px;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 4px;
  font-size: 14px;
}
</style>