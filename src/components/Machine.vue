import moment from 'moment';
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text> <strong>Name: </strong>{{ machine.name }} </v-card-text>
          <v-card-text class="pt-1">
            <strong>Scan date: </strong>{{ moment(new Date(machine.date)) }}
          </v-card-text>
          <v-card-text class="pt-1">
            <strong>Build Number: </strong>{{ machine.minBuildNumber }}
          </v-card-text>
          <v-card-text class="pt-1">
            <strong>Build Number: </strong>{{ machine.minPatchNumber }}
          </v-card-text>
          <v-card-text class="pt-1">
            <strong>Antyvirus: </strong>
            <v-icon class="green--text" v-if="machine.antivirus"
              >mdi-shield-lock</v-icon
            >
            <v-icon class="red--text" v-else>mdi-shield-remove</v-icon>
          </v-card-text>
          <v-card-text class="pt-1">
            <strong>Memory: </strong>{{ machine.minMemory }} MB
          </v-card-text>
          <v-card-text class="pt-1">
            <strong>Apps: </strong>
            <v-chip v-for="app in machine.apps" v-bind:key="app"
              >{{ app.name }} <v-icon>mdi-arrow-right-bold</v-icon>
              {{ app.version }}</v-chip
            >
          </v-card-text>
          <v-card-text class="pt-1">
            <strong>Open ports: </strong>
            <v-chip
              v-for="(item, index) in machine.openPorts"
              v-bind:key="index"
              :class="dangerPorts.indexOf(parseInt(item)) > 0 ? 'orange' : ''"
              >{{ item }}</v-chip
            >
          </v-card-text>
          <v-card-text class="pt-1">
            <strong>Users: </strong>
            <v-chip v-for="(user, index) in machine.users" v-bind:key="index">{{
              user
            }}</v-chip>
          </v-card-text>
          <v-card-text class="pt-1">
            <strong>Websites: </strong>
            <v-chip
              v-for="(website, index) in machine.webSites"
              v-bind:key="index"
              >{{ website }}</v-chip
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import moment from "moment";
export default {
  props: ["machine"],
  data: () => ({
    dangerPorts: [20, 31, 1170, 1234, 1243, 1900, 1981, 2001, 2023, 2140, 5500]
  }),
  methods: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    }
  }
};
</script>
