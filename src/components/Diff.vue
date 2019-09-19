<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col cols="12">
          <v-card-text class="pt-1"
            ><strong>Name:</strong>
            {{ !!machine.name ? machine.name : "" }}</v-card-text
          >
          <v-card-text class="pt-1"
            ><strong
              >Vunerabilities:
              <span :class="machine.invalidCount ? 'red--text' : ''">{{
                machine.invalidCount
              }}</span></strong
            ></v-card-text
          >
          <v-card-text
            class="pt-1"
            v-for="prop in machine.properties"
            v-bind:key="!!prop.name ? prop.name : ''"
          >
            <strong>{{ prop.name }}: </strong>
            <span :class="prop.valid ? 'green--text' : ''">
              <span v-if="Array.isArray(prop.actual)">
                <div
                  v-if="
                    !!prop.actual[0] &&
                      prop.actual[0].name &&
                      prop.actual[0].version
                  "
                >
                  <v-chip v-for="app in prop.actual" v-bind:key="app"
                    >{{ app.name }} <v-icon>mdi-arrow-right-bold</v-icon>
                    {{ app.version }}</v-chip
                  >
                </div>
                <div
                  v-else-if="
                    !!prop.actual[0] &&
                      prop.actual[0].letter &&
                      prop.actual[0].size
                  "
                >
                  <v-chip v-for="app in prop.actual" v-bind:key="app"
                    >{{ app.letter }} <v-icon>mdi-arrow-right-bold</v-icon>
                    {{ app.size }} MB</v-chip
                  >
                </div>
                <div v-else-if="prop.actual[0]">
                  <v-chip v-for="obj in prop.actual" v-bind:key="obj">{{
                    obj
                  }}</v-chip>
                </div>
                <code v-else>{{ prop.actual }}</code>
              </span>
              <span
                v-else-if="
                  !!prop.name && prop.name === 'antivirus' && prop.actual
                "
              >
                <v-icon class="green--text" v-if="prop.actual"
                  >mdi-shield-lock</v-icon
                >
              </span>
              <span
                v-else-if="
                  !!prop.name && prop.name === 'antivirus' && !prop.actual
                "
              >
                <v-icon class="red--text">mdi-shield-remove</v-icon>
              </span>
              <span v-else>{{ prop.actual }}</span>
            </span>

            <v-card class="red lighten-1 pa-2" v-if="!prop.valid">
              <strong>Expected: </strong>
              <span v-if="Array.isArray(prop.expected)">
                <div
                  v-if="!!prop.expected[0].name && !!prop.expected[0].version"
                >
                  <v-chip
                    v-for="app in prop.expected"
                    v-bind:key="app"
                    color="red"
                    >{{ app.name }} <v-icon>mdi-arrow-right-bold</v-icon>
                    {{ app.version }}</v-chip
                  >
                </div>
                <div
                  v-else-if="
                    !!prop.expected[0].letter && !!prop.expected[0].size
                  "
                >
                  <v-chip
                    v-for="app in prop.expected"
                    v-bind:key="app"
                    color="red"
                    >{{ app.letter }} <v-icon>mdi-arrow-right-bold</v-icon>
                    {{ app.size }} MB</v-chip
                  >
                </div>
                <div v-else-if="prop.expected[0]">
                  <v-chip
                    v-for="obj in prop.expected"
                    v-bind:key="obj"
                    color="red"
                    >{{ obj }}</v-chip
                  >
                </div>
                <code v-else>{{ prop.expected }}</code>
              </span>
            </v-card>
          </v-card-text>
        </v-col>
      </v-row>
      <!-- <code>
        {{ machine }}
      </code> -->
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["machine"]
};
</script>
