<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col cols="12">
          <v-card-text class="pt-1"
            ><strong>Name:</strong> {{ machine.name }}</v-card-text
          >
          <v-card-text class="pt-1"
            ><strong>Vunerabilities: </strong>
            <span :class="machine.invalidCount ? 'red--text' : ''">{{
              machine.invalidCount
            }}</span></v-card-text
          >
          <v-card-text
            class="pt-1"
            v-for="prop in machine.properties"
            v-bind:key="prop.name"
          >
            <strong>{{ prop.name }}: </strong>
            <span :class="prop.valid ? 'green--text' : ''">
              <span v-if="Array.isArray(prop.actual)">prop.actual</span>
              <span v-else-if="prop.name === 'antivirus' && prop.actual">
                <v-icon class="green--text" v-if="prop.actual"
                  >mdi-shield-lock</v-icon
                >
              </span>
              <span v-else-if="prop.name === 'antivirus' && !prop.actual">
                <v-icon class="red--text">mdi-shield-remove</v-icon>
              </span>
              <span v-else>{{ prop.actual }}</span>
            </span>

            <v-card class="red lighten-1" v-if="!prop.valid">
              <strong>Expected: </strong>{{ prop.expected }}
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
