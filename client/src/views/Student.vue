<template>
  <div>
    <h1>Student</h1>
  </div>
</template>

<script>
export default {
  name: 'Student',
  props: {
    student: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
