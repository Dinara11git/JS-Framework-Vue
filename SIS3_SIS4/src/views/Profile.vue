<template>
  <div>
    <a-typography-title :level="2" class="page-title">My Profile</a-typography-title>
    <div class="page-subtitle">Basic student account information.</div>
    <a-card class="content-card" style="max-width:680px">
      <a-row align="middle" :gutter="20">
        <a-col><a-avatar :size="72" style="background:#4778d9;font-size:28px">S</a-avatar></a-col>
        <a-col>
          <a-typography-title :level="4" style="margin:0">Student User</a-typography-title>
          <a-typography-text type="secondary">student@example.com</a-typography-text>
        </a-col>
      </a-row>
      <a-divider />
      <a-descriptions bordered :column="1">
        <a-descriptions-item label="Full name">Student User</a-descriptions-item>
        <a-descriptions-item label="Email">student@example.com</a-descriptions-item>
        <a-descriptions-item label="Program">Computer Science</a-descriptions-item>
        <a-descriptions-item label="Status"><a-tag color="green">Active</a-tag></a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>
