<template>
  <v-container>
    <h1>Run preconfigured audit</h1>
    <v-row>
      <v-col>
        <v-select
          v-model="configSelect"
          :items="configsList"
          label="Select configuration"
          v-on:change="selectConfig"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <code v-if="configSelect !== null">
          <pre>{{ runConfig }}</pre>
        </code>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          large
          color="error"
          v-if="configSelect !== null"
          v-on:click="sendRunRequest"
        >
          <v-icon>mdi-play</v-icon> RUN CONFIGURATION
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    configsList: ["Configurations not found!"],
    configSelect: null,
    configs: null,
    runConfig: null
  }),
  methods: {
    getConfig() {
      axios.get("http://10.250.166.121:8080/config/").then(response => {
        this.configsList = response.data.configs.map(config => config.name);
        this.configs = response.data.configs;
      });
    },
    selectConfig(value) {
      this.runConfig = this.configs
        ? this.configs.find(config => config.name == value)
        : null;
    },
    sendRunRequest() {
      axios
        .post("http://10.250.166.121:8080/run", {
          configName: this.runConfig.name
        })
        .then(response => {
          console.log(response);
        });
    }
  },
  mounted() {
    this.getConfig();
  }
};
</script>
