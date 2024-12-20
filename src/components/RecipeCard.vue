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
        <small class="text-muted">Created {{ createdAtText }}</small>
        <div class="icons">
          <BIconTrash
            font-scale="1.25"
            class="icon"
            variant="secondary"
            @click="deleteById(id)"
          />
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
      :id="id"
      :title="title"
      :category="category"
      :instructions="instructions"
      :image="image"
      :tag-list="tagList"
      :is-visible="isModalVisible"
      :on-hide-modal="hideModal"
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
  } from "bootstrap-vue";
  import EditRecipeModal from "@/components/EditRecipeModal";
  import { Actions } from "@/store/modules/recipes/types";
  import { getTimeAgo } from "@/utils/index.ts";
  import { recipesModuleName } from "@/store/modules";
  import { RouteName } from "@/router/enums";

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
      createdAt: {
        type: Number,
        required: true,
      },
      tags: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        isModalVisible: false,
      };
    },
    computed: {
      detailedPageLink() {
        return {
          name: RouteName.RECIPE,
          params: { id: this.id },
        };
      },
      createdAtText() {
        return getTimeAgo(this.createdAt);
      },
      tagList() {
        return this.tags ? this.tags.split(",") : [];
      },
    },
    methods: {
      ...mapActions(recipesModuleName, {
        deleteById: Actions.DELETE_RECIPE_BY_ID,
      }),
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
