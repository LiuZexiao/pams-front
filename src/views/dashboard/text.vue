<template>


</template>

<script>
export default {
  components: {},
  props: ["data", "defaultActive"],
  data() {
    return {
      active: 0,
      approvalProcessProject: [
        { id: "0", label: "方案制定" },
        { id: "1", label: "割接方案会审" },
        { id: "2", label: "割接审批" },
        { id: "3", label: "审批成功" },
      ],
    };
  },
  watch: {},
  mounted() {},
  computed: {},
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
  },
};
</script>

<style>
.stepComponent {
  background-color: #dfebff;
  width: 100%-20px;
  padding: 10px 10px 10px 10px;
  margin: 10px 10px 10px 10px;
}
.stepsTitle {
  margin: 10px 0px 10px 10px;
}
.approvalProcess {
  color: #9eadc4;
  font-size: 14px;
  /* width: 100%; */
  background: #dfebff;
  margin-left: 20px;
  margin-right: 0px;
  margin-top: 10px;
}
.processing_content {
  background-color: #d9e5f9;
}
.processing_content_detail {
  margin-left: 10px;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
  width: 150px;
  display: inline-block;
}
.step-row {
  min-width: 500px;
  margin-bottom: 12px;
  margin-top: 12px;
}
</style>