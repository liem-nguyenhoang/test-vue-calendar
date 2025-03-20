<!-- components/CalendarEventDialog.vue -->
<template>
  <v-dialog v-model="modelValue" max-width="500px">
    <v-card>
      <v-card-title>
        {{ event ? "Edit Event" : "New Event" }}
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="formData.title"
            label="Event Title"
            required
            :rules="[(v) => !!v || 'Title is required']"
          ></v-text-field>

          <v-row>
            <v-col cols="12" sm="6">
              <v-menu
                ref="startMenu"
                v-model="startMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formattedStartDate"
                    label="Start Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formData.startDate"
                  @input="startMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <v-menu
                ref="startTimeMenu"
                v-model="startTimeMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.startTime"
                    label="Start Time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :disabled="formData.allDay"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="formData.startTime"
                  format="24hr"
                  @input="startTimeMenu = false"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6">
              <v-menu
                ref="endMenu"
                v-model="endMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formattedEndDate"
                    label="End Date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formData.endDate"
                  @input="endMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <v-menu
                ref="endTimeMenu"
                v-model="endTimeMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.endTime"
                    label="End Time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :disabled="formData.allDay"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="formData.endTime"
                  format="24hr"
                  @input="endTimeMenu = false"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-checkbox v-model="formData.allDay" label="All Day"></v-checkbox>

          <v-textarea
            v-model="formData.description"
            label="Description"
            rows="3"
          ></v-textarea>

          <v-text-field
            v-model="formData.location"
            label="Location"
          ></v-text-field>

          <v-color-picker
            v-model="formData.color"
            hide-inputs
            hide-canvas
            show-swatches
            :swatches="colorSwatches"
          ></v-color-picker>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
        <v-btn v-if="event" color="error" text @click="handleDelete"
          >Delete</v-btn
        >
        <v-btn color="primary" text @click="handleSave" :disabled="!valid"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useDate } from "vuetify";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  event: {
    type: Object,
    default: null,
  },
  date: {
    type: Date,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "save", "delete", "close"]);

const adapter = useDate();
const form = ref(null);
const valid = ref(false);
const startMenu = ref(false);
const endMenu = ref(false);
const startTimeMenu = ref(false);
const endTimeMenu = ref(false);

const colorSwatches = [
  "#2196F3",
  "#3F51B5",
  "#673AB7",
  "#00BCD4",
  "#4CAF50",
  "#FF9800",
  "#757575",
  "#f44336",
];

const formData = reactive({
  id: null,
  title: "",
  startDate: "",
  startTime: "10:00",
  endDate: "",
  endTime: "11:00",
  allDay: false,
  description: "",
  location: "",
  color: "#2196F3",
});

// Format date for display
const formattedStartDate = computed(() => {
  return adapter.format(adapter.date(formData.startDate), "fullDate");
});

const formattedEndDate = computed(() => {
  return adapter.format(adapter.date(formData.endDate), "fullDate");
});

// Initialize form with event data if editing
onMounted(() => {
  if (props.event) {
    // Editing existing event
    const event = props.event;
    formData.id = event.id;
    formData.title = event.title;
    formData.startDate = adapter.format(event.start, "yyyy-MM-dd");
    formData.startTime = adapter.format(event.start, "HH:mm");
    formData.endDate = adapter.format(event.end, "yyyy-MM-dd");
    formData.endTime = adapter.format(event.end, "HH:mm");
    formData.allDay = event.allDay;
    formData.description = event.description || "";
    formData.location = event.location || "";
    formData.color = event.color;
  } else if (props.date) {
    // Creating new event on a specific date
    formData.startDate = adapter.format(props.date, "yyyy-MM-dd");
    formData.endDate = adapter.format(props.date, "yyyy-MM-dd");
  }
});

// Watch for changes to allDay toggle
watch(
  () => formData.allDay,
  (isAllDay) => {
    if (isAllDay) {
      // Set default times for all-day events
      formData.startTime = "00:00";
      formData.endTime = "23:59";
    } else if (formData.startTime === "00:00" && formData.endTime === "23:59") {
      // Reset to default times when turning off all-day
      formData.startTime = "10:00";
      formData.endTime = "11:00";
    }
  }
);

// Handle save event
function handleSave() {
  if (!valid.value) return;

  // Combine date and time into Date objects
  const startDateTime = combineDateTime(formData.startDate, formData.startTime);
  const endDateTime = combineDateTime(formData.endDate, formData.endTime);

  // Create event object
  const eventData = {
    id: formData.id,
    title: formData.title,
    startTime: startDateTime.toISOString(),
    endTime: endDateTime.toISOString(),
    allDay: formData.allDay,
    description: formData.description,
    location: formData.location,
    color: formData.color,
  };

  emit("save", eventData);
}

// Handle delete event
function handleDelete() {
  if (formData.id) {
    emit("delete", formData.id);
  }
}

// Helper function to combine date and time strings into a Date object
function combineDateTime(dateStr, timeStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}
</script>
