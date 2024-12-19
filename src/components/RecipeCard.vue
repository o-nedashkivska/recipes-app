<template>
  <b-card :img-src="image" img-alt="Image" img-top class="h-100">
    <b-link :to="detailedPageLink">
      <b-card-title>{{ title }}</b-card-title>
    </b-link>
    <b-card-text>Category: {{ category }}</b-card-text>
    <b-card-text v-if="tags">
      Tags:
      <b-badge v-for="tag in tagList" :key="tag" variant="warning" class="mr-1">
        {{ tag }}
      </b-badge>
    </b-card-text>
    <template #footer>
      <div class="footer">
        <small class="text-muted">Updated {{ updatedAtText }}</small>
        <div class="icons">
          <BIconTrash
            font-scale="1.25"
            class="icon"
            variant="secondary"
            @click="deleteById"
          />
          <BIconPencilSquare
            font-scale="1.25"
            class="icon"
            variant="secondary"
            v-b-modal="modalId"
          />
        </div>
      </div>
    </template>
    <EditRecipeModal :id="modalId" :recipeId="id" />
  </b-card>
</template>

<script>
  import {
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BBadge,
    BIconTrash,
    BIconPencilSquare,
    VBModal,
  } from "bootstrap-vue";
  import EditRecipeModal from "@/components/EditRecipeModal";
  import { Mutations } from "@/store/modules/recipes/enums";
  import { getTimeAgo } from "@/utils/index.ts";
  import { recipesModuleName } from "@/store";

  export default {
    components: {
      BCard,
      BLink,
      BCardTitle,
      BCardText,
      BBadge,
      BIconTrash,
      BIconPencilSquare,
      EditRecipeModal,
    },
    props: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      updatedAt: {
        type: Number,
        required: true,
      },
      tags: {
        type: String,
        default: null,
      },
    },
    computed: {
      detailedPageLink() {
        return "/recipes/" + this.id;
      },
      updatedAtText() {
        return getTimeAgo(this.updatedAt);
      },
      tagList() {
        return this.tags.split(",");
      },
      modalId() {
        return `${this.id}-modal`;
      },
    },
    methods: {
      deleteById() {
        this.$store.commit(
          `${recipesModuleName}/${Mutations.DELETE_RECIPE_BY_ID}`,
          this.id
        );
      },
    },
    directives: {
      "b-modal": VBModal,
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
