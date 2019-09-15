<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Machines</h1>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="machinesHeaders"
          :items="machinesList"
          :items-per-page="5"
          class="elevation-1"
          :dense="dense"
          :expanded.sync="expandedMachines"
          show-expand
          multi-sort
          :search="search"
          :key="machinesList.name"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <div class="flex-grow-1"></div>
              <v-switch
                v-model="dense"
                label="Dense table"
                class="mt-2"
                color="red"
              ></v-switch>
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ item }">
            <td colspan="5">
              <code>{{ JSONtoYAML(item) }}</code>
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import YAML from "yamljs";

export default {
  data: () => ({
    machinesHeaders: [
      {
        text: "Machine Name",
        align: "left",
        value: "name"
      },
      { text: "Date", value: "date" },
      { text: "Build Number", value: "minBuildNumber" },
      { text: "Patch Number", value: "minPatchNumber" }
    ],
    machinesList: [],
    expandedMachines: [],
    dense: true,
    search: null
  }),
  methods: {
    getDaemons() {
      axios.get("http://10.250.166.121:8080/daemon").then(response => {
        this.machinesList = response.data.daemons.map(daemon => {
          return { id: daemon.name, ...daemon };
        });
      });
    },
    JSONtoYAML(obj) {
      var yamlStr = YAML.stringify(obj);
      return yamlStr;
    }
  },
  mounted() {
    this.getDaemons();
  }
};
</script>
