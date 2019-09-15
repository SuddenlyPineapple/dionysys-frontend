<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Raport - {{ id }}</h1>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="raportsList"
          :items-per-page="5"
          class="elevation-1"
          :dense="dense"
          :expanded.sync="expanded"
          show-expand
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
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">{{ item }}</td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data: () => ({
    headers: [
      {
        text: "Machine ID",
        align: "left",
        value: "id"
      },
      { text: "Date", value: "date" },
      { text: "Status", value: "status" }
    ],
    raportsList: [
      {
        id: "12345678",
        date: "12-28-2019",
        status: "DISPATCHED",
        isCompleted: false
      },
      {
        id: "123",
        date: "12-28-1999",
        status: "COMPLETED",
        isCompleted: true
      }
    ],
    expanded: [],
    dense: true,
    search: null
  }),
  methods: {
    getRaport() {
      axios
        .get("http://10.250.166.121:8080/report/" + this.id)
        .then(response => {
          this.raportsList = response.data.machines;
          console.log(response);
        });
    }
  },
  mounted() {
    this.getRaport();
  }
};
</script>
