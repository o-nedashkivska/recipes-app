<template>
  <b-card no-body class="overflow-hidden recipe-detail">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="currentVersion.image" alt="Image" class="rounded-0" />
      </b-col>
      <b-col md="6">
        <b-nav align="end" pills class="mt-2 mt-md-0 pt-1 pr-1">
          <b-button variant="danger" @click="deleteRecipe">
            Delete Recipe
          </b-button>
          <b-dropdown
            :text="currentVersionLabel"
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

        <b-card-body :title="currentVersion.title">
          <b-card-text>Category: {{ currentVersion.category }}</b-card-text>
          <b-card-text v-if="currentVersion.tags">
            Tags:
            <b-badge
              v-for="tag in currentVersion.tags.split(',')"
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
            v-for="(instruction, index) in currentVersion.instructions.split(
              '\r\n'
            )"
            :key="index"
          >
            {{ index + 1 }}. {{ instruction }}
          </b-card-text>

          <b-card-text
            v-if="parentRecipe"
            class="text-muted font-italic text-right mb-0"
          >
            Created from
            <b-link :to="parentRecipePageLink">
              {{ parentRecipeCurrentVersion?.title }}
            </b-link>
          </b-card-text>
          <b-card-text class="text-muted font-italic text-right">
            Created at {{ currentVersionCreatedAtText }}
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
    BLink,
  } from "bootstrap-vue";
  import { recipesModuleName } from "@/store/modules";
  import { Getters, Actions } from "@/store/modules/recipes/types";
  import { RouteName } from "@/router/enums";
  import { formatDateAndTime, getTimeAgo, getRecipeVersion } from "@/utils";

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
      BLink,
    },
    props: {
      recipe: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        currentVersionIndex: -1,
      };
    },
    computed: {
      ...mapGetters(recipesModuleName, {
        getRecipeById: Getters.GET_RECIPE_BY_ID,
      }),
      versions() {
        return this.recipe.versions.map((version, index, versions) => {
          return {
            ...version,
            label: formatDateAndTime(version.createdAt),
            isActive:
              index === this.currentVersionIndex ||
              (this.currentVersionIndex === -1 &&
                index === versions.length - 1),
          };
        });
      },
      currentVersion() {
        return getRecipeVersion(this.recipe, this.currentVersionIndex);
      },
      currentVersionLabel() {
        if (
          this.currentVersionIndex === -1 ||
          this.currentVersionIndex === this.versions.length - 1
        ) {
          return "Latest Version";
        }

        if (this.currentVersionIndex === 0) {
          return "First Version";
        }

        return this.versions[this.currentVersionIndex].label;
      },
      currentVersionCreatedAtText() {
        return getTimeAgo(this.currentVersion.createdAt);
      },
      parentRecipe() {
        const parentRecipeId = this.currentVersion.parent;

        return parentRecipeId ? this.getRecipeById(parentRecipeId) : null;
      },
      parentRecipeCurrentVersion() {
        return this.parentRecipe
          ? getRecipeVersion(this.parentRecipe, -1)
          : null;
      },
      parentRecipePageLink() {
        return {
          name: RouteName.RECIPE,
          params: { id: this.parentRecipe.id },
        };
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
        this.currentVersionIndex = index;
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
