<template>
  <v-container>
    <h1>Run preconfigured audit</h1>
    <v-row>
      <v-col col="12">
        <v-select
          v-model="configSelect"
          :items="configsList"
          label="Select configuration"
          v-on:change="selectConfig"
        ></v-select>
      </v-col>
      <v-col col="12">
        <v-select
          v-model="selectedMachine"
          :items="machineList"
          label="Select machines"
          v-on:change="selectMachine"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <code v-if="configSelect !== null">
          <pre>{{ JSONtoYAML(runConfig) }}</pre>
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
import YAML from "yamljs";

export default {
  data: () => ({
    //Config Selection
    configsList: ["Configurations not found!"],
    configSelect: null,
    configs: null,
    runConfig: null,

    //Machine Selection
    machineList: ["No machines in network!"],
    selectedMachine: null,
    runMachine: null
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
    selectMachine(value) {
      this.runMachine = value;
      console.log(value);
    },
    sendRunRequest() {
      axios
        .post("http://10.250.166.121:8080/report/", {
          configName: this.runConfig.name
        })
        .then(response => {
          console.log(response);
        });
    },
    JSONtoYAML(obj) {
      var yamlStr = YAML.stringify(obj);
      return yamlStr;
    }
  },
  mounted() {
    this.getConfig();
  }
};
</script>

<style lang="scss">
pre {
  padding-right: 20px;
  padding-left: 20px;
}
</style>
