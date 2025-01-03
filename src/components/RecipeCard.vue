<template>
  <b-card
    :img-src="lastRecipeVersion.image"
    img-alt="Image"
    img-top
    class="h-100"
  >
    <b-link :to="detailedPageLink">
      <b-card-title>{{ lastRecipeVersion.title }}</b-card-title>
    </b-link>
    <b-card-text>Category: {{ lastRecipeVersion.category }}</b-card-text>
    <b-card-text v-if="lastRecipeVersion.tags">
      Tags:
      <b-badge v-for="tag in tagList" :key="tag" variant="warning" class="mr-1">
        {{ tag }}
      </b-badge>
    </b-card-text>
    <template #footer>
      <div class="footer">
        <small class="text-muted">Created {{ createdAtText }}</small>
        <div class="icons">
          <BIconTrash
            font-scale="1.25"
            class="icon"
            variant="secondary"
            @click="deleteRecipe"
          />
          <b-link :to="createRecipePageWithParentLink">
            <BIconBack font-scale="1.25" class="icon" variant="secondary" />
          </b-link>
          <BIconPencilSquare
            font-scale="1.25"
            class="icon"
            variant="secondary"
            @click="openModal"
          />
        </div>
      </div>
    </template>
    <EditRecipeModal
      :id="recipe.id"
      :last-recipe-version="lastRecipeVersion"
      :is-visible="isModalVisible"
      @hide-modal="hideModal"
    />
  </b-card>
</template>

<script>
  import { mapActions } from "vuex";
  import {
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BBadge,
    BIconTrash,
    BIconPencilSquare,
    BIconBack,
  } from "bootstrap-vue";
  import EditRecipeModal from "@/components/EditRecipeModal";
  import { recipesModuleName } from "@/store/modules";
  import { Actions } from "@/store/modules/recipes/types";
  import { RouteName } from "@/router/enums";
  import { getTimeAgo, getRecipeVersion } from "@/utils";

  export default {
    components: {
      BCard,
      BLink,
      BCardTitle,
      BCardText,
      BBadge,
      BIconTrash,
      BIconPencilSquare,
      BIconBack,
      EditRecipeModal,
    },
    props: {
      recipe: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isModalVisible: false,
      };
    },
    computed: {
      lastRecipeVersion() {
        return getRecipeVersion(this.recipe, -1);
      },
      createdAtText() {
        return getTimeAgo(this.lastRecipeVersion.createdAt);
      },
      tagList() {
        return this.lastRecipeVersion.tags
          ? this.lastRecipeVersion.tags.split(",")
          : [];
      },
      detailedPageLink() {
        return {
          name: RouteName.RECIPE,
          params: { id: this.recipe.id },
        };
      },
      createRecipePageWithParentLink() {
        return {
          name: RouteName.CREATE_RECIPE,
          query: { parent: this.recipe.id },
        };
      },
    },
    methods: {
      ...mapActions(recipesModuleName, {
        deleteById: Actions.DELETE_RECIPE_BY_ID,
      }),
      deleteRecipe() {
        this.deleteById(this.recipe.id);
      },
      openModal() {
        this.isModalVisible = true;
      },
      hideModal() {
        this.isModalVisible = false;
      },
    },
  };
</script>

<style scoped>
  .footer {
    display: flex;
    justify-content: space-between;
  }
  .icons {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 5px;
  }
  .icon:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
</style>
