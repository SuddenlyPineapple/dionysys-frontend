<template>
  <v-container>
    <h1>Create new configuration</h1>
    <v-text-field label="Configurtation name"></v-text-field>
    <v-select
      v-model="system"
      :items="systems"
      label="Operating Systems"
    ></v-select>
    <v-checkbox v-model="checkbox" label="OS version" color="red"></v-checkbox>
    <v-btn large color="error">
      <v-icon>mdi-content-save</v-icon> SAVE CONFIGURATION
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    checkbox: false,
    systems: [
      "Windows 10",
      "Windows 98",
      "DOS",
      "Ubuntu Xenial 10.8",
      "JanuszOS"
    ],
    system: null
  })
};
</script>
