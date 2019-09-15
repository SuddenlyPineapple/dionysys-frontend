<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Raport {{ id }} for {{ configName }}</h1>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="raportsList"
          :items-per-page="5"
          class="elevation-1"
          :dense="dense"
          multi-sort
          :search="search"
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
          <template v-slot:item="{ item }" columns>
            <tr v-on:click="setMachine(item)">
              <td>{{ item.id }}</td>
              <td :class="item.valid ? 'green--text' : 'red--text'">
                {{ item.valid ? "true" : "false" }}
              </td>
              <td class="red--text">{{ item.invalidCount }}</td>
            </tr>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">{{ item }}</td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Diff v-if="selectedMachine" :machine="selectedMachine"></Diff>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Diff from "../components/Diff";

export default {
  props: ["id"],
  data: () => ({
    headers: [
      {
        text: "Machine ID",
        align: "left",
        value: "id"
      },
      { text: "Secure", value: "valid" },
      { text: "Vunerabilities", value: "invalidCount" }
    ],
    raportsList: [],
    expanded: [],
    dense: true,
    search: null,
    configName: null,
    selectedMachine: null
  }),
  components: {
    Diff
  },
  methods: {
    getRaport() {
      axios
        .get("http://10.250.166.121:8080/report/" + this.id)
        .then(response => {
          this.raportsList = response.data.machines.map(machine => {
            return { id: machine.name, ...machine };
          });
          this.configName = response.data.configName;
          console.log(response);
        });
    },
    setMachine(value) {
      this.selectedMachine = value;
    }
  },
  mounted() {
    this.getRaport();
  }
};
</script>
