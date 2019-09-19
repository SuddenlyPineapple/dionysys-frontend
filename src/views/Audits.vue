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
          label="Select machines (no select = all)"
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
      axios.get("http://hiosdrapi.ddns.net:8080/config/").then(response => {
        this.configsList = response.data.configs.map(config => config.name);
        this.configs = response.data.configs;
      });
    },
    getDaemons() {
      axios.get("http://hiosdrapi.ddns.net:8080/daemon").then(response => {
        this.machineList = response.data.daemons.map(daemon => daemon.name);
        //console.log(response);
      });
    },
    selectConfig(value) {
      this.runConfig = this.configs
        ? this.configs.find(config => config.name == value)
        : null;
    },
    selectMachine(value) {
      this.runMachine = value;
      //console.log(value);
    },
    sendRunRequest() {
      axios
        .post("http://hiosdrapi.ddns.net:8080/report/", {
          configName: this.runConfig.name,
          machineName: this.runMachine
        })
        .then(() => {
          this.$router.push({ path: "raports" });
        });
    },
    JSONtoYAML(obj) {
      var yamlStr = YAML.stringify(obj);
      return yamlStr;
    }
  },
  mounted() {
    this.getConfig();
    this.getDaemons();
  }
};
</script>

<style lang="scss">
pre {
  padding-right: 20px;
  padding-left: 20px;
}
</style>
