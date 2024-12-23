<template>
  <b-card no-body class="overflow-hidden recipe-detail">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img
          :src="currentRecipeVersion.image"
          alt="Image"
          class="rounded-0"
        />
      </b-col>
      <b-col md="6">
        <b-nav align="end" pills class="mt-2 mt-md-0 pt-1 pr-1">
          <b-button variant="danger" @click="deleteRecipe">
            Delete Recipe
          </b-button>
          <b-dropdown
            :text="currentRecipeVersionLabel"
            variant="primary"
            class="ml-2"
            right
          >
            <b-dropdown-item
              v-for="(version, index) in versions"
              :key="version.createdAt"
              :active="version.isActive"
              link-class="px-2"
              @click="selectVersion(index)"
            >
              {{ version.label }}
            </b-dropdown-item>
          </b-dropdown>
        </b-nav>

        <b-card-body :title="currentRecipeVersion.title">
          <b-card-text>
            Category: {{ currentRecipeVersion.category }}
          </b-card-text>
          <b-card-text v-if="currentRecipeVersion.tags">
            Tags:
            <b-badge
              v-for="tag in currentRecipeVersion.tags.split(',')"
              :key="tag"
              variant="warning"
              class="mr-1"
            >
              {{ tag }}
            </b-badge>
          </b-card-text>
          <b-card-text>
            <strong>Instructions:</strong>
          </b-card-text>
          <b-card-text
            v-for="(
              instruction, index
            ) in currentRecipeVersion.instructions.split('\r\n')"
            :key="index"
          >
            {{ index + 1 }}. {{ instruction }}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import {
    BCard,
    BCardText,
    BBadge,
    BRow,
    BCol,
    BCardImg,
    BCardBody,
    BNav,
    BDropdown,
    BDropdownItem,
    BButton,
  } from "bootstrap-vue";
  import { RouteName } from "@/router/enums";
  import { Getters, Actions } from "@/store/modules/recipes/types";
  import { recipesModuleName } from "@/store/modules";
  import { formatDateAndTime } from "@/utils";

  export default {
    components: {
      BCard,
      BRow,
      BCol,
      BCardImg,
      BCardBody,
      BCardText,
      BBadge,
      BNav,
      BDropdown,
      BDropdownItem,
      BButton,
    },
    props: {
      recipe: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        currentRecipeVersionIndex: -1,
      };
    },
    computed: {
      ...mapGetters(recipesModuleName, {
        getRecipe: Getters.GET_RECIPE_BY_ID,
      }),
      versions() {
        return this.recipe.versions.map((version, index, versions) => {
          return {
            ...version,
            label: formatDateAndTime(version.createdAt),
            isActive:
              index === this.currentRecipeVersionIndex ||
              (this.currentRecipeVersionIndex === -1 &&
                index === versions.length - 1),
          };
        });
      },
      currentRecipeVersion() {
        return this.versions.at(this.currentRecipeVersionIndex);
      },
      currentRecipeVersionLabel() {
        if (
          this.currentRecipeVersionIndex === -1 ||
          this.currentRecipeVersionIndex === this.versions.length - 1
        ) {
          return "Latest Version";
        }

        if (this.currentRecipeVersionIndex === 0) {
          return "First Version";
        }

        return this.currentRecipeVersion.label;
      },
    },
    methods: {
      ...mapActions(recipesModuleName, {
        deleteById: Actions.DELETE_RECIPE_BY_ID,
      }),
      deleteRecipe() {
        this.$router.push({
          name: RouteName.RECIPES,
        });
        this.deleteById(this.recipe.id);
      },
      selectVersion(index) {
        this.currentRecipeVersionIndex = index;
      },
    },
  };
</script>

<style scoped>
  .recipe-detail {
    width: 95%;
    min-width: 325px;
    margin: 0 auto;
    border: none;
    padding-top: 30px;
  }

  @media (min-width: 991.98px) {
    .recipe-detail {
      width: 85%;
    }
  }

  @media (min-width: 1399.98px) {
    .recipe-detail {
      max-width: 1300px;
    }
  }
</style>
