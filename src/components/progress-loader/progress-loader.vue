<script>
export default {
  name: 'ProgressLoader',
  props: {
    status: {
      type: String,
      required: true,
      validator: (value) => ['success', 'fail', 'pending'].includes(value)
    },
    uniqueId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentProgress: 0,
      visible: true,
      pendingTimer: null,
      successTimer: null,
      lastUniqueId: null
    }
  },
  computed: {
    progressStatus() {
      if (this.status === 'success' && this.currentProgress === 100) {
        return 'success'
      }
      if (this.status === 'fail') {
        return 'exception'
      }
      return null
    },
    statusText() {
      switch (this.status) {
        case 'pending':
          return '加载中...'
        case 'success':
          return this.currentProgress === 100 ? '加载完成' : '即将完成...'
        case 'fail':
          return '加载失败'
        default:
          return ''
      }
    }
  },
  watch: {
    status: {
      handler(newStatus, oldStatus) {
        console.log('Status changed from', oldStatus, 'to', newStatus)
        this.handleStatusChange(newStatus, oldStatus)
      },
      immediate: true
    },
    uniqueId: {
      handler(newId, oldId) {
        console.log('UniqueId changed from', oldId, 'to', newId)
        if (oldId !== null && newId !== oldId) {
          console.log('Resetting progress due to ID change')
          this.resetProgress()
          // 重置后，如果当前状态是 pending，需要重新开始
          if (this.status === 'pending') {
            this.$nextTick(() => {
              this.startPendingProgress()
            })
          }
        }
        this.lastUniqueId = newId
      },
      immediate: true
    }
  },
  beforeUnmount() {
    this.clearTimers()
  },
  mounted() {
    console.log('ProgressLoader mounted with status:', this.status, 'uniqueId:', this.uniqueId)
  },
  methods: {
    handleStatusChange(newStatus, oldStatus) {
      this.clearTimers()

      switch (newStatus) {
        case 'pending':
          this.visible = true
          this.startPendingProgress()
          break
        case 'success':
          this.visible = true
          this.startSuccessProgress()
          break
        case 'fail':
          this.visible = false
          this.$emit('progressComplete', { status: 'fail', uniqueId: this.uniqueId })
          break
      }
    },

    startPendingProgress() {
      console.log('startPendingProgress called, currentProgress:', this.currentProgress, 'status:', this.status)

      // 清除之前的定时器
      this.clearTimers()

      // 立即显示初始进度
      if (this.currentProgress === 0) {
        const initialIncrement = Math.floor(Math.random() * 10) + 1
        this.currentProgress = Math.min(initialIncrement, 90)
        console.log('Set initial progress to:', this.currentProgress)
      }

      const updateProgress = () => {
        console.log('updateProgress called, status:', this.status, 'currentProgress:', this.currentProgress)
        if (this.status === 'pending' && this.currentProgress < 90) {
          // 随机增加 1-10 的进度
          const increment = Math.floor(Math.random() * 10) + 1
          const oldProgress = this.currentProgress
          this.currentProgress = Math.min(this.currentProgress + increment, 90)
          console.log('Progress updated from', oldProgress, 'to', this.currentProgress, 'increment:', increment)

          // 如果还没达到90%，继续设置下一次更新
          if (this.currentProgress < 90) {
            this.pendingTimer = setTimeout(updateProgress, 1000 * 10) // 每10秒更新一次
            console.log('Next update scheduled in 10 seconds')
          } else {
            console.log('Reached 90%, stopping pending updates')
          }
        } else {
          console.log('updateProgress stopped, status:', this.status, 'progress:', this.currentProgress)
        }
      }

      // 立即开始第一次更新，然后每10秒更新一次
      if (this.currentProgress < 90 && this.status === 'pending') {
        // 立即执行第一次更新
        this.pendingTimer = setTimeout(updateProgress, 100) // 100ms后开始第一次更新，让用户看到变化
        console.log('First update scheduled in 100ms')
      } else {
        console.log('Not starting pending updates, progress:', this.currentProgress, 'status:', this.status)
      }
    },

    startSuccessProgress() {
      console.log('startSuccessProgress called, currentProgress:', this.currentProgress, 'status:', this.status)

      // 清除之前的定时器
      this.clearTimers()

      // 如果已经是100%，等待1秒后直接触发完成事件
      if (this.currentProgress >= 100) {
        this.currentProgress = 100
        this.successTimer = setTimeout(() => {
          if (this.status === 'success') { // 确保状态没有改变
            this.$emit('progressComplete', { status: 'success', uniqueId: this.uniqueId })
            console.log('Progress complete event emitted (already 100%)')
          }
        }, 1000)
        return
      }

      // 如果进度为0，先设置一个小的初始值
      if (this.currentProgress === 0) {
        this.currentProgress = 1
      }

      const startProgress = this.currentProgress
      const remainingProgress = 100 - startProgress
      const duration = 3000 // 3秒内完成
      const updateInterval = 50 // 每50ms更新一次，更平滑
      const steps = duration / updateInterval // 总步数
      const incrementPerStep = remainingProgress / steps

      console.log(`Success progress: from ${startProgress}% to 100% in ${duration}ms`)
      console.log(`Steps: ${steps}, increment per step: ${incrementPerStep}`)

      let step = 0
      const updateProgress = () => {
        if (step < steps && this.status === 'success') {
          step++
          const newProgress = startProgress + (incrementPerStep * step)
          this.currentProgress = Math.min(newProgress, 100)

          console.log(`Step ${step}/${steps}, progress: ${this.currentProgress.toFixed(1)}%`)

          if (this.currentProgress >= 100) {
            this.currentProgress = 100
            console.log('Reached 100%, waiting 1 second before emitting complete event')
            // 到达100%后，等待1秒再发送完成事件
            this.successTimer = setTimeout(() => {
              if (this.status === 'success') { // 确保状态没有改变
                this.$emit('progressComplete', { status: 'success', uniqueId: this.uniqueId })
                console.log('Progress complete event emitted')
              }
            }, 1000)
          } else {
            this.successTimer = setTimeout(updateProgress, updateInterval)
          }
        } else {
          console.log('updateProgress stopped, status:', this.status, 'step:', step, 'steps:', steps)
        }
      }

      updateProgress()
    },

    resetProgress() {
      this.clearTimers()
      this.currentProgress = 0
      this.visible = true
    },

    clearTimers() {
      if (this.pendingTimer) {
        clearTimeout(this.pendingTimer)
        this.pendingTimer = null
      }
      if (this.successTimer) {
        clearTimeout(this.successTimer)
        this.successTimer = null
      }
    }
  }
}
</script>

<template>
  <div v-if="visible" class="progress-loader-mask">
    <div class="progress-loader-container">
      <el-progress
        :percentage="currentProgress"
        :status="progressStatus"
        :stroke-width="8"
        type="circle"
        :show-text="true"
      />
      <div class="progress-text">
        {{ statusText }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-loader-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.progress-loader-container {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 400px;
  text-align: center;
}

.progress-text {
  margin-top: 16px;
  font-size: 14px;
  color: #606266;
}

/* Element UI 进度条样式覆盖 */
.progress-loader-container ::v-deep .el-progress-bar__outer {
  background-color: #f5f7fa;
}

.progress-loader-container ::v-deep .el-progress-bar__inner {
  transition: width 0.3s ease;
}
</style>