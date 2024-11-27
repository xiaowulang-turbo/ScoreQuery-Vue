<template>
  <div>
    <h1>Student</h1>
    <!-- <h2>{{ student.name }}</h2>
    <h2>{{ student.age }}</h2>
    <h2>{{ student.grade }}</h2> -->
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
