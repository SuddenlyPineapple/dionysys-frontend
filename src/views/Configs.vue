<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Create new configuration</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Configurtation name"
          v-model="configName"
        ></v-text-field>
        <v-text-field
          v-model="minBuildNumber"
          :counter="10"
          label="Minimum Build Number"
        ></v-text-field>
        <v-text-field
          v-model="minPatchNumber"
          :counter="10"
          label="Minimum Patch Number"
        ></v-text-field>
        <v-combobox
          v-model="users"
          :search-input.sync="typedUser"
          hide-selected
          hint="Maximum of 5 users"
          label="Add users"
          multiple
          persistent-hint
          small-chips
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No results matching "<strong
                    >{{ typedUser }} but you can alwasy click Tab</strong
                  >". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
        <v-combobox
          v-model="applications"
          :items="predefinedApplications"
          :search-input.sync="typedApplication"
          hide-selected
          hint="Maximum of 10 applications"
          label="Add applications"
          multiple
          persistent-hint
          small-chips
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No results matching "<strong
                    >{{ typedApplication }} but you can alwasy click Tab</strong
                  >". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
        <v-card class="ma-4 pa-2" v-if="!!applications">
          <v-card-text>Input Apps Versions</v-card-text>
          <v-card-text v-for="(app, index) in applications" v-bind:key="index">
            <v-text-field
              :label="app"
              v-on:change="appsChanged($event, app)"
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-combobox
          v-model="ports"
          :items="predefinedPorts"
          :search-input.sync="typedPorts"
          hide-selected
          hint="Maximum of 10 ports"
          label="Add ports"
          multiple
          persistent-hint
          small-chips
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No results matching "<strong
                    >{{ typedPorts }} but you can alwasy click Tab</strong
                  >". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
        <v-combobox
          v-model="webpages"
          :search-input.sync="typedWebpage"
          hide-selected
          hint="Maximum of 5 users"
          label="Add webpages"
          multiple
          persistent-hint
          small-chips
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No results matching "<strong
                    >{{ typedWebpage }} but you can alwasy click Tab</strong
                  >". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
        <v-checkbox
          v-model="requireAntyvirus"
          label="Require installed Antyvirus"
          color="red"
        />
        <v-card-text class="pt-5">
          <v-slider
            v-model="minMemory"
            color="red"
            label="Minimum amount of memory (MB)"
            track-color="grey"
            thumb-label="always"
            always-dirty
            min="512"
            max="16384"
            step="512"
            ticks="always"
          ></v-slider>
        </v-card-text>
        <v-card-text class="pt-5">
          <v-row>
            <v-col cols="9">
              <v-slider
                v-model="minDiskSpace"
                color="red"
                label="Minimum amount of disk space (GB)"
                track-color="grey"
                thumb-label="always"
                always-dirty
                min="64"
                max="4064"
                step="64"
                ticks="always"
              ></v-slider>
            </v-col>
            <v-col cols="3" class="pt-1">
              <v-select
                v-model="selectedDirveLetter"
                :items="dirveLetters"
                label="Drive letter"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
    <v-btn large color="error" v-on:click="sendConfigRequest">
      <v-icon>mdi-content-save</v-icon> SAVE CONFIGURATION
    </v-btn>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    configName: null,

    minBuildNumber: null,
    minPatchNumber: null,

    //Flags
    requireAntyvirus: false,

    //Sliders
    minMemory: 512,
    minDiskSpace: 64,
    dirveLetters: ["C", "D", "E"],
    selectedDirveLetter: "C",

    //UserCombobox
    users: null,
    typedUser: null,

    //UserCombobox
    webpages: null,
    typedWebpage: null,

    //AppCombobox
    applications: null,
    typedApplication: null,
    predefinedApplications: [
      "Spotify",
      "Chrome",
      "Avast",
      "Notepad++",
      "Windows Defender"
    ],
    apps: [],
    model: null,

    //PortsCombobox
    ports: null,
    typedPorts: null,
    predefinedPorts: ["20", "21", "31", "1170", "1234"]
  }),
  methods: {
    sendConfigRequest() {
      axios.post("http://hiosdrapi.ddns.net:8080/config", {
        name: this.configName,
        minBuildNumber: this.minBuildNumber,
        minPatchNumber: this.minPatchNumber,
        antivirus: this.requireAntyvirus,
        apps: this.apps,
        disks: [
          {
            letter: this.selectedDirveLetter,
            size: this.minDiskSpace
          }
        ],
        minMemory: parseInt(this.minMemory),
        users: this.users,
        ports: this.ports.map(port => parseInt(port))
      });
      //   console.log({
      //     name: this.configName,
      //     minBuildNumber: this.minBuildNumber,
      //     minPatchNumber: this.minPatchNumber,
      //     antivirus: this.requireAntyvirus,
      //     apps: this.apps.filter(app => {
      //       console.log(app);
      //     }),
      //     disks: [
      //       {
      //         letter: this.selectedDirveLetter,
      //         size: this.minDiskSpace
      //       }
      //     ],
      //     minMemory: parseInt(this.minMemory),
      //     users: this.users,
      //     ports: this.ports.map(port => parseInt(port))
      //  });
      this.$router.push({ path: "/" });
    },
    appsChanged(value, item) {
      console.log(value, item);
      this.apps.push({ name: item, version: value });
    }
  }
};
</script>
