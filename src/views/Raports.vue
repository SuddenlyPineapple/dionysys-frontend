<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Raports</h1>
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
          <template v-slot:item="{ item }" columns>
            <tr>
              <td>
                <v-btn fab small text color="error" :to="'/raports/' + item.id"
                  ><v-icon>mdi-arrow-down-bold-circle-outline</v-icon></v-btn
                >
              </td>
              <td>{{ item.id }}</td>
              <td>{{ moment(new Date(item.timestamp)) }}</td>
              <td>{{ item.configName }}</td>
            </tr>
          </template>
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
            <td :colspan="headers.length">
              {{ item }}
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: () => ({
    headers: [
      {
        text: "Raport ID",
        align: "left",
        value: "id"
      },
      { text: "Date", value: "timestamp" },
      { text: "Configuration Name", value: "configName" }
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
    getRaports() {
      axios.get("http://hiosdrapi.ddns.net:8080/report").then(response => {
        this.raportsList = response.data.reports;
        console.log(response);
      });
    },
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    }
  },
  mounted() {
    this.getRaports();
  }
};
</script>
